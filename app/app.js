(function () {
    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage'])
        .constant('config', {
            apiUrl: 'http://api.dev-local.rebilly.com',
            loginPath: '/v2.1/signin',
            logoutPath: '/v2.1/sessions'
        })
        .config(config)
        .run(run);

    function config($stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!')

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/index.view.html',
                controller: 'Main.IndexController',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/index.view.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            });
    }

    function run($rootScope, $http, $location, $localStorage) {
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var page = ['/login'];
            var restrictedPage = page.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
})();