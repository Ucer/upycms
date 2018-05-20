<?php

/**
 * upy 获取相关配置
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */
$upyConfigFile = Yii::getAlias('@appRoot/config/upy.php');
if (file_exists($upyConfigFile)) {
    $upyConfigFile = require($upyConfigFile);
} else {
    $upyConfigFile = [];
}

return array_merge([
    'name' => 'upy',
    'version' => '0.0.5'
], $upyConfigFile);

