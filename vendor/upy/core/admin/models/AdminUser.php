<?php

namespace upy\admin\models;
use yii\helpers\ArrayHelper;
use Yii;

/**
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */


class AdminUser extends BaseModel implements \yii\web\IdentityInterface
{

    public static function tableName()
    {
        return '{{upy_admin_users}}';
    }

    public function rules()
    {
        return [
            [['role_id'], 'validateRole'],
            [['type'], 'default', 'value' => 'manager'],
            [['username'], 'required'],
            [['username'], 'string', 'min' => 4, 'max' => 32],
            [['password'], 'validateUserPassword'],
            [['salt'], 'string', 'max' => 32],
            [['status'], 'default', 'value' => 1],
            [['email'], 'default', 'value' => ''],
            [['created_at', 'updated_at'], 'default', 'value' => date('Y-m-d H:i:s')],
            [['nickname'], 'safe']
        ];
    }

    public function validateRole($attribute, $params)
    {
        if ($this->type != 'developer'){
            if (!AdminRole::find()->where(['id'=>$this->role_id])->exists()){
                $this->addError($attribute, '角色组不存在');
            }
        }
    }

    public function validateUserPassword($attribute, $params)
    {
        $_password = ArrayHelper::getValue(Yii::$app->request->post(), '_password', null);
        if ($this->id === null || $_password){
            if (!$_password){
                $this->addError($attribute, '密码不能为空');
            }

            if (strlen($_password) < 6){
                $this->addError($attribute, '密码不能小于6位');
            }

            if (strlen($_password) > 32){
                $this->addError($attribute, '密码不能大于32位');
            }
        }
    }

    public function beforeSave($insert){
        if ($insert || ArrayHelper::getValue(Yii::$app->request->post(), '_password', null)){
            $this->setPassword($this->password);
        }

        return true;
    }

    public function setPassword($password)
    {
        $this->generateAuthKey();
        $this->password = Yii::$app->security->generatePasswordHash($password);
    }

    public function generateAuthKey()
    {
        $this->salt = Yii::$app->security->generateRandomString();
    }

    public function saveData($data = null){
        $data = $data ? $data : Yii::$app->request->post();
        if (ArrayHelper::getValue($data, '_password', null)){
            $data['password'] = $data['_password'];
        }

        return parent::saveData($data);
    }

    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token]);
    }


    public static function findByUsername($username)
    {
        $user = static::find()
            ->where(['username' => $username])
            ->asArray()
            ->one();

        if($user){
            return new static($user);
        }

        return null;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getAuthKey()
    {
        return $this->salt;
    }

    public function validateAuthKey($authKey)
    {
        return $this->authKey === $authKey;
    }

    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password);
    }

    public function getAttributes($names = null, $except = ['password', 'salt'])
    {
        $attrs = parent::getAttributes($names, $except);

        if ($names === null) {
            $names = ['role'];
        }

        if (in_array('role', $names) && !in_array('role', $except)) {
            $attrs['role'] = $this->role;
        }

        $attrs['status'] = intval($attrs['status']);

        return $attrs;
    }
}
