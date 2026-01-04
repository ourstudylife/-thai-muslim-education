<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Get the Secondary Site ID.
 *
 * @return int
 */
function tme_get_sub_site_id()
{
    return (int) TME_SECONDARY_SITE_ID;
}

/**
 * Check if the current site is the Main Site (Source).
 * Assuming Main Site is always ID 1, but we can make this smarter if needed.
 * For this implementation, we assume any site NOT the secondary is potentially a source,
 * or strictly Site 1. Let's assume Site 1 is Main.
 *
 * @return boolean
 */
function tme_is_main_site()
{
    // You might want to define TME_MAIN_SITE_ID constant too if it's not always 1
    return get_current_blog_id() === 1;
}

/**
 * Check if we are on the Secondary Site.
 *
 * @return boolean
 */
function tme_is_secondary_site()
{
    return get_current_blog_id() === tme_get_sub_site_id();
}

/**
 * Modify Canonical URL on Secondary Site for Synced Posts.
 *
 * @param string $canonical_url The post's canonical URL.
 * @param WP_Post $post The post object.
 * @return string Modified canonical URL if it's a synced post.
 */
function tme_filter_canonical_url($canonical_url, $post)
{
    if (!tme_is_secondary_site()) {
        return $canonical_url;
    }

    $original_url = get_post_meta($post->ID, '_tme_original_url', true);

    if (!empty($original_url)) {
        return $original_url;
    }

    return $canonical_url;
}
add_filter('get_canonical_url', 'tme_filter_canonical_url', 10, 2);
