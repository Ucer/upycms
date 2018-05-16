<?php

/**
 * upycms 入口配置文件
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 */

$proRoot = dirname(dirname(dirname(__DIR__)));

Yii::setAlias('@srcRoot', $proRoot . '/src');
Yii::setAlias('@appRoot', $proRoot . '/app');


$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

