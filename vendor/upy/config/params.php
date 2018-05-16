<?php

/**
 *  upycms params 配置文件
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 */

$excludeFiles = ['db', 'urls', 'upy', 'components', 'params'];
$fileList = glob(Yii::getAlias('@appRoot/config/*.php'));
$appParamFile = Yii::getAlias('@appRoot/config/params.php');

$params = [];
if (is_file($appParamFile)) {
    $params = require($appParamFile);

}


foreach ($fileList as $value) {
    $appConf = $upyConf = [];
    $file = basename($value);
    $fileName = explode('.', $file)[0];

    if (!in_array($fileName, $excludeFiles)) {
        $upyConfFile = __DIR__ . '/' . $file;
        if (is_file($value)) {
            $appConf = require($value);
        }
        if (is_file($upyConfFile)) {
            $upyConf = require($upyConfFile);
        }

        $params[$fileName] = array_merge($upyConf, $appConf);
    }
}

return $params;
