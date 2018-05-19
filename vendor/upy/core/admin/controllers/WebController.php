<?php

namespace upy\admin\controllers;

/**
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */


use upy\base\controllers\BaseController;
use yii\captcha\CaptchaAction;
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
                'backColor' => 0XEEEEEE,
                'maxLength' => 3,
                'minLength' => 3,
                'height' => 46,
                'offset' =>4
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
