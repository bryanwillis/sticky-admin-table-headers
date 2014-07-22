<?php
/*
Plugin Name: Sticky Admin Table Headers
Plugin URI: http://github.com/bryanwillis/sticky-admin-table-headers
Description: Sticks the Table Headers on the Admin Edit Screens
Version: 1.0.0
Author: Bryan Willis
Author URI: http://profiles.wordpress.org/codecandid
License: GPLv2 or later
*/

add_action( 'admin_enqueue_scripts', 'wp_admin_edit_screen_table_sticky_header_enqueue_scripts', 20 );
function wp_admin_edit_screen_table_sticky_header_enqueue_scripts() {
        wp_register_script( 'sticky-admin-table-headers', plugin_dir_url( __FILE__ ) . 'jquery.sticky-admin-table-headers.js', array( 'jquery' ), '1.0.0', true );		
        wp_register_script( 'sticky-admin-table-headers-init', plugin_dir_url( __FILE__ ) . 'jquery.sticky-admin-table-headers-init.js', array( 'sticky-admin-table-headers' ), '1.0.0', true );		
        wp_enqueue_script( 'sticky-admin-table-headers' );
        wp_enqueue_script( 'sticky-admin-table-headers-init' );
}

add_action('admin_head', 'wp_admin_edit_screen_table_sticky_header_css_admin_head');
function wp_admin_edit_screen_table_sticky_header_css_admin_head() {
	?>
<style type="text/css">
.tableFloatingHeaderOriginal {
	background-color: #ffffff;
}
</style>
	<?php
}
