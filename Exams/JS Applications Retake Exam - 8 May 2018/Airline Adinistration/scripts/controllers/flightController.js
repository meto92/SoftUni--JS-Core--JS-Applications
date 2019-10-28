const flightController = (() => {
    const getCreate = (context) => {
        context.loadPartials({
            header: "views/common/header.hbs",
            createForm: "views/flight/create/createForm.hbs",
            footer: "views/common/footer.hbs"
        })
        .then(function () {
            this.partial("views/flight/create/createPage.hbs");
        });
    };

    const postCreate = (context) => {
        const flightObj = utilities.flights.getFlightObj(context);

        const isValid = utilities.flights.validate(flightObj);

        if (!isValid) {
            return;
        }

        flightService.create(flightObj)
            .then(() => {
                notifications.showInfo("Created flight.");

                context.redirect("#/");
            });
    };

    const getDetails = (context) => {
        const flightId = context.params.id;

        flightService.getFlightById(flightId)
            .then(flight => {
                context.loadPartials({
                    header: "views/common/header.hbs",
                    flight: "views/flight/details/flight.hbs",
                    footer: "views/common/footer.hbs"
                })
                .then(function () {
                    utilities.flights.setContext(context, flight)
                    utilities.flights.setDayAndMonth(context, flight);

                    context.isCurrentUserCreator = flight._acl.creator === sessionStorage.getItem("userId");

                    this.partial("views/flight/details/detailsPage.hbs");
                });
            });
    };

    const getEdit = (context) => {
        const flightId = context.params.id;

        flightService.getFlightById(flightId)
            .then(flight => {
                context.loadPartials({
                    header: "views/common/header.hbs",
                    editForm: "views/flight/edit/editForm.hbs",
                    footer: "views/common/footer.hbs"
                })
                .then(function () {
                    utilities.flights.setContext(context, flight)
        
                    this.partial("views/flight/edit/editPage.hbs");
                });
            });
    };

    const postEdit = (context) => {
        const flightId = context.params.id;
        const flightObj = utilities.flights.getFlightObj(context);

        const isValid = utilities.flights.validate(flightObj);

        if (!isValid) {
            return;
        }
        
        flightService.update(flightId, flightObj)
            .then(() => {
                notifications.showInfo("Successfully edited flight.");

                context.redirect(`#/flights/details/${flightId}`);
            });
    };

    const userFlights = (context) => {
        flightService.getUserFlights()
            .then(userFlights => {
                userFlights.forEach(flight => {
                    utilities.flights.setDayAndMonth(flight, flight);
                });

                context.userFlights = userFlights;

                context.loadPartials({
                    header: "views/common/header.hbs",
                    flight: "views/flight/userFlights/flight.hbs",
                    footer: "views/common/footer.hbs"
                })
                .then(function () {
                    this.partial("views/flight/userFlights/flightsPage.hbs");
                });
            })
    };

    const remove = (context) => {
        const flightId = context.params.id;

        flightService.remove(flightId)
            .then(() => {
                notifications.showInfo("Flight deleted.");
            });
    };

    return {
        getCreate,
        postCreate,
        getDetails,
        getEdit,
        postEdit,
        userFlights,
        remove
    };
})();