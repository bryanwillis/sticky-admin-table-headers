sticky-admin-table-headers
==========================

Adds sticky headers to wordpress admin tables


To chck the columns I used the get_user_meta(); function to print the array of hiddencolumns on each post types edit.php admin screen:





    function get_current_post_type() {
            global $post, $typenow, $current_screen;
            if ($post && $post->post_type)
                return $post->post_type;
             elseif ($typenow)
                return $typenow;
             elseif ($current_screen && $current_screen->post_type)
                return $current_screen->post_type;
             elseif (isset($_REQUEST['post_type']))
                return sanitize_key($_REQUEST['post_type']);
            return null;
    }
    
    
    
    function get_current_user_manageedit_pagecolumnshidden() {
    	$current_ptype = get_current_post_type();
    	$user_id = get_current_user_id();
    	$key = 'manageedit-'.$current_ptype.'columnshidden';
    	$single = true;
    	if(get_user_meta($user_id, $key, $single))
    		return get_user_meta($user_id, $key, $single);
    }
    
    
    
    function echo_current_user_manageedit_pagecolumnshidden() {
    	global $pagenow;
    	if ( $pagenow !== 'edit.php' )
    		return;
    	$columnshidden= get_current_user_manageedit_pagecolumnshidden();
    	echo '<pre>'; print_r( $columnshidden ); echo '</pre>';
    }
    add_action('all_admin_notices', 'echo_current_user_manageedit_pagecolumnshidden');
    // */
    
    
    
    
**OUTPUT :**

    Array
    (
        [0] => cb
        [1] => title
        [2] => 
        [3] => 
    )


After determining that `cb` & `title` were in fact added to the $meta_value I deleted them with the following function:


    function delete_current_user_manageedit_pagecolumnshidden() {
    	$user_id = get_current_user_id();
    	$meta_key = 'manageedit-pagecolumnshidden';
    	if( get_user_meta($user_id, $meta_key) )
    		delete_user_meta( $user_id, $meta_key );
    }
    add_action ('admin_init', 'delete_current_user_manageedit_pagecolumnshidden');



I'm pretty sure this issue has to do with how the WP_List_Table & admin-ajax.php work together. 




`columnshidden` appears [`wp_ajax_hidden_columns()`][1] & [`get_hidden_columns()`][2]



The admin-ajax client-side functionality here appears to be here in [`common.js`][3] which checks for the [hidden table headers][4] 

The problem with the way this all works is that it does a pretty poor job of separating presentation from behavior logic.

For example if at any time or reason `thead { display: none; }` or `.column-title { display: none; }` or `#cb { display: none; }` or anything similar, the entire table will break for that user. `WP_List_Table` should not depend on something lik that not happening. In my case I was trying to make a sticky table header script, but I could see a lot of wordpress beginers, that don't know how to properly [remove them][5], try to use css display: none; which would destroy their editing tables as soon as they update `columnshidden`. The manageedit-{$post_type}column should not rely on the visibility of <thead> and only the actual checked input fields.



**Sidenote:**
While the issue itself is a bit different, I think this might be very similar to some other issues like these:


http://wordpress.stackexchange.com/questions/31154/wp-list-table-custom-quick-edit-box-post-meta-data-missing-and-columns-change

http://wordpress.stackexchange.com/questions/123182/custom-admin-column-disappearing-when-using-quick-edit?lq=1

http://wordpress.stackexchange.com/questions/144361/wordpress-admin-wp-table-list-show-incorrectly

https://core.trac.wordpress.org/ticket/21016




  [1]: https://github.com/WordPress/WordPress/blob/448275cce483138f53ccfa586b2d28b7fe8b0785/wp-admin/includes/screen.php#L55
  [2]: https://github.com/WordPress/WordPress/blob/270a57075c290736387b6551670fde34fb3f1851/wp-admin/includes/ajax-actions.php#L1307
  [3]: https://github.com/WordPress/WordPress/blob/448275cce483138f53ccfa586b2d28b7fe8b0785/wp-admin/js/common.js#L29
  [4]: https://github.com/WordPress/WordPress/blob/448275cce483138f53ccfa586b2d28b7fe8b0785/wp-admin/includes/screen.php#L17
  [5]: http://codex.wordpress.org/Plugin_API/Filter_Reference/manage_$post_type_posts_columns

