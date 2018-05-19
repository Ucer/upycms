<?php

namespace upy\admin\models;

/**
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */

use Yii;
use yii\base\Model;
use upy\base\models\BaseForm;


class AdminLoginForm extends BaseForm
{
    public $username;
    public $password;
    public $_captcha;
    public $_rememberMe = false;

    private $_user = false;


    public function rules()
    {
        return [
            ['username', 'required', 'message'=>'账号不能为空'],
            ['password', 'required', 'message'=>'密码不能为空'],
            ['password', 'validatePassword'],
            ['_captcha', 'required', 'message'=>'验证码不能为空'],
            ['_captcha', 'validateCaptcha', 'message'=>'验证码不正确'],
            ['_rememberMe', 'boolean']
        ];
    }


    public function validatePassword($attribute, $params)
    {
        if (!$this->hasErrors()) {
            $user = $this->getUser();

            if (!$user || !$user->validatePassword($this->password)) {
                $this->addError($attribute, '登录账号或密码错误');
            }
        }
    }


    public function validateCaptcha($attribute, $params) {
        $captcha_validate  = new \yii\captcha\CaptchaAction('captcha', Yii::$app->controller);
        if($this->$attribute){
            $code = $captcha_validate->getVerifyCode();
            if($this->$attribute!=$code){
                $this->addError($attribute, '验证码不正确');
            }
        }
    }


    public function login()
    {
        if ($this->validate()) {
            return Yii::$app->admin->login($this->getUser(), $this->_rememberMe ? 3600*24*30 : 0);
        }
        return false;
    }


    public function getUser()
    {
        if ($this->_user === false) {
            $this->_user = AdminUser::findByUsername($this->username);
        }

        return $this->_user;
    }
}
