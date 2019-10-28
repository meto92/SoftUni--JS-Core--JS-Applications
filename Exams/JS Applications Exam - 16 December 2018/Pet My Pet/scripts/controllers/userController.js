const userController = (() => {
    const getLogin = (context) => {
        if (context.loggedIn) {
            notifications.showError("You should logout first!");

            context.redirect("#/");
            
            return;
        }

        context.loadPartials({
            header: "views/common/header.hbs",
            loginForm: "views/user/login/loginForm.hbs",
            footer: "views/common/footer.hbs"
        })
        .then(function () {
            this.partial("views/user/login/loginPage.hbs");
        });
    };

    const postLogin = (context) => {
        const usernae = context.params.username;
        const password = context.params.password;

        const isValid = utilities.user.validate(usernae, password);

        if (!isValid) {
            return;
        }

        userService.login(usernae, password)
            .then(userInfo => {
                notifications.showInfo("Login successful.");
                userService.saveSession(userInfo);

                context.redirect("#/");
            });
    };

    const getRegister = (context) => {
        if (context.loggedIn) {
            notifications.showError("You should logout first!");

            context.redirect("#/");

            return;
        }

        context.loadPartials({
            header: "views/common/header.hbs",
            registerForm: "views/user/register/registerForm.hbs",
            footer: "views/common/footer.hbs"
        })
        .then(function () {
            this.partial("views/user/register/registerPage.hbs");
        });
    };

    const postRegister = (context) => {
        const username = context.params.username.trim();
        const password = context.params.password;

        const isValid = utilities.user.validate(username, password);

        if (!isValid) {
            return;
        }

        userService.register(username, password)
            .then(userInfo => {
                notifications.showInfo("User registration successful.");

                userService.saveSession(userInfo);

                context.redirect("#/")
            });
    };

    const logout = (context) => {
        userService.logout()
            .then(() => {
                notifications.showInfo("Logout successful.");

                sessionStorage.clear();

                context.redirect("#/");
            });
    };

    return {
        getLogin,
        postLogin,
        getRegister,
        postRegister,
        logout
    };
})();