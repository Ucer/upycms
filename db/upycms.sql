-- upy_settings  系统设置表
-- upy_logs  系统日志
-- upy_admin_users 管理员用户表

DROP TABLE IF EXISTS upy_settings;
CREATE TABLE IF NOT EXISTS upy_settings (
  id int(10) UNSIGNED AUTO_INCREMENT,
  name enum('security','mobile','watermark','site','video') not null default 'security' comment '系统设置名',
  value longblob not null  comment '系统设置值',
  namespace varchar(255) not null default 'default',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='系统设置表';


DROP TABLE IF EXISTS upy_logs;
CREATE TABLE IF NOT EXISTS upy_logs (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id int(11) unsigned not null default 0 comment '操作人ID',
  app varchar(32) not null default  '' comment '日志所属应用',
  lang char(20) not null default '' comment '语言',
  action varchar(32) not null default  '' comment '日志所属操作类型',
  message varchar(500) not null  default '' comment '日志内容',
  data varchar(500) not null default '' comment '日志数据',
  ip varchar(255) not null default '',
  created_at datetime not null ,
  level char(10) not null comment '日志等级',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='系统日志表';


DROP TABLE IF EXISTS upy_admin_users;
CREATE TABLE IF NOT EXISTS upy_admin_users (
  id int(11) NOT NULL AUTO_INCREMENT,
  role_id int(5) not null default 0,
  type enum('developer', 'manager') not null default 'manager' comment '账号类型',
  username varchar(32) not null default '' ,
  password varchar(32) not null default '' ,
  slat varchar(32) not null default '' comment '密码加权码',
  nickname varchar(32) not null default '',
  email varchar(32) not null default '',
  status tinyint(4) not null default 1 comment '用户状态：1正常',
  created_at datetime not null,
  updated_at datetime not null,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='后台管理员表';
