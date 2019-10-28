const utilities = (() => {
    const user = (() => {
        const validateParam = (paramName, value, minLength, regex, validChars) => {
            if (!regex.test(value)) {
                notifications.showError(`${paramName} should be at least ${minLength} characters long and contain ${validChars}!`);
    
                return false;
            }
    
            return true;
        };

        const validate = (username, password, repeatPassword) => {
            if (!validateParam("Username", username, 3, /^[a-zA-Z]{3,}$/, "english alphabet letters")) {
                return false;
            }
    
            if (!validateParam("Password", password, 6, /^[a-zA-Z\d]{6,}$/, "english alphabet letters and digits")) {
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

    const meme = (() => {
        const getMemeObj = (context) => {
            const title = context.params.title;
            const description = context.params.description;
            const imageUrl = context.params.imageUrl;
            
            const memeObj = {
                title,
                description,
                imageUrl,
                creator: sessionStorage.getItem("username")
            };
    
            return memeObj;
        };

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

        const validateMeme = (meme) => {
            if (!meme.title) {
                notifications.showError("Enter title!");

                return;
            }

            if (!checkMaxLength("Title", meme.title, 33)
                || !checkMinLength("Description", meme.description, 30)
                || !checkMaxLength("Description", meme.description, 450)
                ) {
                return;
            }

            if (!meme.imageUrl) {
                notifications.showError("Enter image url!");

                return;
            }

            if (!meme.imageUrl.startsWith("http")) {
                notifications.showError("Image url should start with http!");

                return;
            }

            return true;
        };

        const setContext = (context, meme) => {
            context._id = meme._id;
            context.title = meme.title;
            context.description = meme.description;
            context.imageUrl = meme.imageUrl;
        };

        return {
            getMemeObj,
            validateMeme,            
            setContext
        };
    })();

    const handleError = (reason) => {
        notifications.showError(reason.responseJSON.description);
    };

    const setBaseContextParams = (context) => {
        const username = sessionStorage.getItem("username")
        const userId = sessionStorage.getItem("userId");

        context.username = username;
        context.userId = userId;
        context.loggedIn = !!username;
    };

    const setActiveLink = (aText) => {
        setTimeout(() => {
            $("nav a.active").removeClass("active");
            $(`nav a:contains(${aText})`).addClass("active");
        }, 50);
    };

    return {
        user,
        meme,
        handleError,
        setBaseContextParams,
        setActiveLink
    };
})();