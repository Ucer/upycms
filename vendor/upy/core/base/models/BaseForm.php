<?php

namespace upy\base\models;

use yii\base\Model;

class BaseForm extends Model
{

	public function getError(){
		$errors = $this->getErrors();
		foreach ($errors as $key=>$e){
			return $e[0];
			break;
		}

		return null;
	}

}
