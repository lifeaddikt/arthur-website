<?php

/**
 * Plugin Name: Arthur Website Administrator
 * Author: lifeaddikt
 * Description: Plugin qui configure ton backoffice
 */

use ArthurWebsite\Plugin;
use ArthuWebsite\Api;

require __DIR__ . '/vendor/autoload.php';

$arthur_website = new Plugin();

register_activation_hook(
   __FILE__,
   [$arthur_website, 'activate']
);


register_deactivation_hook(
   __FILE__,
   [$arthur_website, 'deactivate']
);

// $api = new Api();