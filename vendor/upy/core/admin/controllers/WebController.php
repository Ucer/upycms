<?php

namespace upy\admin\controllers;

/**
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */

use upy\admin\models\AdminLog;
use upy\admin\models\AdminLoginForm;
use upy\base\controllers\BaseController;
use upy\setting\models\Setting;
use yii\captcha\CaptchaAction;
use Yii;
use yii\helpers\ArrayHelper;

class WebController extends BaseController
{

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
                'backColor' => 0XEEEEEE,
                'maxLength' => 3,
                'minLength' => 3,
                'height' => 46,
                'offset' => 4
            ],
        ];
    }


    public function actionLogin()
    {
        $securitySetting = Setting::getData("security", [
            "admin_white_iplist" => []
        ]);

        $admin_white_iplist = ArrayHelper::getValue($securitySetting, 'admin_white_iplist', []);
//        $admin_notaccess_tip = ArrayHelper::getValue($securitySetting, 'admin_notaccess_tip', '没有访问权限，请联系管理员');
        $userIp = Yii::$app->request->userIP;

        if ($this->request->isAjax && $this->request->isPost) { // 登录
            if (count($admin_white_iplist) && !in_array($userIp, $admin_white_iplist)) {
                $message = '非法访问(受限IP)';
                AdminLog::addLog('warn', 'upy-account', 'login', $message, $userIp);
                return $this->failed($message);
            }

            $m_admin_login_form = new AdminLoginForm;
            $postData = $this->request->post();
            $url = $this->request->post('next', '/admin');
            if ($m_admin_login_form->load($postData, '') && $m_admin_login_form->login()) {
                if (!$url) {
                    $url = '/admin';
                }

                return $this->ajaxReturnSuccess(['url' => $url]);
            } else {
                $errorInfo = $m_admin_login_form->getError() ? $m_admin_login_form->getError() : '用户名或密码错误';
                AdminLog::addLog('warn', 'upy-account', 'login', $errorInfo, $postData['username']);
                return $this->failed($errorInfo);
            }
        } else {
            $tpl = '/login.html';
            $data = [
                'csrftoken' => $this->request->csrfToken,
                'nextUrl' => '',
                'name' => 'upy',
                'errorInfo' => ''
            ];
            return $this->render($tpl, $data);
        }
    }
}
