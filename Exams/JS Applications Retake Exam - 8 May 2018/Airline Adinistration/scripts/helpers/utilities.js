const utilities = (() => {
    const user = (() => {
        const validateParam = (paramName, value, minLength) => {
            if (value.length < minLength) {
                notifications.showError(`${paramName} must be at least ${minLength} character(s) long!`);
    
                return false;
            }
    
            return true;
        };
    
        const validate = (username, password, repeatPassword) => {
            if (!validateParam("Username", username, 3)) { //5 TODO
                return false;
            }
    
            if (!validateParam("Password", password, 1)) {
                return false;
            }

            if (password !== repeatPassword) {
                notifications.showError("Passwords do not match!");
    
                return false;
            }
    
            return true;
        };

        return {
            validate
        };
    })();

    const flights = (() => {
        const checkParam = (value, paramName) => {
            if (!value) {
                notifications.showError(`Enter ${paramName}!`);

                return;
            }

            return true;
        };
        
        const validate = (flight) => {
            if (!checkParam(flight.destination, "destination")
                || !checkParam(flight.origin, "origin")
                || !checkParam(flight.departureDate, "departure date")
                || !checkParam(flight.departureTime, "departure time")
                || !checkParam(flight.seats, "seats")
                || !checkParam(flight.cost, "cost")
                || !checkParam(flight.img, "image url")
                ) {
                return;
            }

            if (+flight.seats < 0) {
                notifications.showError("Invalid seats!");

                return;
            }
    
            if (+flight.cost < 0) {
                notifications.showError("Invalid cost!");

                return;
            }

            return true;
        };

        const getFlightObj = (context) => {
            const destination = context.params.destination;
            const origin = context.params.origin;
            const departureDate = context.params.departureDate;
            const departureTime = context.params.departureTime;
            const seats = context.params.seats;
            const cost = context.params.cost;
            const img = context.params.img;
            const public = !!context.params.public;
            
            const flight = {
                destination,
                origin,
                departureDate,
                departureTime,
                seats,
                cost,
                img,
                public
            };
    
            return flight;
        };

        const getMonth = (number) => {
            return [
                "January",
                "February",
                "March", 
                "April",
                "May", 
                "June",
                "July",
                "August", 
                "September",
                "October",
                "November", 
                "December"
            ][number - 1];
        };

        const setContext = (context, flight) => {
            context._id = flight._id;
            context.destination = flight.destination;
            context.origin = flight.origin;
            context.departureDate = flight.departureDate;
            context.departureTime = flight.departureTime;
            context.seats = flight.seats;
            context.cost = flight.cost;
            context.price = (+flight.cost).toFixed(2);
            context.img = flight.img;
            context.public = !!flight.public;
        };

        const setDayAndMonth = (ojb, flight) => {
            ojb.day = flight.departureDate.slice(-2);
            ojb.month = getMonth(+flight.departureDate.substr(5, 2));
        };

        return {
            validate,
            getFlightObj,
            setContext,
            setDayAndMonth
        };
    })();

    const handleError = (reason) => {
        notifications.showError(reason.responseJSON.description);
    };

    const setBaseContextParams = (context) => {
        const username = sessionStorage.getItem("username")

        context.username = username;
        context.loggedIn = !!username;
    };

    return {
        user,
        flights,
        handleError,
        setBaseContextParams
    };
})();