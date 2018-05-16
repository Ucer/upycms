<?php

/**
 * upycms 获取模块配置
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */

$proRoot = Yii::getAlias('@proRoot');

$modules = [];
$modulePathList = ['upy/core', 'modules'];

foreach($modulePathList as $position){
    $modulePath = ($position === 'modules') ? $proRoot . '/src/' . $position . '/' : $proRoot . '/vendor/' . $position . '/' ;

    $listFile = glob($modulePath . '*/Module.php');
    if(is_array($listFile)){
        foreach ($listFile as $key => $value) {
            $dir = basename(dirname($value));
            $clsPre = ($position === 'modules') ? 'src\\' . $position . '\\' . $dir : 'upy\\' . $dir;
            $modules[$dir] = [
                'namespace' => $clsPre,
                'class' => $clsPre . '\Module',
                'path' => $modulePath . $dir
            ];
        }

    }
}

return $modules;
