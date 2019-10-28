(() => {
    const users = [];
    
    function isUsernameTaken(username) {
        return users.some(u => u.username === username);
    }

    function userExists(username, password) {
        return users.some(u => u.username === username && u.password === password);
    }

    window.userController = {
        getRegister: (context) => {
            context.loadPartials({
                header: "./templates/common/header.hbs",
                navigation: "./templates/common/navigation.hbs",
                footer: "./templates/common/footer.hbs"
            })
            .then(function () {
                this.partial("./templates/forms/registerForm.hbs");        
            })
        },
        postRegister: (context) => {
            const username = context.params.username;
            const password = context.params.password;
            const repeatedPaword = context.params.repeatedPassword;
            
            if (password !== repeatedPaword) {
                alert("Password do not mathc!");

                this.redirect("#/register");
            }
            
            if (isUsernameTaken(username)) {
                alert(`Username ${username} is already taken!`);

                return;
            } 
            
            users.push({
                username,
                password
            });

            context.redirect("#/index.html");
        },
        login: (context) => {
            const username = context.params.username;
            const password = context.params.password;
            
            if (!userExists(username, password)) {
                alert("Invalid username or password!");

                return;
            }

            sessionStorage.clear();
            sessionStorage.setItem("username", username);

            context.redirect("#/index.html");
        },
        getProfile: (context) => {
            if (!sessionStorage.username) {
                context.redirect("#/index.html");

                return;
            }

            context.firstName = sessionStorage.getItem("firstName");
            context.lastName =  sessionStorage.getItem("lastName");
            context.phone =  sessionStorage.getItem("phone");
            context.email = sessionStorage.getItem("email");
            context.isAuth = true;

            context.loadPartials({
                header: "./templates/common/header.hbs",
                navigation: "./templates/common/navigation.hbs",
                footer: "./templates/common/footer.hbs"
            })
            .then(function () {
                this.partial('./templates/profile.hbs');        
            })
        },
        postProfile: (context) => {
            const firstName = context.params.firstName;
            const lastName = context.params.lastName;
            const phohe = context.params.phone;
            const email = context.params.email;

            sessionStorage.setItem("firstName", firstName);
            sessionStorage.setItem("lastName", lastName);
            sessionStorage.setItem("phone", phohe);
            sessionStorage.setItem("email", email);

            context.redirect("#/index.html");
        },
        logout: (context) => {
            sessionStorage.clear();
            
            context.redirect("#/index.html");
        }
    };
})();