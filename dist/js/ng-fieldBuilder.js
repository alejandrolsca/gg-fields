(function(angular){
    
    angular.module('ggForm',[])

        .directive('ggInput',function(){
            console.log('in');
            return {
                    restrict: "E",
                    scope: {
                        type: '@',
                        val: '='
                    },
                    template: '\
                                <div class="form-group">\
                                    <div class="col-lg-1">\
                                        <input type="{{type}}" value="{{val}}" />\
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
                        options: '='
                    },
                    template: '\
                                <div class="form-group">\
                                    <label for="{{name}}" class="{{widthLabel}} control-label">{{label}}</label>\
                                    <div class="widthField">\
                                        <select class="form-control" id="{{name}}" name="{{name}}">\
                                            <option ng-repeat="item in options" value="{{item.value}}">{{item.label}}</option>\
                                        </select>\
                                    </div>\
                                </div>'
            };
        })

})(angular);