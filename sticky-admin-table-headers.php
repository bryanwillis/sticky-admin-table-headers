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
if ( ! defined( 'WPINC' ) ) {
	die;
}
if(!function_exists('wp_list_tables_sticky_headers_js')) {
if( !is_admin() ) 
	return;
function wp_list_tables_sticky_headers_js( $hook_suffix ) {
    if ( 'edit.php' !== $hook_suffix )
        return;
        wp_enqueue_script( 'sticky-admin-table-headers', plugin_dir_url( __FILE__ ) . 'jquery.sticky-admin-table-headers.js', array( 'jquery' ), '1.0.0', true );	
}
	add_action( 'admin_enqueue_scripts', 'wp_list_tables_sticky_headers_js', 20 );
}
