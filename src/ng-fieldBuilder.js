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
                        widthLabel: '@',
                        widthField: '@',
                        label: '@',
                        type: '@',
                        val: '=',
                        ngModel: '='
                    },
                    template: '\
                                <div class="form-group">\
                                    <label for="{{name}}" class="{{widthLabel}} control-label">{{label}}</label>\
                                    <div class="{{widthField}}">\
                                        <input class="form-control" type="{{type}}" value="val" ng-model="ngModel" />\
                                        <p ng-show="required">Required</p> \
                                        <p ng-show="invalid">Invalid Value</p> \
                                    </div>\
                                </div>',
                    link: function(scope, elem, attrs, ctrl){
                        ctrl.$parsers.unshift(validate);
                        ctrl.$formatters.unshift(validate);
                
                        function validate(viewValue){
                
                            var required = ((attrs.req==="true") && !!!viewValue);
                            var invalid = (angular.isDefined(viewValue) && !validTypes[attrs.valid].test(viewValue));
                            
                            scope.required = required;
                            scope.invalid = invalid;
                            
                            ctrl.$setValidity('valid', ((required || invalid) ? false : true))
                            
                            return viewValue;
                        }
                    }
            };
        })
    
        .directive('ggSelect',function(validTypes){
            return {
                    restrict: "E",
                    scope: {
                        widthLabel: '@',
                        widthField: '@',
                        label: '@',
                        name: '@',
                        options: '=',
                        ngModel: '='
                    },
                    template: '\
                                <div class="form-group">\
                                    <label for="name" class="{{widthLabel}} control-label">{{label}}</label>\
                                    <div class="{{widthField}}">\
                                        <select class="form-control" id="{{name}}" name="{{name}}" ng-model="ngModel" ng-options="item.value as item.label for item in options">\
                                        </select>\
                                    </div>\
                                </div>'
            };
        })

})(angular);