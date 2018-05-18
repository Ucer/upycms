<?php

namespace upy\admin\controllers;

/**
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */


use upy\base\controllers\BaseController;
use Yii;

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
        $tpl = '/login.html';
        $data = [
            'name' => 'upy',
            'errorInfo' => ''
        ];
        return $this->render($tpl, $data);
    }
}
