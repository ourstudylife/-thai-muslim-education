const CONFIG = {
    CACHE_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
    CACHE_PREFIX: 'pt_cache_',
    FAZILET_API: 'https://namaz-vakitleri.fazilettakvimi.com/api/cms'
};

let currentLang = localStorage.getItem('pt_lang') || 'en'; // Default language is 'en'
let prayerData = null;

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initClock();
    if (document.getElementById('city-search')) initSearch();
    if (document.getElementById('detect-location')) initGeolocation();
    if (document.getElementById('countdown-container')) initCityPage();
});

function initClock() {
    const clockEl = document.getElementById('current-clock');
    if (!clockEl) return;
    const update = () => {
        clockEl.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
    };
    update();
    setInterval(update, 1000);
}

function initLanguage() {
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'th' : 'en';
            localStorage.setItem('pt_lang', currentLang);
            applyLanguage();
        });
    }
    applyLanguage();
}

function applyLanguage() {
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });
}

function initGeolocation() {
    const btn = document.getElementById('detect-location');
    if (!btn) return;
    btn.addEventListener('click', () => {
        btn.disabled = true;
        const statusSpan = btn.querySelector('span:last-child');
        const originalText = statusSpan.textContent;
        statusSpan.textContent = currentLang === 'en' ? 'Detecting...' : 'กำลังค้นหา...';

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                // Reverse geocode to get city name
                try {
                    const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const d = await r.json();
                    const city = d.address.city || d.address.town || d.address.village || d.address.suburb || d.address.state || "Current Location";
                    const country = d.address.country || "";

                    // Store formatted location info
                    sessionStorage.setItem('pt_location', JSON.stringify({
                        lat: latitude,
                        lon: longitude,
                        name: city,
                        country: country
                    }));
                    location.href = '/local';
                } catch (e) {
                    sessionStorage.setItem('pt_location', JSON.stringify({ lat: latitude, lon: longitude, name: 'Current Location' }));
                    location.href = '/local';
                }
            }, () => {
                alert('Geolocation failed. Please search for a city.');
                btn.disabled = false;
                statusSpan.textContent = originalText;
            });
        }
    });
}

function updateTheme(times) {
    if (!times) return;
    const now = new Date();
    const getT = (t) => {
        const [h, m] = t.split(':');
        const d = new Date();
        d.setHours(h, m, 0);
        return d;
    };

    const fajr = getT(times.fajr);
    const sunrise = getT(times.sunrise);
    const dhuhr = getT(times.dhuhr);
    const asr = getT(times.asr);
    const maghrib = getT(times.maghrib);
    const isha = getT(times.isha);

    let theme = 'night';
    if (now >= fajr && now < sunrise) theme = 'fajr';
    else if (now >= sunrise && now < dhuhr) theme = 'sunrise';
    else if (now >= dhuhr && now < asr) theme = 'dhuhr';
    else if (now >= asr && now < maghrib) theme = 'asr';
    else if (now >= maghrib && now < isha) theme = 'maghrib';
    else if (now >= isha || now < fajr) theme = 'isha';

    document.body.className = `theme-${theme}`;
}

