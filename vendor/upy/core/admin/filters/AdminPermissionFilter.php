<?php
namespace upy\admin\filters;

/**
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */


use Yii;
use yii\helpers\Url;
use yii\base\ActionFilter;

class AdminPermissionFilter extends ActionFilter 
{
	public function beforeAction($action){
		if (Yii::$app->admin->isGuest) {
            if (Yii::$app->request->isAjax) {
				Yii::$app->response->format = 'json';
				Yii::$app->response->data = ['code' => 401, 'msg' => '请先登录'];
				return false;
            } else {
                return Yii::$app->getResponse()->redirect(Url::to(['/admin/login']));
            }
        }else{
        	return parent::beforeAction($action);
        }
	}
}