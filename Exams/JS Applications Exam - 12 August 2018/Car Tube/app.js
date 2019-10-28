$(() => {
    const app = Sammy("#container", function() {
        this.use("Handlebars", "hbs");
        
        this.get("#/", homeController.index);

        this.get("#/login", userController.getLogin);

        this.post("#/login", userController.postLogin);

        this.get("#/register", userController.getRegister);

        this.post("#/register", userController.postRegister);

        this.get("#/logout", userController.logout);

        this.get("#/listing/create", listingController.getCreate);

        this.post("#/listing/create", listingController.postCreate);

        this.get("#/listing/all", listingController.allListings);

        this.get("#/listing/my", listingController.myListings);

        this.get("#/listing/delete/:id", listingController.remove);

        this.get("#/listing/edit/:id", listingController.getEdit);

        this.post("#/listing/edit/:id", listingController.postEdit);

        this.get("#/listing/details/:id", listingController.details);
    });

    app.run();
});