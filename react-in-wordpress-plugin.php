<?php
/**
 * Plugin Name: React in WordPress Plugin
 * Description: Learn react in WordPress plugin
 * Author: Lafif Astahdziq
 * Author URI: https://lafif.me
 * Author Email: hello@lafif.me
 * Version: 1.0.0
 * Text Domain: rwp
 * Domain Path: /languages/
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

function rwp_page_callback(){
	?>
	<div class="wrap">
		<div id="app"></div>
	</div>
	<?php
}

function rwp_admin_menu(){
	add_menu_page( 'Learn React', 'Learn React', 'manage_options', 'learn-react', 'rwp_page_callback');
}
add_action( 'admin_menu', 'rwp_admin_menu');

function rwp_enqueue_scripts(){
	$current_screen = get_current_screen();
	if( $current_screen->id != 'toplevel_page_learn-react' )
		return;

	wp_enqueue_script(
	  	'my-plugin-frontend',
	  	plugin_dir_url( __FILE__ ) . 'dist/js/app.js',
	  	['wp-element'],
	  	null,
	  	true
	);
}
add_action( 'admin_enqueue_scripts', 'rwp_enqueue_scripts'); // Loads in admin area