const app = Sammy("#container", function() {
    this.use("Handlebars", "hbs");
    
    this.before(null, function() {
        utilities.setBaseContextParams(this);
    });
    
    this.get("#/", homeController.index);

    this.get("#/login", userController.getLogin);

    this.post("#/login", userController.postLogin);

    this.get("#/register", userController.getRegister);

    this.post("#/register", userController.postRegister);

    this.get("#/logout", userController.logout);

    this.get("#/pets/create", petsController.getCreate);

    this.post("#/pets/create", petsController.postCreate);

    this.get("#/pets/mine", petsController.getMyPets);

    this.get("#/pets/edit/:id", petsController.getEdit);

    this.post("#/pets/edit/:id", petsController.postEdit);

    this.get("#/pets/deletePage/:id", petsController.getDeletePage);

    this.post("#/pets/delete/:id", petsController.remove);    

    this.get("#/dashboard", petsController.getDashboard);

    this.get("#/pets/details/:id", petsController.getDetails);

    this.get("#/pets/pet/:id", petsController.petPet);
});

$(() =>  app.run());