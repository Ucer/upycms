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


	public function beforeAction($action){
        if (!Yii::$app->request->isPost || !Yii::$app->request->isAjax){
            if (Yii::$app->request->isAjax){
                Yii::$app->response->format = 'json';
                Yii::$app->response->data = ['code' => 400, 'msg' => '非法请求'];
                return false;
            }else{
                $tpl = Yii::getAlias('@upy') . '\admin\views\error.html';
                Yii::$app->response->data = $action->controller->renderFile($tpl, [
                    'name' => Yii::getAlias('@name'),
                    'tipinfo' => '非法请求'
                ]);
                return false;
            }
        }

        return true;
    }
}