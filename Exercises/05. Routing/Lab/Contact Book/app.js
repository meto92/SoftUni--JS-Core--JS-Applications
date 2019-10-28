$(() => {
    const app = Sammy("#container", function () {
        this.use("Handlebars", "hbs");
        
        this.get("#/index.html", homeController.render);

        this.get("#/register", userController.getRegister);

        this.post("#/register", userController.postRegister);

        this.post("#/login", userController.login);

        this.get("#/logout", userController.logout);

        this.get("#/profile", userController.getProfile);

        this.post("#/profile", userController.postProfile);        
    });

    app.run();
});