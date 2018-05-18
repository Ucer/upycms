<?php
namespace upy\admin\filters;

/**
 * upycms 后台 ip 过滤器
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */


use Yii;
use yii\base\ActionFilter;
use yii\helpers\ArrayHelper;
use wpg\setting\models\Setting;

class AdminFilter extends ActionFilter
{

	/**
	 * 所有action执行前执行
	 * @return  boolean  $data
	 */
	public function beforeAction($action){
	    dd('bf');
		return true;
	}
}