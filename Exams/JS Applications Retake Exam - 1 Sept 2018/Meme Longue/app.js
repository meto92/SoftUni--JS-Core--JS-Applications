const app = Sammy("#container", function() {
    this.use("Handlebars", "hbs");
    
    this.get("#/", homeController.index);

    this.get("#/login", userController.getLogin);

    this.post("#/login", userController.postLogin);

    this.get("#/register", userController.getRegister);

    this.post("#/register", userController.postRegister);

    this.get("#/logout", userController.logout);

    this.get("#/meme/create", memeController.getCreate);

    this.post("#/meme/create", memeController.postCreate);

    this.get("#/meme/edit/:id", memeController.getEdit);

    this.post("#/meme/edit/:id", memeController.postEdit);

    this.get("#/meme/checkout/:id", memeController.checkout);

    this.get("#/meme/delete/:id", memeController.remove);

    this.get("#/meme/details/:id", memeController.getDetails);

    this.get("#/user/:id", userController.getProfile);

    this.get("#/user/delete/:id", userController.remove);
});

$(() => app.run());