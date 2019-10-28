const userController = (() => {
    const getLogin = (context) => {
        if (sessionStorage.getItem("username")) {
            notifications.showError("You must logout first!");

            context.redirect("#/");
            
            return;
        }

        context.loadPartials({
            header: "views/common/header.hbs",
            loginForm: "views/login/loginForm.hbs",
            footer: "views/common/footer.hbs"
        })
        .then(function () {
            this.partial("views/login/loginPage.hbs");
        });
    };

    const postLogin = (context) => {
        const usernae = context.params.username;
        const password = context.params.pass;

        const isValid = utilities.user.validate(usernae, password, password);

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
        if (sessionStorage.getItem("username")) {
            notifications.showError("You must logout first!");

            context.redirect("#/");

            return;
        }

        context.loadPartials({
            header: "views/common/header.hbs",
            registerForm: "views/register/registerForm.hbs",
            footer: "views/common/footer.hbs"
        })
        .then(function () {
            this.partial("views/register/registerPage.hbs");
        });
    };

    const postRegister = (context) => {
        const username = context.params.username.trim();
        const password = context.params.pass;
        const repeatPassword = context.params.checkPass;

        const isValid = utilities.user.validate(username, password, repeatPassword);

        if (!isValid) {
            return;
        }

        userService.register(username, password)
            .then(userInfo => {
                notifications.showInfo("User registration successful.");

                context.redirect("#/")
            });
    };

    const logout = (context) => {
        userService.logout()
            .then(() => {
                notifications.showInfo("Logout successful.");

                sessionStorage.clear();

                context.redirect("#/login");
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