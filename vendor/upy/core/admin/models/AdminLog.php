<?php

/**
 *  日志模型
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */


namespace upy\admin\models;

use Yii;

class AdminLog extends BaseModel
{
    public static function tableName(){
        return '{{upy_logs}}';
    }
	
	public function rules()
	{
		return [
            [['app', 'action', 'message', 'data', 'ip', 'level'], 'safe'],
            [['lang'], 'default', 'value'=>Yii::$app->language],
            ['level', 'default', 'value'=>'info'],
			[['created_at'], 'default', 'value' => date('Y-m-d H:i:s')],
			[['user_id'], 'default', 'value'=>-1],
            [['ip'], 'default', 'value'=>Yii::$app->request->userIP]
		];
	}

    public static function addLog($level, $app, $action, $message, $data){
        $logData = [
            'app'=>$app,
            'action'=>$action,
            'message'=>$message,
            'data'=>$data,
            'level'=>$level,
            'user_id'=>Yii::$app->admin->isGuest ? 0 : Yii::$app->admin->identity->id
        ];

        $log = new self;
        if ($log->saveData($logData)){
            return $log;
        }

        return null;
    }


}
