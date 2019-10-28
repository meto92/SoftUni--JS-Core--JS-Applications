const utilities = (() => {
    const user = (() => {
        const validateParam = (paramName, value, minLength) => {
            if (value.length < minLength) {
                notifications.showError(`${paramName} must be at least ${minLength} symbols`);
    
                return false;
            }    
    
            return true;
        };
    
        const validate = (username, password) => {
            // if (!validateParam("Username", username, 3)) {
            //     return false;
            // }
    
            // if (!validateParam("Password", password, 6)) {
            //     return false;
            // }
    
            return true;
        };

        return {
            validate
        };
    })();

    const pets = (() => {
        const getPet = (context) => {
            const name = context.params.name;
            const description = context.params.description;
            const imageURL = context.params.imageURL;
            const category = context.params.category;

            return {
                name,
                description,
                imageURL,
                category,
                likes: 0
            };
        };

        const setContext = (pet, context) => {
            context._id = pet._id;
            context.name = pet.name;
            context.likes = pet.likes;
            context.imageURL = pet.imageURL;
            context.description = pet.description;
        };

        return {
            getPet,
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
        pets,
        handleError,
        setBaseContextParams
    };
})();