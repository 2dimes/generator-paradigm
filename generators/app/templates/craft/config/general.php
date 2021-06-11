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

return [
    // Global settings
    '*' => [
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 0,

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        //T he default options that should be applied to each search term.
        'defaultSearchTermOptions' => array(
            'subLeft' => true,
            'subRight' => true,
        ),

        // Whether to enable CSRF protection via hidden form inputs for all forms submitted via Craft.
        'enableCsrfProtection' => true,

        // Control panel trigger word
        'cpTrigger' => 'admin',

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => App::env('SECURITY_KEY'),

        // Whether admins should be allowed to make administrative changes to the system.
        'allowAdminChanges' => false,

        // The prefix that should be prepended to HTTP error status codes when determining the path to look for an error’s template.
        'errorTemplatePrefix' => '_errors/_',

        // Whether Craft should set users’ usernames to their email addresses, rather than let them set their username separately.
        'useEmailAsUsername' => true,

        // List of file extensions that will be merged into the allowedFileExtensions config setting.
        'extraAllowedFileExtensions' => ['json'],

        // Whether Craft should allow system and plugin updates in the control panel, and plugin installation from the Plugin Store.
        'allowUpdates' => false,

        // Whether Craft should create a database backup before applying a new system update.
        'backupOnUpdate' => false,

        // Whether the system should run in Dev Mode.
        'devMode' => false,

        // Whether admins should be allowed to make administrative changes to the system.
        'allowAdminChanges' => false
    ],

    // Dev environment settings
    'dev' => [
        'allowUpdates' => true,
        'allowAdminChanges' => true,
        'backupOnUpdate' => true,
        'devMode' => true,
        'enableTemplateCaching' => false,
        'userSessionDuration' => 0
    ],

    // Staging environment settings
    'staging' => [
        // Prevent crawlers from indexing pages and following links
        'disallowRobots' => true,
    ],

    // Production environment settings
    'production' => [
    ],
];
