<?php
namespace  upy\admin\models;

use yii\db\ActiveRecord;

/**
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */

use Yii;

class  BaseModel extends ActiveRecord
{

    public function getError(){
        $errors = $this->getErrors();
        foreach ($errors as $key=>$e){
            return $e[0];
            break;
        }

        return null;
    }

    public function saveData($data = null){
        $data = $data ? $data : Yii::$app->request->post();
        if ($this->load($data, '') && $this->validate()) {
            try{
                return $this->save();
            }catch(yii\db\Exception $e){
                throw $e; // 生产环境删除
                $errorInfo = count($e->errorInfo) == 3 ? $e->errorInfo[2] : '';
                $errorInfo = $errorInfo ? '数据保存失败：'.$errorInfo : '数据保存失败，请联系管理员。';
                $this->addError('upy_db_exception', $errorInfo);
                return false;
            }
        }
        return false;
    }
}
