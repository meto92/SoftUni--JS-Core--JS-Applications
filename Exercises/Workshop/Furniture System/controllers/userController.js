const userController = (() => {
    const getLogin = (context) => {
        context.loadPartials({
            header: "views/common/header.hbs",
            loginForm: "views/login/loginForm.hbs"
        })
        .then(function () {
            this.partial("views/login/loginPage.hbs")
        });
    };

    const postLogin = (context) => {
        const username = context.params.username;
        const password = context.params.password;
        
        userModel.login(username, password)
            .then(userInfo => {
                auth.showInfo("Successfully logged in!");

                userModel.saveSession(userInfo);

                context.redirect("#/");
            })
            .catch(auth.handleError);
    };

    const getRegister = (context) => {
        context.loadPartials({
            header: "views/common/header.hbs",
            registerForm: "views/register/registerForm.hbs"
        })
        .then(function () {
            this.partial("views/register/registerPage.hbs")
        });
    };

    const postRegister = (context) => {
        const username = context.params.username.trim();
        const password = context.params.password;
        const repeatPassword = context.params.repeatPassword;

        if (!username) {
            auth.showError("Enter username!");

            return;
        }
        
        if (!password || !repeatPassword) {
            auth.showError("Enter password!");

            return;
        }

        if (password !== repeatPassword) {
            auth.showError("Passwords do not match!");

            return;
        }

        auth.showInfo("Registering...");

        userModel.register(username, password)
            .then(userInfo => {
                auth.showInfo(`User "${username}" registered successfully!`);

                context.redirect("#/login")
            })
            .catch(auth.handleError);
    };

    const logout = (context) => {
        userModel.logout()
            .then(() => {
                sessionStorage.clear();

                context.redirect("#/");
            })
            .catch(auth.showError);
    };

    const profile = (context) => {
        context.loggedIn = !!sessionStorage.getItem("username");

        if (!context.loggedIn) {
            auth.showError("You must login first!");

            context.redirect("#/login");

            return;
        }

        const userId = sessionStorage.getItem("userId");
        
        requester.get("appdata", `furniture/?query={"_acl.creator":"${userId}"}`, "kinvey")
            .then(furniture => {
                const userFurniture = JSON.parse(JSON.stringify(furniture));
                
                context.userFurniture = userFurniture;
                
                Object.values(userFurniture)
                    .forEach(obj => obj.isAuthor = true);

                context.loadPartials({
                    header: "views/common/header.hbs",
                    furniture: "views/furniture/form.hbs"
                    })
                    .then(function () {
                        this.partial("views/profile/profile.hbs");
                    });
            })
            .catch(auth.handleError);
    };

    return {
        getLogin,
        postLogin,
        getRegister,
        postRegister,
        logout,
        profile
    };
})();