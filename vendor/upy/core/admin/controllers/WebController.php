<?php

namespace upy\admin\controllers;

/**
 * 后台首页
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */


use Yii;
use yii\helpers\Url;
use yii\helpers\ArrayHelper;
use yii\captcha\CaptchaAction;
use wpg\admin\models\AdminLoginForm;
use wpg\base\controllers\BaseController;
use wpg\setting\models\Setting;
use wpg\admin\models\AdminLog;

class WebController extends BaseController
{
    
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
                'backColor' => 0XEEEEEE,
                'maxLength' => 4,
                'minLength' => 4,
                'height' => 46,
            ],
        ];
    }

    public function actionLogin()
    {
        dd('login controller');

    }
}
