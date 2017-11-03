angular
    .module('app')
    .factory('AuthService', Service);

function Service($http, $localStorage, config) {

    return {
        Login: Login,
        Logout: Logout
    }

    function Login(email, password, callback) {
        $http.post(
            config.apiUrl + config.loginPath,
            { email: email, password: password }
        )
        .then(function(response) {
                if (response.data.token) {
                    $localStorage.currentUser = { sessionId: response.data.id, userId: response.data.userId, token: response.data.token };
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;

                    callback({ success: true, response: response });
                } else {
                    callback({ success: false, response: response });
                }
            }
        )
        .catch(function(error) {
            callback({ success: false, response: error });
        });
    }

    function Logout() {
        if ($localStorage.currentUser) {

            $http.delete(
                config.apiUrl + config.logoutPath + '/' + $localStorage.currentUser.sessionId
            );

            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
}
