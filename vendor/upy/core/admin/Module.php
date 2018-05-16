<?php

namespace upy\admin;

class Module extends \yii\base\Module
{
	public $controllerNamespace = __NAMESPACE__ . '\controllers';
	
    public function init()
    {
        parent::init();
    }
}