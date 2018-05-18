<?php
namespace upy\admin\controllers;

/**
 * upycms 后台控制器基类
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */


use upy\admin\filters\AdminFilter;
use upy\base\controllers\BaseController;
use yii\web\Controller;
use Yii;

class AdminBaseController extends BaseController
{
    protected $adminUser;
    protected $adminUserId;

    public function __construct($id, $module, $config = [])
    {
        parent::__construct($id, $module, $config);
    }

}