<?php

/**
 * upycms 获取组件配置
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */

$componentConfigFile = Yii::getAlias('@appRoot/config/components.php');

if (!file_exists($componentConfigFile)) exit ('Hoops!Components File is not found.');
$appComponents = require($componentConfigFile);

$baseComponents = [
    'request' => [
        'cookieValidationKey' => 'upycms',
        'csrfParam' => '_token',
    ],
    'cache' => [
        'class' => 'yii\caching\FileCache',
    ],
    'view' => [
//        'class' => 'yii\web\View',
        'theme' => [
            'basePath' => '@proRoot/themes',
//            'baseUrl' => '@web/themes',
            'pathMap' => [
//                '@app/views' => '@proRoot/themes',
            ],
        ],
        'renderers' => [
            'tpl' => [
                'class' => 'yii\smarty\ViewRenderer',
                //'cachePath' => '@runtime/Smarty/cache',
            ],
            'html' => [
                'class' => 'yii\twig\ViewRenderer',
                'cachePath' => '@runtime/twig/cache',
                // Array of twig options:
                'options' => [
                    'auto_reload' => true,
                    'debug' => true
                ],
                'globals' => [
                    'html' => '\yii\helpers\Html',
                    'url'  => '\yii\helpers\Url',
                ],
                'functions' => [],
//                'uses' => ['yii\bootstrap'],
            ],
        ],
    ],
    'errorHandler' => [
        'errorAction' => 'site/error',
    ],
    'mailer' => [
        'class' => 'yii\swiftmailer\Mailer',
        // send all mails to a file by default. You have to set
        // 'useFileTransport' to false and configure a transport
        // for the mailer to send real emails.
        'useFileTransport' => true,
    ],
    'log' => [
        'traceLevel' => YII_DEBUG ? 3 : 0,
        'targets' => [
            [
                'class' => 'yii\log\FileTarget',
                'levels' => ['error', 'warning'],
            ],
        ],
    ],
];

return array_merge($baseComponents, $appComponents); // components
