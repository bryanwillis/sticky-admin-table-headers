<?php
/*
Plugin Name: Sticky Admin Table Headers
Plugin URI: https://gist.github.com/bryanwillis/967e3018fa3ca3d8e1bc/
Description: Sticks the Table Headers on the Admin Edit Screens
Version: 1.0.0
Author: Bryan Willis
Author URI: http://www.candidbusiness.com/
License: GPLv2 or later
*/
add_action( 'admin_enqueue_scripts', 'wp_admin_float_the_edit_screen_table_heads_enqueue_scripts', 20 );

function wp_admin_float_the_edit_screen_table_heads_enqueue_scripts() {
        
        wp_register_script( 'wp-admin-sticky-scroll-post-edit-table-headers', plugin_dir_url( __FILE__ ) . 'jquery.sticky-admin-tables-headers.js', array( 'wp-admin-sticky-scroll-post-edit-table-headers' ), '1.0.0', true );		
        wp_register_script( 'wp-admin-sticky-scroll-post-edit-table-headers-init', plugin_dir_url( __FILE__ ) . 'jquery.sticky-admin-tables-headers-init.js', array( 'jquery' ), '1.0.0', true );		
        
        wp_enqueue_script( 'wp-admin-sticky-scroll-post-edit-table-headers' );
        wp_enqueue_script( 'wp-admin-sticky-scroll-post-edit-table-init' );

}