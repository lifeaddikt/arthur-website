<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d’installation. Vous n’avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en « wp-config.php » et remplir les
 * valeurs.
 *
 * Ce fichier contient les réglages de configuration suivants :
 *
 * Réglages MySQL
 * Préfixe de table
 * Clés secrètes
 * Langue utilisée
 * ABSPATH
 *
 * @link https://fr.wordpress.org/support/article/editing-wp-config-php/.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define( 'DB_NAME', 'arthur_website' );

/** Utilisateur de la base de données MySQL. */
define( 'DB_USER', 'root' );

/** Mot de passe de la base de données MySQL. */
define( 'DB_PASSWORD', 'root' );

/** Adresse de l’hébergement MySQL. */
define( 'DB_HOST', 'localhost' );

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/**
 * Type de collation de la base de données.
 * N’y touchez que si vous savez ce que vous faites.
 */
define( 'DB_COLLATE', '' );

/**#@+
 * Clés uniques d’authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clés secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n’importe quel moment, afin d’invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '=z==@I-qo~.L]56z=*8xe ~w{]r|mhp1%U;vv-T&D5kbX;VNPLC.0pK+7X-[iz(n' );
define( 'SECURE_AUTH_KEY',  'k9/],LA[qx+CRE)z-TFYd%yCYz%hf29EGs;~K,B,W>%0)epaSF(Mzw/GSz/Aj$9b' );
define( 'LOGGED_IN_KEY',    'IcubaPh:_^A,jUYnCo^%Eoq,-a@o;i/b7umv$3mxlTj<,gmxWyBI$Q7 azgwx>rW' );
define( 'NONCE_KEY',        '`3KmA!PNo2i^@6.]31:e9T]^28Bl{JPZphSA02`oQ{f5w}]~kg?Zmpc+f&n8K{*f' );
define( 'AUTH_SALT',        ')4P%r# 9a>hgBeRb[g{3sR!1gBpP7;#d5lO)F@Qdg33|uRigU#S7~;V08gzr:2~l' );
define( 'SECURE_AUTH_SALT', 'nr,oPjZ H@=A&:r;iG3nLy!rfdbl<#}.ij>LeA1$Y>E, iilMV1__(fC%7%7DV?h' );
define( 'LOGGED_IN_SALT',   'HMy]AO9R*=tzmg:t%(@f SaQa2DD9NCm`nH!!(OaD3McV)3!- +)ug!`MRlRj^|Q' );
define( 'NONCE_SALT',       'cFj{_z@M0T{]$7gO/a=*!8I_o^;bCk)ey!|^^KeI3p|F!zH}c?b^?*r%}r~{y+Zi' );
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N’utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés !
 */
$table_prefix = 'wp_';

/**
 * Pour les développeurs : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l’affichage des
 * notifications d’erreurs pendant vos essais.
 * Il est fortement recommandé que les développeurs d’extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 *
 * Pour plus d’information sur les autres constantes qui peuvent être utilisées
 * pour le déboguage, rendez-vous sur le Codex.
 *
 * @link https://fr.wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* C’est tout, ne touchez pas à ce qui suit ! Bonne publication. */

/** Chemin absolu vers le dossier de WordPress. */
if ( ! defined( 'ABSPATH' ) )
  define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once( ABSPATH . 'wp-settings.php' );
