<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit4728efdfd852551cae1144b964600c25
{
    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'ArthurWebsite\\' => 14,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'ArthurWebsite\\' => 
        array (
            0 => __DIR__ . '/../..' . '/class',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit4728efdfd852551cae1144b964600c25::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit4728efdfd852551cae1144b964600c25::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit4728efdfd852551cae1144b964600c25::$classMap;

        }, null, ClassLoader::class);
    }
}
