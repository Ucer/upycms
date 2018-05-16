<?php

// comment out the following two lines when deployed to production
defined('YII_DEBUG') or define('YII_DEBUG', true);
defined('YII_ENV') or define('YII_ENV', 'dev');

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../vendor/yiisoft/yii2/Yii.php';

function dd($str)
{
    if (is_array($str)) {
        echo '<pre>';
        print_r($str);
        echo '</pre>';
    } else {
        echo $str;
    }
    die;
}

//$config = require __DIR__ . '/../config/web.php';
$config = require __DIR__ . '/../vendor/upy/config/web.php';

(new yii\web\Application($config))->run();
