
jQuery(document).ready(function() {
    
    /*
        表单处理
    */
    var loginForm = $('.login-form'),
        formTip = $('.form-tip'),
        formTipText = formTip.text();
    var getCaptchaUrl = '/admin/captcha?refresh=1';

    $('.login-form input[type="text"], .login-form input[type="password"]').on('focus', function() {
    	formTip.text(formTipText).removeClass('form-errortip');
        $(this).removeClass('input-error');
    });

    $('.captcha-data').on('click', function(){
        var btn = $(this);
        btn.find('img').attr('src', '');
        $('.captcha-data-loading').show();
        $.post(getCaptchaUrl, {_token: loginForm.find('[name="_token"]').val()}, function(resp){
            btn.find('img').attr('src', resp.url);
            $('.captcha-data-loading').hide();
        }, 'json').error(function(){
            
        })
    });

    $('.captcha-data').click();
    
    loginForm.on('submit', function(e) {
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});

        if (!loginForm.find('.input-error').length){
            var btn = $('button[type=submit]'),
                btnText = btn.text();

            btn.text('正在登录...').attr('disabled', true);
            $.post(loginForm.attr('action'), loginForm.serialize(), function(resp){
                if (resp.status === true){
                    btn.text('登录成功,正在跳转...');
                    // window.location.href = resp.data.url;
                }else{
                    $('.refresh-captcha-btn').click();
                    formTip.text(resp.message).addClass('form-errortip');
                    btn.text(btnText).attr('disabled', false);
                }
            }, 'json').error(function(){
                console.log('bb');
                $('.captcha-data').click();
                formTip.text(formTipText).addClass('form-errortip');
                btn.text(btnText).attr('disabled', false);
            });
        }

        return false;
    });
    
});
