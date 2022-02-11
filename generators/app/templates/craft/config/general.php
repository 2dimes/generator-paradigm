<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\helpers\App;

$isDev = App::env('ENVIRONMENT') === 'dev';
$isProd = App::env('ENVIRONMENT') === 'production';

return [
    // Global settings
    '*' => [

        // Whether admins should be allowed to make administrative changes to the system.
        'allowAdminChanges' => $isDev,

        // Whether Craft should create a database backup before applying a new system update.
        'backupOnUpdate' => true,

        // Control panel trigger word
        'cpTrigger' => App::env('CP_TRIGGER') ?: 'admin',

        // The default options that should be applied to each search term.
        'defaultSearchTermOptions' => array(
            'subLeft' => true,
            'subRight' => true,
        ),

        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 0,

        // Whether the system should run in Dev Mode.
        'devMode' => $isDev,

        // Whether crawlers should be allowed to index pages and following links
        'disallowRobots' => !$isProd,

        // Whether to enable CSRF protection via hidden form inputs for all forms submitted via Craft.
        'enableCsrfProtection' => true,

        // The prefix that should be prepended to HTTP error status codes when determining the path to look for an error’s template.
        'errorTemplatePrefix' => '_errors/_',

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => App::env('SECURITY_KEY'),

        // Stop Craft from sending X-powered-by header
        'sendPoweredByHeader' => false,

    ],

    // Dev environment settings
    'dev' => [
        'enableTemplateCaching' => false,
        'userSessionDuration' => 0
    ],

    // Staging environment settings
    'staging' => [
        'devMode' => true,
    ],

    // Production environment settings
    'production' => [
    ],
];
