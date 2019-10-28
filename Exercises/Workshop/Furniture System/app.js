const app = Sammy("#container", function () {
    this.use("Handlebars", "hbs");

    this.get("#/", homeController.index);

    this.get("#/login", userController.getLogin);
    
    this.post("#/login", userController.postLogin);

    this.get("#/logout", userController.logout);

    this.get("#/register", userController.getRegister);

    this.post("#/register", userController.postRegister);

    this.get("#/furniture/create", furnitureController.getCreate);

    this.post("#/furniture/create", furnitureController.postCreate);

    this.get("#/furniture/details/:id", furnitureController.details);

    this.get("#/furniture/delete/:id", furnitureController.deleteFurniture);
    
    this.get("#/profile", userController.profile);
});

$(() => {
    $(document).ajaxStart(() => {
        $("#loadingBox").show();
    });

    $(document).ajaxStop(() => {
        $("#loadingBox").hide();
    });

    app.run();
});