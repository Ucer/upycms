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

class BaseController extends Controller {

	public $layout = false;
	public $request;

	public function __construct($id, $module, $config = [])
	{
		parent::__construct($id, $module, $config);
		$this->request = Yii::$app->request;
	}

	/**
	 * ajax返回
	 * @param  [type] $data   response的数据
	 * @param  string $format response格式类型
	 * @return [type] $data
	 */
	protected function ajaxReturn($data, $format="JSON")
	{
		Yii::$app->response->format = strtolower($format);
		return $data;
	}

	/**
	 * AJAX返回成功请求
	 * @param   object  $data  成功返回的数据，任意类型
	 * @param   string  $msg   提示信息
	 * @return  array  $data
	 */
	protected function ajaxReturnSuccess($data = null, $msg = '请求成功'){
     	$result = ['code' => 200, 'msg' => $msg];
     	if ($data !== null){
     		$result['data'] = $data;
     	}

     	return $this->ajaxReturn($result);
	}


	/**
	 * AJAX返回失败请求
	 * @param   string  $msg   提示信息，一般为字符串
	 * @param   int     $code  错误码
	 * @return  array  $data
	 */
	protected function ajaxReturnError($msg = '请求失败', $code = 400){
     	$result = ['code' => $code, 'msg' => $msg];
     	return $this->ajaxReturn($result);
	}

}
