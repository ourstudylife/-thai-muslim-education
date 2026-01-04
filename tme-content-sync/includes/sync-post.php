<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handle Post Sync on Save
 *
 * @param int $post_id Post ID.
 * @param WP_Post $post Post object.
 * @param bool $update Whether this is an existing post being updated.
 */
function tme_handle_post_sync($post_id, $post, $update)
{
    // 1. Safety Checks
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (wp_is_post_revision($post_id)) {
        return;
    }
    // Only run on Main Site
    if (!tme_is_main_site()) {
        return;
    }
    // Check Nonce from Admin UI
    if (!isset($_POST['tme_sync_nonce']) || !wp_verify_nonce($_POST['tme_sync_nonce'], 'tme_sync_save_action')) {
        return;
    }
    // Check Permissions
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // 2. Determine Sync State
    $should_sync = isset($_POST['tme_sync_checkbox']) && $_POST['tme_sync_checkbox'] === 'yes';

    // Update Local Meta
    update_post_meta($post_id, '_tme_is_synced', $should_sync ? 'yes' : 'no');

    $target_site_id = tme_get_sub_site_id();
    $remote_post_id = get_post_meta($post_id, '_tme_remote_post_id', true);
    $original_link = get_permalink($post_id);

    // 3. Perform Sync or Cleanup
    if ($should_sync) {
        // --- SYNC TO SECONDARY SITE ---

        // Prepare Content
        $post_data = array(
            'post_title' => $post->post_title,
            'post_content' => $post->post_content,
            'post_status' => $post->post_status, // Sync status (publish/draft)
            'post_type' => $post->post_type,
            'post_excerpt' => $post->post_excerpt,
            'post_name' => $post->post_name, // Try to keep slug
            'post_author' => $post->post_author, // Note: Author IDs must match across sites or this defaults
        );

        // Switch to Secondary Site
        switch_to_blog($target_site_id);

        // Check if remote post exists, if we have an ID
        if ($remote_post_id) {
            // Update exisiting
            $post_data['ID'] = $remote_post_id;
            $inserted_id = wp_update_post($post_data);
        } else {
            // Insert new
            $inserted_id = wp_insert_post($post_data);
        }

        if (!is_wp_error($inserted_id)) {
            // Update Remote Meta for SEO and Tracking
            update_post_meta($inserted_id, '_tme_original_url', $original_link);
            update_post_meta($inserted_id, '_tme_source_post_id', $post_id);

            // --- Featured Image Sync (Basic Sideload) ---
            // Note: This requires the user to have capabilities on the second site.
            // Ideally, we run this as a super admin or ensure the user exists.

            // We only do this check if we haven't already synced an image, or if it changed?
            // For simplicity/robustness, we check if the local post has a thumb.
            restore_current_blog(); // Switch back to get local thumb data
            $has_thumb = has_post_thumbnail($post_id);
            $thumb_url = $has_thumb ? get_the_post_thumbnail_url($post_id, 'full') : false;
            switch_to_blog($target_site_id); // Switch back to target

            if ($thumb_url) {
                // Check if we already assigned a thumb to the remote post
                // Realistically, to avoid duplicates, we'd check if an attachment with this source URL exists
                // For this MVP, we will try to set it if not set, or update.
                // Sideloading is heavy; let's attempt it only if the remote post doesn't have a thumb
                if (!has_post_thumbnail($inserted_id)) {
                    // Load dependencies for sideload
                    require_once ABSPATH . 'wp-admin/includes/media.php';
                    require_once ABSPATH . 'wp-admin/includes/file.php';
                    require_once ABSPATH . 'wp-admin/includes/image.php';

                    $desc = "Synced from Main Site";
                    $sideload_id = media_sideload_image($thumb_url, $inserted_id, $desc, 'id');

                    if (!is_wp_error($sideload_id)) {
                        set_post_thumbnail($inserted_id, $sideload_id);
                    }
                }
            }
            // --- End Featured Image Sync ---

        }

        restore_current_blog();

        // Record the remote ID if we just created it
        if (!is_wp_error($inserted_id)) {
            update_post_meta($post_id, '_tme_remote_post_id', $inserted_id);
            update_post_meta($post_id, '_tme_last_sync_status', 'Synced on ' . current_time('mysql'));
        } else {
            update_post_meta($post_id, '_tme_last_sync_status', 'Error: ' . $inserted_id->get_error_message());
        }

    } else {
        // --- UNSYNC (REMOVE) ---
        if ($remote_post_id) {
            switch_to_blog($target_site_id);

            // Check if post exists before deleting
            if (get_post($remote_post_id)) {
                // Trash it instead of force delete for safety
                wp_trash_post($remote_post_id);
            }

            restore_current_blog();

            // Clear remote meta
            delete_post_meta($post_id, '_tme_remote_post_id');
            update_post_meta($post_id, '_tme_last_sync_status', 'Unsynced on ' . current_time('mysql'));
        }
    }
}
add_action('save_post', 'tme_handle_post_sync', 10, 3);
