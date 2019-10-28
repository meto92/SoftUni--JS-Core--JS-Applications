const userService = (() => {
    const saveSession = (userInfo) => {
        const userAuth = userInfo._kmd.authtoken;
        const userId = userInfo._id;
        const username = userInfo.username;
        
        sessionStorage.setItem('authtoken', userAuth);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('username', username);
    };

    const login = (username, password) => {
        let userData = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', userData);
    };

    const register = (userData) => {
        return requester.post('user', '', 'basic', userData);
    };

    const logout = () => {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return requester.post('user', '_logout', 'kinvey', logoutData);
    };

    const getUserById = (id) => {
        return requester.get("user", id);
    };

    const removeById = (id) => {
        return requester.remove("user", id);
    };

    return {
        saveSession,
        login,
        register,
        logout,
        getUserById,
        removeById
    };
})();