(function () {
    angular
        .module('app')
        .controller('Login.IndexController', Controller);

    function Controller($location, AuthService) {
        var vm = this;
        this.login = login;

        initController();

        function initController() {
            AuthService.Logout();
        };

        function login() {
            vm.loading = true;
            AuthService.Login(vm.email, vm.password, function (result) {
                if (result.success === true) {
                    $location.path('/');
                } else {
                    vm.error = result.response.data.message;
                    vm.loading = false;
                }
            });
        };
    }

})();
