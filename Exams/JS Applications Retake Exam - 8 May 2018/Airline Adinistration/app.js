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

    this.get("#/flights", flightController.userFlights);

    this.get("#/flights/add", flightController.getCreate);

    this.post("#/flights/add", flightController.postCreate);

    this.get("#/flights/details/:id", flightController.getDetails);

    this.get("#/flights/edit/:id", flightController.getEdit);
    
    this.post("#/flights/edit/:id", flightController.postEdit);

    this.get("#/flights/remove/:id", flightController.remove);
});

$(() => app.run());