<?php

namespace upy\base\controllers;

/**
 * 控制器基类
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */


use Yii;
use yii\web\Controller;

class BaseController extends Controller
{

    public $layout = false;
    public $request;

    public function __construct($id, $module, $config = [])
    {
        parent::__construct($id, $module, $config);
        $this->request = Yii::$app->request;
    }

    protected function respond($status, $respond_data, $message, $data_type)
    {
        if ($data_type === 'json') {
            Yii::$app->response->format = 'json';
            return ['status' => $status, 'data' => $respond_data, 'message' => $message];
        }
        return ['status' => $status, 'data' => $respond_data, 'message' => $message];
    }

    protected function succeed($respond_data = [], $message = 'Request success!', $data_type = 'json')
    {
        return $this->respond(true, $respond_data, $message, $data_type);
    }

    protected function failed($message = 'Request failed!', $respond_data = [], $data_type = 'json')
    {
        return $this->respond(false, $respond_data, $message, $data_type);
    }


}
