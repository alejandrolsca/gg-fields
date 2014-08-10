(function(angular){
    
    angular.module('ggForm',[])

        .directive('ggInput',function(){
            console.log('in');
            return {
                    restrict: "E",
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
                                    </div>\
                                </div>'
            };
        })
    
        .directive('ggSelect',function(){
            console.log('in');
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