<?php

/**
 * upycms 入口配置文件
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 */

$proRoot = dirname(dirname(dirname(__DIR__)));

Yii::setAlias('@proRoot', $proRoot);
Yii::setAlias('@srcRoot', $proRoot . '/src');
Yii::setAlias('@appRoot', $proRoot . '/app');

$dbFile = $proRoot . '/app/config/db.php';
if (!file_exists($dbFile)) exit('Hoops!Database config file is not found.');

$db = require($dbFile);
$params = require __DIR__ . '/params.php';
$urls = require(__DIR__ . '/urls.php');
$components = require(__DIR__ . '/components.php');


$components['db'] = $db;
$components['urlManager'] = [
    'showScriptName' => false,
    'enablePrettyUrl' => true,
    'rules' => $urls,
];

$config = [
    'id' => 'basic',
    'basePath' => $proRoot,
    'bootstrap' => ['log'],
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm' => '@vendor/npm-asset',
        '@upy' => '@proRoot/vendor/upy/core',
    ],
    'components' => $components,
    'params' => $params
];


if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];
}


return $config;


