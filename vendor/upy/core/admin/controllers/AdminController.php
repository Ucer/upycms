<?php

namespace upy\admin\controllers;

/**
 * 后台控器
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */

use upy\admin\filters\AdminFilter;
use upy\admin\filters\AdminPermissionFilter;
use Yii;

class AdminController extends AdminBaseController
{
    public function behaviors()
    {
        return [
            'request' => [
                'class' => AdminFilter::className(),
                'except' => ['index', 'logout'],
            ],
            'permission' => [
                'class' => AdminPermissionFilter::className(),
            ],
        ];
    }

    public function actionIndex()
    {
        if (YII_ENV === 'dev') {
            $debug = true;
            $distUrl = '/static/src/admin/';
            $proRoot = Yii::getAlias('@proRoot'). '/web';
            $jspath = '/static/src/admin/js';
            $this->scanDir($fileList, $proRoot . $jspath);
            $jsFileList = [];
            foreach ($fileList as $key=>$value){
                array_push($jsFileList, $jspath . $value);
            }
        } else {
            $debug = false;
            $distUrl = '/static/dist/admin/';
        }

        $siteUrl = Yii::$app->request->getHostInfo();
        $csrfToken = Yii::$app->request->getCsrfToken();
        $name = Yii::getAlias('@name');
        $version = Yii::getAlias('@version');
        return $this->render('/index.html',get_defined_vars());

    }

    protected function scanDir(&$arr_file, $directory, $dir_name='')
    {

        $mydir = dir($directory);
        while($file = $mydir->read())
        {
            if((is_dir("$directory/$file")) AND ($file != ".") AND ($file != ".."))
            {
                $this->scan_dir($arr_file, "$directory/$file", "$dir_name/$file");
            }
            else if(($file != ".") AND ($file != ".."))
            {
                $arr_file[] = "$dir_name/$file";
            }
        }
        $mydir->close();
    }
}