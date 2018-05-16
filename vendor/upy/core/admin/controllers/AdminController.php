<?php

namespace upy\admin\controllers;

use yii\base\Controller;

class AdminController extends Controller
{
    public function __construct($id, $module, $config = [])
    {
        dd('construct');
//        parent::__construct($id, $module, $config);
//        $this->request = Yii::$app->request;
    }

    public function adctionIdex()
    {
        dd('admin');

    }
}