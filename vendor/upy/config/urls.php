<?php

/**
 * upycms 获取路由配置文件
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */


$webUrlConfig = Yii::getAlias('@appRoot/config/urls.php');
if(!file_exists($webUrlConfig)) exit('Hoops! Urls file is not found');

$webUrls = require($webUrlConfig);

$baseUrls = [
    '' => 'web/index',
//    '<app:\w+>.html'=>'app/web/index',
//    '<app:\w+>/list-<cateid:\d+|\w+>.html'=>'app/web/list',
//    '<app:\w+>/<dataid:\d+|\w+>.html'=>'app/web/show',
//    '<app:\w+>/push<suffix:.html>?'=>'app/web/push',
//    'web/<module:\w+>/<action:\w+>.html'=>'<module>/web/<action>',
//    'web/<module:\w+>/<controller:\w+>/<action:\w+>.html'=>'<module>/web/<controller>/<action>',
];

$adminUrls = [
    'admin/?' => 'admin/admin/index',
    'site/error' => 'admin/admin/index',
    'admin/login/?' => 'admin/web/login',
    'admin/captcha/?' => 'admin/web/captcha',
    'admin/test' => 'admin/web/test',
    // 'admin/account/?' => 'admin/admin/account',
//    'admin/logout/?' => 'admin/admin/logout',
//    'admin/init/?' => 'admin/admin/init',
//    // 'admin/update/?' => 'admin/admin/update',
//    'admin/category/<action:\w+>'=>'app/admin/category/<action>',
//    'admin/<module:\w+>/preview'=>'<module>/preview/preview',
//    'admin/<module:\w+>/<controller:\w+>/preview'=>'<module>/preview/<controller>/preview',
//    'admin/<module:\w+>/<action:\w+>'=>'<module>/admin/<action>',
//    'admin/<module:\w+>/<controller:\w+>/<action:\w+>'=>'<module>/admin/<controller>/<action>',
];

return array_merge($webUrls, $baseUrls, $adminUrls);

