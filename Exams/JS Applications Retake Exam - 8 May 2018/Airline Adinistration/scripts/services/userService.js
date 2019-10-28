const userService = (() => {
    const saveSession = (userInfo) => {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
    };

    const login = (username, password) => {
        let userData = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', userData);
    };

    const register = (username, password) => {
        let userData = {
            username,
            password
        };

        return requester.post('user', '', 'basic', userData);
    };

    const logout = () => {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return requester.post('user', '_logout', 'kinvey', logoutData);
    };

    return {
        saveSession,
        login,
        register,
        logout
    };
})();