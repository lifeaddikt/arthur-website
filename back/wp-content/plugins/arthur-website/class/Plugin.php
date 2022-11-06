<?php

namespace ArthurWebsite;

class Plugin
{

    public function __construct()
    {

        add_action(
            'init',
            [$this, 'enableThumbnails']
        );

        add_action(
            'init',
            [$this, 'createPicturePostType']
        );

        add_action(
            'init',
            [$this, 'createCollectionCustomTaxonomie']
        );

        add_action(
            'admin_menu',
            [$this, 'removeUselessMenuItems']
        );

        add_filter(
            'manage_picture_posts_columns',
            [$this, 'add_featured_image_column']
        );

        add_action(
            'manage_picture_posts_custom_column',
            [$this, 'render_the_column'],
            10,
            2
        );

        add_filter("rest_picture_query", [$this, 'filter_rest_collection_query'] , 10, 2);
    }

    public function activate()
    {
    }


    public function deactivate()
    {
    }

    public function enableThumbnails()
    {
        add_theme_support('post-thumbnails');
    }

    public function createPicturePostType()
    {
        register_post_type(
            'picture',
            [
                'label' => 'Photographies',
                'labels' => [
                    'name' => 'Photographies',
                    'singular_name' => 'Photographie',
                    'add_new_item' => 'Ajouter une photographie',
                    'new_item' => 'Nouvelle photographie',
                    'edit-item' => 'Modifier les informations de la photographie',
                    'all_items' => 'Toutes les photographies',
                    'featured_image' => 'Photographie',
                    'not_found' => 'Aucune photoraphie enregistrée'
                ],
                'has_archive' => true,
                'public' => true,
                'menu_position' => 3,
                'hierarchical' => false,
                'menu_icon' => 'dashicons-format-image',
                'supports' => [
                    'title',
                    'thumbnail',
                    'excerpt',
                ],
                'map_meta_cap' => true,
                'show_in_rest' => true
            ]
        );
    }

    public function createCollectionCustomTaxonomie()
    {
        register_taxonomy(
            'collection',
            ['picture'],
            [
                'label' => 'Collections',
                'labels' => [
                    'name' => 'Collections',
                    'singular_name' => 'Collection',
                    'add_new_item' => 'Ajouter une nouvelle collection',
                    'not_found' => 'Aucune collection enregistrée'
                ],
                'hierarchical' => false,
                'public' => true,
                'show_in_rest' => true,
                'rest_base' => 'collection',
                'query_var' => true
            ]
        );
    }

    public function removeUselessMenuItems()
    {
        remove_menu_page('edit.php');
        remove_menu_page('themes.php');
        remove_menu_page('edit-comments.php');
    }

    public function add_featured_image_column($column_array)
    {
        $column_array['featured_image'] = 'Aperçu';
        return $column_array;
    }

    public function render_the_column($column, $post_id)
    {
        switch ($column) {
            case 'featured_image':
                the_post_thumbnail('thumbnail');
                break;
        }
    }

    function filter_rest_collection_query($args, $request)
    {
        $params = $request->get_params();
        if (isset($params['collection_slug'])) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'collection',
                    'field' => 'slug',
                    'terms' => explode(',', $params['collection_slug'])
                )
            );
        }
        return $args;
    }
}
