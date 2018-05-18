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
