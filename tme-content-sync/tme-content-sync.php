<?php
/**
 * Plugin Name: TME Content Sync
 * Description: Automatically syncs selected posts to a secondary site in a WordPress Multisite environment.
 * Version: 1.0.0
 * Author: TME Dev
 * Author URI: https://example.com
 * License: GPLv2 or later
 * Text Domain: tme-content-sync
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Define Plugin Constants
define( 'TME_SYNC_VERSION', '1.0.0' );
define( 'TME_SYNC_PATH', plugin_dir_path( __FILE__ ) );
define( 'TME_SYNC_URL', plugin_dir_url( __FILE__ ) );

// Allow defining secondary site ID in wp-config.php, default to 2
if ( ! defined( 'TME_SECONDARY_SITE_ID' ) ) {
	define( 'TME_SECONDARY_SITE_ID', 2 );
}

/**
 * Load Plugin Files
 */
require_once TME_SYNC_PATH . 'includes/helpers.php';
require_once TME_SYNC_PATH . 'includes/admin-ui.php';
require_once TME_SYNC_PATH . 'includes/sync-post.php';

/**
 * Activation Hook
 * Verify Multisite environment.
 */
function tme_sync_activation() {
	if ( ! is_multisite() ) {
		deactivate_plugins( plugin_basename( __FILE__ ) );
		wp_die( esc_html__( 'This plugin requires a WordPress Multisite environment.', 'tme-content-sync' ) );
	}
}
register_activation_hook( __FILE__, 'tme_sync_activation' );
