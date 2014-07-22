sticky-admin-table-headers
==========================

Adds sticky headers to wordpress admin tables


Only way to fix after deactivation is :

function remove_pages_columns($columns) {
  unset($columns['title']); // Remove title column
  return $columns;
}
add_filter('manage_pages_columns', 'remove_pages_columns');


then update edit.php page where title is missing in a different tab


then comment out the unset:

function remove_pages_columns($columns) {
  // unset($columns['title']); // Remove title column
  return $columns;
}
add_filter('manage_pages_columns', 'remove_pages_columns');

then go back to edit.php, uncheck all boxes in preferences, and apply to get the title back
