/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.tinymce', ['WPGUI.popup', 'WPGUI.insertimage', 'WPGUI.video'])
  .value('uiTinymceConfig', {})
  
  .run([ '$templateCache', function($templateCache) {
    $templateCache.put('tinymce/link.tpl.html', '<div class="form-horizontal"><div class="form-group"><div class="col-md-2 control-label">网址:</div><div class="col-md-10 controls"><input class="form-control" ng-model="data.href"></div></div> \
    		<div class="form-group"><div class="col-md-2 control-label">显示文字:</div><div class="col-md-10 controls"><input class="form-control" ng-model="data.text"></div></div> \
    		<div class="form-group"><div class="col-md-2 control-label">标题:</div><div class="col-md-10 controls"><input class="form-control" ng-model="data.title"></div></div> \
    		<div class="form-group"><div class="col-md-2 control-label">打开方式:</div><div class="col-md-10 controls"><select class="form-control" ng-model="data.target"><option value="">原窗口打开</option><option value="_blank">跳转新窗口</option></select></div></div></div>'
    		);
    $templateCache.put('tinymce/code.tpl.html', '<div class="form-group"><textarea class="form-control" ng-model="code" style="height: 400px; font-size: 12px;"></textarea></div>');
    $templateCache.put('tinymce/video.tpl.html', '<div class="form-group"><div bui-video ng-model="data.video"></div></div>');
  
  } ])
  
  .directive('uiTinymce', ['$rootScope', '$compile', '$timeout', '$window', '$sce', 'uiTinymceConfig', 'wpguiPopup', 'insertImage', function($rootScope, $compile, $timeout, $window, $sce, uiTinymceConfig, wpguiPopup, insertImage) {
    uiTinymceConfig = uiTinymceConfig || {};
    var generatedIds = 0;
    var ID_ATTR = 'ui-tinymce';
    if (uiTinymceConfig.baseUrl) {
      tinymce.baseURL = uiTinymceConfig.baseUrl;
    }

    return {
      require: ['ngModel', '^?form'],
      link: function(scope, element, attrs, ctrls) {
        if (!$window.tinymce) {
          return;
        }

        var ngModel = ctrls[0],
          form = ctrls[1] || null;

        var expression, options, tinyInstance,
          updateView = function(editor) {
            var content = editor.getContent({format: options.format}).trim();
            content = $sce.trustAsHtml(content);

            ngModel.$setViewValue(content);
            if (!$rootScope.$$phase) {
              scope.$apply();
            }
          };

        function toggleDisable(disabled) {
          if (disabled) {
            ensureInstance();

            if (tinyInstance) {
              tinyInstance.getBody().setAttribute('contenteditable', false);
            }
          } else {
            ensureInstance();

            if (tinyInstance) {
              tinyInstance.getBody().setAttribute('contenteditable', true);
            }
          }
        }

        // generate an ID
        var editorId = ID_ATTR + '-' + generatedIds++;
        attrs.$set('id', editorId);

        expression = {};

        angular.extend(expression, scope.$eval(attrs.uiTinymce));

        options = {
          // Update model when calling setContent
          // (such as from the source editor popup)
          setup: function(ed) {
            ed.on('init', function() {
              ngModel.$render();
              ngModel.$setPristine();
              if (form) {
                form.$setPristine();
              }
              
              angular.element("#"+editorId+" [aria-label='Insert/edit link']").on("click", function(){
            	  // var scope = {selectList: []};

            	  var scope = $rootScope.$new();
            	  scope.data = {href:"", text:"" , title:"", target: ""};
                  wpguiPopup({
                	  scope: scope,
                      title: "插入链接",
                      // placement: 'top',
                      // style: "width: 975px;",
                      contentTemplate: 'tinymce/link.tpl.html',
                      onClickConfirm: function () {
                    	  var outputHtml = '<a href="' + scope.data.href + '" title="' + scope.data.title + '" target="' + scope.data.target + '">' + scope.data.text + '</a>';
                    	  ed.insertContent(outputHtml);
                      }
                  });
              	return false;
              })
              
              angular.element("#"+editorId+" [aria-label='Source code']").on("click", function(){
            	  // var scope = {selectList: []};

            	  var scope = $rootScope.$new();
            	  scope.code = ed.getContent();
                  wpguiPopup({
                	  scope: scope,
                      title: "源代码",
                      placement: 'center',
                      // style: "width: 975px;",
                      contentTemplate: 'tinymce/code.tpl.html',
                      showMaximize: true,
                      onClickConfirm: function () {
                    	  ed.setContent(scope.code);
                      }
                  });
              	return false;
              })
              
              angular.element("#"+editorId+" [aria-label='Insert/edit image']").on("click", function(){
            	  // var scope = {selectList: []};
            	  var scope = $rootScope.$new();
            	  scope.selectList = [];
                  insertImage({
                	  scope: scope,
                      onClickConfirm: function () {
                    	  var htmls = [];
                    	  angular.forEach(scope.selectList,  function(item){
                    		  var h = ('<img src="' + item.url + '" /><br />');
                    		  htmls.push(h);
                    	  })
                    	  ed.insertContent(htmls.join());
                      }
                  });
              	return false;
              })
              
              angular.element("#"+editorId+" [aria-label='Insert/edit video']").on("click", function(){
            	  // var scope = {selectList: []};

            	  var scope = $rootScope.$new();
            	  scope.data = {
            	     video: {},
            	  };
                  wpguiPopup({
                	  scope: scope,
                      title: "插入视频",
                      placement: 'top',
                      style: "width: 780px;",
                      contentTemplate: 'tinymce/video.tpl.html',
                      onClickConfirm: function () {
                    	  ed.insertContent($sce.getTrustedHtml(scope.data.video.script));
                      }
                  });
              	return false;
              })
              
            });

            // Update model on button click
            ed.on('ExecCommand', function() {
              ed.save();
              updateView(ed);
            });

            // Update model on change
            ed.on('change', function(e) {
              ed.save();
              updateView(ed);
            });

            ed.on('blur', function() {
              element[0].blur();
            });

            // Update model when an object has been resized (table, image)
            ed.on('ObjectResized', function() {
              ed.save();
              updateView(ed);
            });

            ed.on('remove', function() {
              element.remove();
            });

            if (expression.setup) {
              expression.setup(ed, {
                updateView: updateView
              });
            }
          },
          format: 'raw',
          relative_urls: false,
          selector: '#' + attrs.id
        };
        // extend options with initial uiTinymceConfig and
        // options from directive attribute value
        angular.extend(options, uiTinymceConfig, expression);
        // Wrapped in $timeout due to $tinymce:refresh implementation, requires
        // element to be present in DOM before instantiating editor when
        // re-rendering directive
        $timeout(function() {
          tinymce.init(options);
          toggleDisable(scope.$eval(attrs.ngDisabled));
        });

        ngModel.$formatters.unshift(function(modelValue) {
          return modelValue ? $sce.trustAsHtml(modelValue) : '';
        });

        ngModel.$parsers.unshift(function(viewValue) {
          return viewValue ? $sce.getTrustedHtml(viewValue) : '';
        });

        ngModel.$render = function() {
          ensureInstance();

          var viewValue = ngModel.$viewValue ?
            $sce.getTrustedHtml(ngModel.$viewValue) : '';

          // instance.getDoc() check is a guard against null value
          // when destruction & recreation of instances happen
          if (tinyInstance &&
            tinyInstance.getDoc()
          ) {
            tinyInstance.setContent(viewValue);
            // Triggering change event due to TinyMCE not firing event &
            // becoming out of sync for change callbacks
            tinyInstance.fire('change');
          }
        };

        attrs.$observe('disabled', toggleDisable);

        // This block is because of TinyMCE not playing well with removal and
        // recreation of instances, requiring instances to have different
        // selectors in order to render new instances properly
        scope.$on('$tinymce:refresh', function(e, id) {
          var eid = attrs.id;
          if (angular.isUndefined(id) || id === eid) {
            var parentElement = element.parent();
            var clonedElement = element.clone();
            clonedElement.removeAttr('id');
            clonedElement.removeAttr('style');
            clonedElement.removeAttr('aria-hidden');
            tinymce.execCommand('mceRemoveEditor', false, eid);
            parentElement.append($compile(clonedElement)(scope));
          }
        });

        scope.$on('$destroy', function() {
          ensureInstance();

          if (tinyInstance) {
            tinyInstance.remove();
            tinyInstance = null;
          }
        });

        function ensureInstance() {
          if (!tinyInstance) {
            tinyInstance = tinymce.get(attrs.id);
          }
        }
        

      }
    };
  }]);
