(function(angular){
    
    angular.module('ggForm',[])
    
    .constant('validTypes',{
            "singleSpaces": /^[^ \t\s]?([-_a-zA-Z0-9ÁáÉéÍíÓóÚú\.](.[^ \t\s])*)*[^ \t\s]?$/,
            "rfc": /^[A-Za-z]{4}\-\d{6}(?:\-[A-Za-z\d]{3})?$/,
            "email": /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
            "decimal2": /^(\d+)?(\.\d{2,2})?$/,
            "integer": /^\d$/,
            "zipcode": /^\d{1,5}$/,
            "date": /^\d{4}-\d{2}-\d{2}$/,
            "user": /^\w{4,16}$/,
            "password": /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
    })
    
    .directive('ggInput',function(validTypes){
        return {
                restrict: "E",
                require: '^ngModel',
                scope: {
                    errClass: '@',
                    lbl: '@',
                    lblClass: '@',
                    fldClass: '@',
                    reqMsg: '@',
                    regexpMsg: '@',
                    ngModel: '='
                },
                template: function(elem, attrs) {
                    var disabled    = attrs.hasOwnProperty('disabled')  ? 'ng-disabled="true"'  : ''; //disable field
                    var required    = attrs.hasOwnProperty('required')  ? 'ng-required="true"'  : ''; //requires field
                    
                    return '<div class="form-group" ng-class="{\'has-error\': (required || invalid)}">\
                                <label class="{{lblClass}} control-label">{{lbl}}</label>\
                                <div class="{{fldClass}}">\
                                    <input class="form-control" type="text" ng-model="ngModel" '+disabled+' '+required+'/>\
                                    <p ng-class="errClass" ng-show="required">{{reqMsg}}</p>\
                                    <p ng-class="errClass" ng-show="invalid">{{regexpMsg}}</p>\
                                </div>\
                          </div>';
                },
                link: function(scope, elem, attrs, ctrl){
                            
                    //format text going to user (model to view)
                    ctrl.$formatters.unshift(function (modelValue){
                    console.log(ctrl.$pristine);    
                        if(angular.isDefined(modelValue) || !ctrl.$pristine) ctrl.$setViewValue(modelValue);
                                                    
                    }); // triggers on DOM change
        
                    //format text from the user (view to model)
                    ctrl.$parsers.unshift(function (viewValue){
                        
                        var required = (!angular.isDefined(viewValue) && attrs.hasOwnProperty('required'));
                        var invalid = (angular.isDefined(viewValue) && !validTypes[attrs.regexp].test(viewValue));
                        
                        scope.required = required;
                        scope.invalid = invalid;
                        
                        ctrl.$setValidity('valid', ((required || invalid) ? false : true))
                        
                        return viewValue;
                    }); // triggers on code change
                }
        };
    })
    
    .directive('ggSelect',function(validTypes){
        return {
                restrict: "E",
                require: '^ngModel',
                scope: {
                        errClass: '@',
                        lbl: '@',
                        lblClass: '@',
                        fldClass: '@',
                        reqMsg: '@',
                        regexpMsg: '@',
                        options: '=',
                        ngModel: '='
                    },
                    template: function(elem, attrs) {
                        var disabled    = attrs.hasOwnProperty('disabled')  ? 'ng-disabled="true"'  : ''; //disable field
                        var required    = attrs.hasOwnProperty('required')  ? 'ng-required="true"'  : ''; //requires field
                        var multiple    = attrs.hasOwnProperty('multiple')  ? 'multiple'            : ''; //requires field
                        
                        return '<div class="form-group" ng-class="{\'has-error\': (required || invalid)}">\
                                    <label class="{{lblClass}} control-label">{{lbl}}</label>\
                                    <div class="{{fldClass}}">\
                                        <select class="form-control" ng-model="ngModel" ng-options="item.value as item.label for item in options" '+multiple+' '+disabled+' '+required+'>\
                                        </select>\
                                    <p ng-class="errClass" ng-show="required">{{reqMsg}}</p> \
                                    <p ng-class="errClass" ng-show="invalid">{{regexpMsg}}</p>\
                                    </div>\
                              </div>';
                    },
                    link: function(scope, elem, attrs, ctrl){
                        //format text going to user (model to view)
                        ctrl.$formatters.unshift(function (modelValue){

                            if(angular.isDefined(modelValue) || !ctrl.$pristine) ctrl.$setViewValue(modelValue);

                        }); // triggers on DOM change

                        //format text from the user (view to model)
                        ctrl.$parsers.unshift(function (viewValue){

                            var required = (!angular.isDefined(viewValue) && attrs.hasOwnProperty('required'));
                            var invalid = (angular.isDefined(viewValue) && !validTypes[attrs.regexp].test(viewValue));

                            scope.required = required;
                            scope.invalid = invalid;

                            ctrl.$setValidity('valid', ((required || invalid) ? false : true))

                            return viewValue;
                        }); // triggers on code change
                    }
            };
        })

})(angular);