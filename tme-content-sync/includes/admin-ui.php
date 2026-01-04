<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Meta Box
 */
function tme_add_sync_meta_box()
{
    // Only add on the Main Site
    if (!tme_is_main_site()) {
        return;
    }

    add_meta_box(
        'tme_sync_meta_box',                // ID
        'Content Sync',                     // Title
        'tme_render_sync_meta_box',         // Callback
        'post',                             // Screen (Post Type)
        'side',                             // Context
        'high'                              // Priority
    );
}
add_action('add_meta_boxes', 'tme_add_sync_meta_box');

/**
 * Render Meta Box Content
 *
 * @param WP_Post $post The post object.
 */
function tme_render_sync_meta_box($post)
{
    // Use nonce for verification
    wp_nonce_field('tme_sync_save_action', 'tme_sync_nonce');

    $is_synced = get_post_meta($post->ID, '_tme_is_synced', true);
    $checked = checked($is_synced, 'yes', false);

    // Check validation status if available (e.g., if sync failed)
    $sync_status = get_post_meta($post->ID, '_tme_last_sync_status', true);
    ?>
    <div class="tme-sync-option">
        <label for="tme_sync_checkbox">
            <input type="checkbox" name="tme_sync_checkbox" id="tme_sync_checkbox" value="yes" <?php echo $checked; ?> />
            <?php esc_html_e('Display on Secondary Site', 'tme-content-sync'); ?>
        </label>

        <?php if ($is_synced === 'yes'): ?>
            <p class="description">
                <?php esc_html_e('This post is currently synced.', 'tme-content-sync'); ?>
            </p>
            <?php if (!empty($sync_status)): ?>
                <p class="description" style="font-size: 11px; color: #666;">
                    <?php echo esc_html('Last Status: ' . $sync_status); ?>
                </p>
            <?php endif; ?>
        <?php else: ?>
            <p class="description">
                <?php esc_html_e('Check this to publish this post to the secondary site.', 'tme-content-sync'); ?>
            </p>
        <?php endif; ?>
    </div>
    <?php
}