function initSearch() {
    const input = document.getElementById('city-search');
    const results = document.getElementById('search-results');
    let timeout = null;

    input.addEventListener('input', (e) => {
        clearTimeout(timeout);
        const val = e.target.value.trim();

        if (val.length < 2) {
            results.classList.add('hidden');
            return;
        }

        // Debounce search
        timeout = setTimeout(async () => {
            try {
                const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&addressdetails=1&limit=5`);
                if (!r.ok) throw new Error('Search service unavailable');
                const data = await r.json();

                if (data.length > 0) {
                    results.innerHTML = data.map(item => {
                        const addr = item.address;
                        const name = addr.city || addr.town || addr.village || addr.suburb || item.display_name.split(',')[0];
                        const country = addr.country || "";
                        const state = addr.state || addr.province || "";

                        return `
                            <div class="search-item" onclick="handleSearchResult('${encodeURIComponent(name)}', '${encodeURIComponent(country)}', '${item.lat}', '${item.lon}')">
                                <strong>${name}</strong>
                                <small style="display: block; opacity: 0.7; font-size: 0.8em;">${state}${state && country ? ', ' : ''}${country}</small>
                            </div>
                        `;
                    }).join('');
                    results.classList.remove('hidden');
                } else {
                    results.innerHTML = `<div class="p-4 text-center opacity-70">${currentLang === 'en' ? 'No results found' : 'ไม่พบผลลัพธ์'}</div>`;
                    results.classList.remove('hidden');
                }
            } catch (e) {
                console.error("Search failed:", e);
                // Fallback UI or retry logic could go here
                results.innerHTML = `<div class="p-4 text-center text-red-400">
                    ${currentLang === 'en' ? 'Search service busy. Please try again.' : 'ระบบค้นหาไม่ว่าง กรุณาลองใหม่'}
                </div>`;
                results.classList.remove('hidden');
            }
        }, 800); // Increased debounce to 800ms to reduce rate limit hits
    });

    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !results.contains(e.target)) results.classList.add('hidden');
    });
}

function handleSearchResult(name, country, lat, lon) {
    const query = decodeURIComponent(name);
    const c = decodeURIComponent(country);
    location.href = `/search?q=${encodeURIComponent(query)}&c=${encodeURIComponent(c)}&lat=${lat}&lon=${lon}`;
}

async function initCityPage() {
    const path = window.location.pathname.split('/').filter(p => p && p !== 'index.html');
    let country = path[0] || "";
    let city = path[1] || "";

    const titleEl = document.getElementById('city-title');
    const subtitleEl = document.getElementById('city-subtitle');

    // 1. Geolocation Mode
    const loc = JSON.parse(sessionStorage.getItem('pt_location'));
    if (path[0] === 'local' && loc) {
        if (titleEl) titleEl.textContent = loc.name || (currentLang === 'en' ? 'Current Location' : 'ตำแหน่งปัจจุบัน');
        if (subtitleEl) subtitleEl.textContent = loc.country || "";
        document.title = `${loc.name || (currentLang === 'en' ? 'Current Location' : 'ตำแหน่งปัจจุบัน')} | Prayer Times`;
        const data = await getPrayerDataByCoords(loc.lat, loc.lon, loc.name);
        processPrayerData(data);
        return;
    }

    // 2. Global Search Mode
    if (path[0] === 'search') {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        const countryParam = urlParams.get('c');
        const lat = urlParams.get('lat');
        const lon = urlParams.get('lon');

        if (lat && lon) {
            if (titleEl) titleEl.textContent = query || "Selected Location";
            if (subtitleEl) subtitleEl.textContent = countryParam || "";
            document.title = `${query || "Selected Location"} | Prayer Times`;
            const data = await getPrayerDataByCoords(lat, lon, query, countryParam);
            processPrayerData(data);
            return;
        }

        if (query) {
            city = query;
            country = countryParam || "";
            if (titleEl) titleEl.textContent = city;
            if (subtitleEl) subtitleEl.textContent = country;
            document.title = `${city}${country ? ', ' + country : ''} | Prayer Times`;
            const data = await getPrayerData(city, country);
            processPrayerData(data);
            return;
        }
    }

    // 3. Static Path Mode
    if (titleEl) titleEl.textContent = city.charAt(0).toUpperCase() + city.slice(1);
    if (subtitleEl) subtitleEl.textContent = country.charAt(0).toUpperCase() + country.slice(1);
    document.title = `${city.charAt(0).toUpperCase() + city.slice(1)}, ${country.charAt(0).toUpperCase() + country.slice(1)} | Prayer Times`;

    const data = await getPrayerData(city, country);
    processPrayerData(data);
}

function processPrayerData(data) {
    if (data) {
        prayerData = data;
        updatePrayerTable(data);
        startCountdown(data);
        updateTheme(data.times);
        updateSEOSchema(data);
    }
}

async function getFaziletData(id, name) {
    const key = CONFIG.CACHE_PREFIX + 'fz_' + id;
    const cached = localStorage.getItem(key);
    if (cached) {
        const p = JSON.parse(cached);
        if (p.timestamp && Date.now() - p.timestamp < CONFIG.CACHE_EXPIRY) return p.data;
    }

    try {
        const r = await fetch(`${CONFIG.FAZILET_API}/daily?districtId=${id}&lang=2`);
        const d = await r.json();
        const pt = d.vakitler[0]; // Today's times

        const formatted = {
            city: name,
            country: "Fazilet Takvimi",
            times: {
                fajr: pt.imsak.split('T')[1].substring(0, 5),
                sunrise: pt.gunes.split('T')[1].substring(0, 5),
                dhuhr: pt.ogle.split('T')[1].substring(0, 5),
                asr: pt.ikindi.split('T')[1].substring(0, 5),
                maghrib: pt.aksam.split('T')[1].substring(0, 5),
                isha: pt.yatsi.split('T')[1].substring(0, 5)
            }
        };
        localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data: formatted }));
        return formatted;
    } catch (e) {
        console.error("Fazilet Data Fetch failed:", e);
        return null;
    }
}

async function getPrayerData(city, country) {
    const cacheKey = country ? `${country.toLowerCase()}_${city.toLowerCase()}` : city.toLowerCase();
    const key = CONFIG.CACHE_PREFIX + cacheKey;
    const cached = localStorage.getItem(key);
    if (cached) {
        const p = JSON.parse(cached);
        if (Date.now() - p.timestamp < CONFIG.CACHE_EXPIRY) return p.data;
    }

    try {
        // 1. Try local JSON first
        const localPath = country ? `/data/cities/${country.toLowerCase()}/${city.toLowerCase()}.json` : `/data/cities/${city.toLowerCase()}.json`;
        const r = await fetch(localPath);
        if (r.ok) {
            const d = await r.json();
            localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data: d }));
            return d;
        }
        throw new Error('Local data not found');
    } catch (e) {
        // 2. Global Fallback to Aladhan API
        console.log(`Data for ${city}, ${country} not found locally, falling back to Aladhan API...`);
        try {
            const query = country ? `city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}` : `city=${encodeURIComponent(city)}`;
            const r = await fetch(`https://api.aladhan.com/v1/timingsByCity?${query}&method=13`);
            if (!r.ok) throw new Error('Aladhan API request failed');
            const d = await r.json();
            if (d.code !== 200) throw new Error(d.status || 'API Error');

            const pt = d.data.timings;
            const formatted = {
                city, country,
                times: {
                    fajr: pt.Fajr, sunrise: pt.Sunrise, dhuhr: pt.Dhuhr,
                    asr: pt.Asr, maghrib: pt.Maghrib, isha: pt.Isha
                }
            };
            localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data: formatted }));
            return formatted;
        } catch (apiErr) {
            console.error("Global API fetch failed:", apiErr);
            // Return dummy/fallback data as a last resort to prevent UI crash
            return { city, country, times: { fajr: "--:--", sunrise: "--:--", dhuhr: "--:--", asr: "--:--", maghrib: "--:--", isha: "--:--" } };
        }
    }
}

