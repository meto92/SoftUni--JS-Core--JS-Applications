const homeController = (() => {
    const index = (context) => {
        flightService.getAllFlights()
            .then(flights => {
                context.flights = flights;
                
                flights.forEach(flight => {
                    utilities.flights.setDayAndMonth(flight, flight);
                });

                context.loadPartials({
                    header: "views/common/header.hbs",
                    flight: "views/flight//catalog/flight.hbs",
                    footer: "views/common/footer.hbs"
                })
                .then(function () {
                    this.partial("views/flight/catalog/catalogPage.hbs");
                });
            });
    };

    return {
        index
    };
})();