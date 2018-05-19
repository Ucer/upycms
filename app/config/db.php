<?php

/**
 * 数据库配置文件
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */

return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=upycms',
    'username' => 'root',
    'password' => 'route',
    'charset' => 'utf8',

    // Schema cache options (for production environment)
    //'enableSchemaCache' => true,
    //'schemaCacheDuration' => 60,
    //'schemaCache' => 'cache',
];
