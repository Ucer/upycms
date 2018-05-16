<?php

return [
    'admin' => [
        'class' => 'yii\web\User',
        'identityClass' => 'upy\admin\models\AdminUser',
        'enableAutoLogin' => false,
        'identityCookie' => ['name' => '__manager_identity', 'httpOnly' => true],
        'idParam' => '__manager',
        'loginUrl' => ['admin/login']
    ],
];