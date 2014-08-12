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
                        lbl: '@',
                        lblClass: '@',
                        fldClass: '@',
                        errClass: '@',
                        fldType: '@',
                        reqMsg: '@',
                        regexpMsg: '@',
                        ngModel: '='
                    },
                    template: '<div class="form-group" ng-class="{\'has-error\': (required || invalid)}">\
                                    <label for="{{fld}}" class="{{lblClass}} control-label">{{lbl}}</label>\
                                    <div class="{{fldClass}}">\
                                        <input class="form-control" type="{{fldType}}" ng-model="ngModel" />\
                                        <p ng-class="errClass" ng-show="required">{{reqMsg}}</p> \
                                        <p ng-class="errClass" ng-show="invalid">{{regexpMsg}}</p> \
                                    </div>\
                                </div>',
                    link: function(scope, elem, attrs, ctrl){
                        ctrl.$parsers.unshift(validate);
                        ctrl.$formatters.unshift(validate);
                
                        function validate(viewValue){
                            console.log(ctrl.$pristine)
                            var required = ((attrs.req==="true") && !!!viewValue);
                            var invalid = (angular.isDefined(viewValue) && !validTypes[attrs.regexp].test(viewValue));
                            
                            scope.required = required;
                            scope.invalid = invalid;
                            
                            ctrl.$setValidity('valid', ((required || invalid) ? false : true))
                            
                            ctrl.$render();
                
                            return viewValue;
                        }
                    }
            };
        })
    
        .directive('ggSelect',function(validTypes){
            return {
                    restrict: "E",
                    require: '^ngModel',
                    scope: {
                        lbl: '@',
                        lblClass: '@',
                        fldClass: '@',
                        errClass: '@',
                        reqMsg: '@',
                        regexpMsg: '@',
                        options: '=',
                        ngModel: '='
                    },
                    template: '<div class="form-group" ng-class="{\'has-error\': (required || invalid)}">\
                                    <label class="{{lblClass}} control-label">{{lbl}}</label>\
                                    <div class="{{fldClass}}">\
                                        <select class="form-control" ng-model="ngModel" ng-options="item.value as item.label for item in options">\
                                        </select>\
                                        <p ng-class="errClass" ng-show="required">{{reqMsg}}</p> \
                                        <p ng-class="errClass" ng-show="invalid">{{regexpMsg}}</p> \
                                    </div>\
                                </div>',
                    link: function(scope, elem, attrs, ctrl){
                        ctrl.$parsers.unshift(validate);
                        ctrl.$formatters.unshift(validate);
                
                        function validate(viewValue){
                            console.log(ctrl.$pristine)
                            var required = ((attrs.req==="true") && !!!viewValue);
                            var invalid = (angular.isDefined(viewValue) && !validTypes[attrs.regexp].test(viewValue));
                            
                            scope.required = required;
                            scope.invalid = invalid;
                            
                            ctrl.$setValidity('valid', ((required || invalid) ? false : true))
                            
                            ctrl.$render();
                
                            return viewValue;
                        }
                    }
            };
        })

})(angular);