async function getPrayerDataByCoords(lat, lng, cityName = "Your Location", countryName = "") {
    const key = `${CONFIG.CACHE_PREFIX}coords_${Number(lat).toFixed(2)}_${Number(lng).toFixed(2)}`;
    const cached = localStorage.getItem(key);
    if (cached) {
        const p = JSON.parse(cached);
        if (Date.now() - p.timestamp < CONFIG.CACHE_EXPIRY) return p.data;
    }

    try {
        const r = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=13`);
        if (!r.ok) throw new Error('Aladhan API request failed');
        const d = await r.json();
        if (d.code !== 200) throw new Error(d.status || 'API Error');

        const pt = d.data.timings;
        const formatted = {
            city: cityName,
            country: countryName,
            times: {
                fajr: pt.Fajr, sunrise: pt.Sunrise, dhuhr: pt.Dhuhr,
                asr: pt.Asr, maghrib: pt.Maghrib, isha: pt.Isha
            }
        };
        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: formatted }));
        return formatted;
    } catch (e) {
        return null;
    }
}

function updatePrayerTable(data) {
    Object.keys(data.times).forEach(k => {
        const el = document.getElementById(`time-${k}`);
        if (el) el.textContent = data.times[k];
    });
}

function startCountdown(data) {
    const timerEl = document.getElementById('timer');
    const labelEl = document.getElementById('next-prayer-name');
    const prayerOrder = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

    const update = () => {
        const now = new Date();
        let next = null;
        let nextName = "";

        for (let name of prayerOrder) {
            const [h, m] = data.times[name].split(':');
            const pt = new Date();
            pt.setHours(h, m, 0);
            if (pt > now) { next = pt; nextName = name; break; }
        }

        if (!next) {
            const [h, m] = data.times.fajr.split(':');
            next = new Date();
            next.setDate(next.getDate() + 1);
            next.setHours(h, m, 0);
            nextName = "fajr";
        }

        if (labelEl) labelEl.textContent = nextName.charAt(0).toUpperCase() + nextName.slice(1);

        const diff = next - now;
        const hh = Math.floor(diff / 3600000);
        const mm = Math.floor((diff % 3600000) / 60000);
        const ss = Math.floor((diff % 60000) / 1000);

        if (timerEl) timerEl.textContent = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;

        document.querySelectorAll('.time-row').forEach(r => r.classList.remove('active'));
        const active = document.getElementById(`row-${nextName}`);
        if (active) active.classList.add('active');

        // Refresh theme if prayer just passed
        updateTheme(data.times);
    };

    update();
    setInterval(update, 1000);
}

function updateSEOSchema(data) {
    const el = document.getElementById('seo-schema');
    if (!el) return;
    el.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SpecialAnnouncement",
        "name": `Prayer Times in ${data.city}`,
        "category": "Religious",
        "datePosted": new Date().toISOString().split('T')[0],
        "url": window.location.href
    });
}
