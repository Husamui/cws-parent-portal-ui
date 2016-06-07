angular.module('cws').controller('createProfileController', ['$scope','User','AuthService',function($scope, User,AuthService){

    $('.selectpicker').selectpicker();

    $("[data-size='block']").parent('')

    $scope.user = new User.resource();
    $scope.formSubmitted = false;
    $scope.formValid = false;

    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");


    function passmatch(pass, cpass){
        return pass === cpass;
    }

    function strength(pass){
        return strongRegex.test(pass);
    }

    $scope.register = function(){
        console.debug($scope.user);
        $scope.formSubmitted = true;
        if(!strength($scope.user.password)){
            $scope.passWeak = true;
            $scope.formValid = false;
            return false;

        }if(!passmatch($scope.user.password, $("#cpassword").val())){
            $scope.passNotMatch = true;
            $scope.formValid = false;
            return false;
        }
        else{
            $scope.passStrong = true;
            $scope.passMatch = true;
            $scope.formValid = true;
            $(".loading").addClass('active');
            User.resource.save($scope.user, function(data){
                console.log("data is ", data);
                $(".loading").removeClass('active');
                if(data.success){
                    AuthService.storeUserCredentials(data);
                    window.location = '/';
                }
            },function (err) {
                console.log(err);
            });

        }

    }

}]);
