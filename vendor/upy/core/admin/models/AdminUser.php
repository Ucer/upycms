<?php
namespace upy\admin\models;

use Yii;
use yii\base\Model;
use yii\helpers\ArrayHelper;
use wpg\base\models\BaseModel;

class AdminUser extends BaseModel implements \yii\web\IdentityInterface
{

    public function rules()
    {
        return [
            [['role_id'], 'validateRole'],
            [['type'], 'default', 'value'=>'manager'],
            [['username'], 'required'],
            [['username'], 'string', 'min'=>4, 'max'=>32],
            // [['password'], 'string', 'min'=>6, 'max'=>60],
            [['password'], 'validateUserPassword'],
            [['salt'], 'string', 'max'=>32],
            [['status'], 'default', 'value'=>1],
            [['email'], 'default', 'value'=>''],
            [['created_time', 'updated_time'], 'default', 'value'=>date('Y-m-d H:i:s')],
            [['nickname'], 'safe']
        ];
    }

    /**
     * 验证权限组
     * @param  [type] $attribute [description]
     * @param  [type] $params    [description]
     * @return [type]            [description]
     */
    public function validateRole($attribute, $params)
    {
        if ($this->type != 'developer'){
            if (!AdminRole::find()->where(['id'=>$this->role_id])->exists()){
                $this->addError($attribute, '角色组不存在');
            }
        }
    }

    /**
     * 验证密码
     * @param  [type] $attribute [description]
     * @param  [type] $params    [description]
     * @return [type]            [description]
     */
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

    /**
     * 保存之前
     */
    public function beforeSave($insert){
        if ($insert || ArrayHelper::getValue(Yii::$app->request->post(), '_password', null)){
            $this->setPassword($this->password);
        }
        
        return true;
    }

    /**
     * 保存用户数据
     */
    public function saveData($data = null){
        $data = $data ? $data : Yii::$app->request->post();
        if (ArrayHelper::getValue($data, '_password', null)){
            $data['password'] = $data['_password'];
        }
        
        return parent::saveData($data);
    }

    /**
     * 获取用户角色
     */
    public function getRole(){
        return $this->hasOne(AdminRole::className(), ['id' => 'role_id']);
    }

    /**
     * 获取用户权限
     */
    public function getPermissions(){
        return $this->hasMany(AdminPermission::className(), ['role_id' => 'role_id']);
    }

    /**
     * 检查用户权限
     */
    public function checkPermission($app, $act=null, $pers=null){
        $havePers = $this->permissions;
        if (is_array($pers)){
            $perList = []; //具有权限的控制器
            foreach ($havePers as $per){
                $perapp = $per->getApp();
                if (property_exists($perapp, 'type') && $perapp->type !== $app){
                    return false;
                }
                $perdata = ArrayHelper::getValue($per->attributes, 'data', []);
                foreach ($perdata as $v){
                    $p = ArrayHelper::getValue($pers, $v, null);
                    if (is_array($p)){
                        $perList = array_merge($perList, $p);
                    }
                    
                    if (is_string($p)){
                        array_push($perList, $p);
                    }
                }
            }

            if (!in_array($act, $perList)){
                return false;
            }
        }

        return true;
    }


    /**
     * @inheritdoc
     */
    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    /**
     * @inheritdoc
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token]);
    }

    /**
     * 根据username查找用户
     *
     * @param string $username
     * @return static|null
     */
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

    /**
     * @inheritdoc
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @inheritdoc
     */
    public function getAuthKey()
    {
        return $this->salt;
    }


    /**
     * @inheritdoc
     */
    public function validateAuthKey($authKey)
    {
        return $this->authKey === $authKey;
    }

    /**
     * 密码验证
     *
     * @param string $password 要验证的密码
     * @return boolean
     */
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password);
    }

    /**
     * [generateAuthKey description]
     * @return [type] [description]
     */
    public function generateAuthKey()
    {
        $this->salt = Yii::$app->security->generateRandomString();
    }

    /**
     * 设置用户密码
     * @param [type] $password [description]
     */
    public function setPassword($password)
    {
        $this->generateAuthKey();
        $this->password = Yii::$app->security->generatePasswordHash($password);
    }

    /**
     * 获取用户属性值
     * @param  array  $names   要返回的属性列表，默认为null，返回全部属性值
     * @param  array  $except  要排除的属性列表
     * @return array  $attrs   属性值(name => value)
     */
    public function getAttributes($names = null, $except = ['password', 'salt'])
    {
        $attrs = parent::getAttributes($names, $except);

        if ($names === null) {
            $names = ['role'];
        }

        if (in_array('role', $names) && !in_array('role', $except)){
            $attrs['role'] = $this->role;
        }

        $attrs['status'] = intval($attrs['status']);

        return $attrs;
    }

}
