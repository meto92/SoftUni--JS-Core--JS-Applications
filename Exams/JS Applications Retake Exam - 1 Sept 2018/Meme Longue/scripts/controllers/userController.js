const userController = (() => {
    const getLogin = (context) => {
        if (sessionStorage.getItem("username")) {
            notifications.showError("You must logout first!");

            context.redirect("#/");
            
            return;
        }

        context.loadPartials({
            header: "views/common/header.hbs",
            loginForm: "views//user/login/loginForm.hbs",
            footer: "views/common/footer.hbs"
        })
        .then(function () {
            this.partial("views/user/login/loginPage.hbs");
        });
    };

    const postLogin = (context) => {
        const usernae = context.params.username;
        const password = context.params.password;

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
        const repeatPassword = context.params.repeatPass;
        const email = context.params.email;
        const avatarUrl = context.params.avatarUrl;

        const isValid = utilities.user.validate(username, password, repeatPassword);

        if (!isValid) {
            return;
        }

        const userData = {
            username,
            password,
            email,
            avatarUrl
        };

        userService.register(userData)
            .then(userInfo => {
                notifications.showInfo("User registration successful.");

                context.redirect("#/")
            });
    };

    const logout = (context) => {
        utilities.setActiveLink("logout");
        
        userService.logout()
            .then(() => {
                notifications.showInfo("Logout successful.");

                sessionStorage.clear();

                context.redirect("#/login");
            });
    };

    const getProfile = (context) => {
        utilities.setBaseContextParams(context);

        const id = context.params.id;

        memeService.getMemesByUserId(id)
            .then(userMemes => {
                const memes = JSON.parse(JSON.stringify(userMemes));

                memes.forEach(meme => {
                    meme.isCurrentUserCreator = meme.creator === sessionStorage.getItem("username");
                });

                userService.getUserById(id)
                    .then(user => {
                        context._id = id;
                        context.avatarUrl = user.avatarUrl;
                        context.profileUsername = user.username;
                        context.email = user.email;
                        context.isLoggedInUserProfile = user._id === sessionStorage.getItem("userId");
                        context.userMemes = memes;

                        context.loadPartials({
                            header: "views/common/header.hbs",
                            meme: "views/user/profile/meme.hbs",
                            footer: "views/common/footer.hbs"
                        })
                        .then(function () {
                            this.partial("views/user/profile/profilePage.hbs");

                            if (user._id === sessionStorage.getItem("userId")) {
                                utilities.setActiveLink("My Profile")
                            }
                        });
                    })
            });
    };

    const remove = (context) => {
        const id = context.params.id;

        userService.removeById(id)
            .then(() => {
                sessionStorage.clear();

                notifications.showInfo("User deleted.");

                context.redirect("#/");
            });
    };

    return {
        getLogin,
        postLogin,
        getRegister,
        postRegister,
        logout,
        getProfile,
        remove
    };
})();