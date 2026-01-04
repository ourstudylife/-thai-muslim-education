// Qibla direction logic
// Formula: atan2(sin(Δλ), cos(φ1)tan(φ2) - sin(φ1)cos(Δλ))
// Where φ1 is user lat, φ2 is Kaaba lat (21.4225° N), Δλ is Δ longitude (39.8262° E)

const KAABA = { lat: 21.4225, lng: 39.8262 };

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('compass')) {
        initQibla();
    }
});

function initQibla() {
    const compass = document.getElementById('compass');
    const qiblaDeg = document.getElementById('qibla-deg');

    // Default for Bangkok if no GPS
    const userLoc = { lat: 13.7563, lng: 100.5018 };
    const qiblaAngle = calculateQibla(userLoc.lat, userLoc.lng);

    qiblaDeg.textContent = `${Math.round(qiblaAngle)}° NW`;

    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientationabsolute', (event) => {
            const alpha = event.alpha; // Z-axis rotation (0-360)
            if (alpha !== null) {
                const rotation = alpha + qiblaAngle;
                compass.style.transform = `rotate(${-rotation}deg)`;
            }
        }, true);
    }
}

function calculateQibla(lat, lng) {
    const φ1 = lat * Math.PI / 180;
    const φ2 = KAABA.lat * Math.PI / 180;
    const Δλ = (KAABA.lng - lng) * Math.PI / 180;

    const y = Math.sin(Δλ);
    const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ);
    let qibla = Math.atan2(y, x) * 180 / Math.PI;

    return (qibla + 360) % 360;
}
