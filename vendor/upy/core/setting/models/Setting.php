<?php

/**
 * 后台设置项模型
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */


namespace  upy\setting\models;

use upy\admin\models\BaseModel;
use yii\helpers\ArrayHelper;
use Yii;

class Setting extends BaseModel
{
    public static function tableName()
    {
        return '{{upy_settings}}';
    }
    public function rules()
    {
        return [
            [['name'], 'required', 'message'=>'系统设置名'],
            [['name'], 'unique', 'message'=>'系统设置名已存在，请重新设置'],
            [['value'], 'required', 'message'=>'系统设置值'],
            [['namespace'], 'default', 'value'=>'default']
        ];
    }


    public static function getData($name, $default = null){
        $cache = Yii::$app->cache;
        $subname = null;
        if (strpos($name, '.')!==false){
            list($name, $subname) = explode('.', $name, 2);
        }
        $cacheKey = "setting-" . $name;
        $data = $cache->get($cacheKey);
        if ($data === false) {
            $setting = self::findOne(["name"=>$name]);
            if ($setting){
                $data = json_decode($setting->value, JSON_FORCE_OBJECT);
            }else{
                if ($default){
                    $data = $default;
                }else{
                    $data = json_decode("[]", JSON_FORCE_OBJECT);
                }
            }
            $cache->set($cacheKey, $data);
        }else if(is_string($data)){
            $data = json_decode($data, JSON_FORCE_OBJECT);
        }

        if ($subname && is_array($data)){
            $data = ArrayHelper::getValue($data, $subname, null);
        }

        return $data;
    }
}