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
//            'ip' => [
//                'class' => AdminIpFilter::className(),
//                'except' => ['logout'],
//            ],
//            'afterAction' => [
//                'class' => AdminAfterActionFilter::className(),
//                'except' => ['index'],
//            ]
        ];
    }

    public function actionIndex()
    {
        if (YII_ENV === 'dev') {
            $debug = true;
            $distUrl = '/../resources/src/admin/';
            $proRoot = Yii::getAlias('@proRoot');
            $jspath = '/../resources/src/admin/js';
        } else {
            $debug = false;
            $distUrl = '/static/dist/admin/';
        }

        $siteUrl = Yii::$app->request->getHostInfo();
        $csrfToken = Yii::$app->request->getCsrfToken();
        $name = Yii::getAlias('@name');
        $version = Yii::getAlias('@version');
        return $this->render('/index.html', compact('debug', 'distUrl', 'siteUrl', 'csrfToken', 'name', 'version'));

    }
}