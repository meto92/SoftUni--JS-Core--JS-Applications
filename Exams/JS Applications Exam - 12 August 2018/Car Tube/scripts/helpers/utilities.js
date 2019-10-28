const utilities = (() => {
    const user = (() => {
        const validateParam = (paramName, value, minLength) => {
            if (value.length < minLength) {
                notifications.showError(`${paramName} must be at least ${minLength} characters long!`);
    
                return false;
            }
    
            if (/[^a-zA-Z]/.test(value)) {
                notifications.showError(`${paramName} must contain english alphabet  letters only!`);
    
                return false;
            }
    
            return true;
        };
    
        const validate = (username, password, repeatPassword) => {
            if (!validateParam("Username", username, 3)) {
                return false;
            }
    
            if (!validateParam("Password", password, 6)) {
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

    const listing = (() => {
        const checkMaxLength = (paramName, value, maxLength) => {
            if (value.length > maxLength) {
                notifications.showError(`${paramName} length should not exceed ${maxLength}!`);
    
                return;
            }
    
            return true;
        };
        
        const checkMinLength = (paramName, value, minLength) => {
            if (value.length < minLength) {
                notifications.showError(`${paramName} length should be at least ${minLength}!`);
    
                return;
            }
    
            return true;
        };
        
        const validateListing = (listing) => {
            if (!checkMaxLength("Title", listing.title, 33)
                || !checkMinLength("Description", listing.description, 30)
                || !checkMaxLength("Description", listing.description, 450)
                || !checkMinLength("Model", listing.model, 4)
                || !checkMaxLength("Model", listing.model, 11)
                || !checkMaxLength("Fuel type", listing.fuel, 11)
                || !checkMaxLength("Brand", listing.brand, 11)
                ) {
                return;
            }
    
            if (listing.year < 1000 || listing.year > 9999) {
                notifications.showError("Year must be 4 characters long!");
    
                return;
            }
            
            if (listing.price < 0) {
                notifications.showError("Price cannot be negative!");
    
                return;
            }
    
            if (listing.price > 1000000) {
                notifications.showError("Maximum price is 1000000$!");
    
                return;
            }
    
            if (!listing.imageUrl.startsWith("http")) {
                notifications.showError("Image url should start with http!");
    
                return;
            }
    
            return true;
        };

        const getListingObj = (context) => {
            const title = context.params.title;
            const description = context.params.description;
            const brand = context.params.brand;
            const model = context.params.model;
            const year = +context.params.year;
            const imageUrl = context.params.imageUrl;
            const fuel = context.params.fuelType;
            const price = context.params.price;
            
            const listing = {
                title,
                description,
                brand,
                model,
                year,
                imageUrl,
                fuel,
                price,
                seller: sessionStorage.getItem("username")
            };
    
            return listing;
        };

        const setContext = (context, listing) => {
            context.carId = listing._id;
            context.title = listing.title;
            context.description = listing.description;
            context.brand = listing.brand;
            context.model = listing.model;
            context.year = listing.year;
            context.imageUrl = listing.imageUrl;
            context.fuel = listing.fuel;
            context.price = listing.price;
        };

        return {
            validateListing,
            getListingObj,
            setContext
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
        listing,
        handleError,
        setBaseContextParams
    };
})();