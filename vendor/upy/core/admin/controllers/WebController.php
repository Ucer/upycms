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

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }



    public function actionLogin()
    {
        $tpl = '/login.html';
        $data = [
            'csrftoken' => Yii::$app->request->csrfToken,
            'nextUrl'=>'',
            'name' => 'upy',
            'errorInfo'=>''
        ];
        return $this->render($tpl, $data);
    }
}
