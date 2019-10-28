const memeController = (() => {
    const getCreate = (context) => {
        utilities.setBaseContextParams(context);

        if (!context.loggedIn) {
            notifications.showError("You should login first!");

            context.redirect("#/login");

            return;
        }

        context.loadPartials({
            header: "views/common/header.hbs",
            createForm: "views/meme/create/createForm.hbs",
            footer: "views/common/footer.hbs"
        })
        .then(function () {
            this.partial("views/meme/create/createPage.hbs");

            utilities.setActiveLink("Create Meme");
        });
    };

    const postCreate = (context) => {
        const memeObj = utilities.meme.getMemeObj(context);
        
        const isValid = utilities.meme.validateMeme(memeObj);

        if (!isValid) {
            return;
        }
        
        memeService.create(memeObj)
            .then(() => {
                notifications.showInfo("meme created.");

                context.redirect("#/");
            });
    };

    const remove = (context) => {
        const id = context.params.id;

        memeService.remove(id)
            .then(() => {
                notifications.showInfo("Meme deleted.");

                context.redirect("#/");
            });
    };
    
    const getEdit = (context) => {
        utilities.setBaseContextParams(context);

        const id = context.params.id;
        
        memeService.getMemeById(id)
            .then(meme => {
                context.loadPartials({
                    header: "views/common/header.hbs",
                    editForm: "views/meme/edit/editForm.hbs",
                    footer: "views/common/footer.hbs",
                })
                .then(function () {
                    utilities.meme.setContext(context, meme);

                    this.partial("views/meme/edit/editPage.hbs");
                });
            });
    };

    const postEdit = (context) => {
        const id = context.params.id;
        
        const memeObj = utilities.meme.getMemeObj(context);
        
        const isValid = utilities.meme.validateMeme(memeObj);

        if (!isValid) {
            return;
        }

        memeService.update(id, memeObj)
            .then(() => {
                notifications.showInfo(`Meme ${memeObj.title} updated.`);

                context.redirect("#/");
            });
    };

    const getDetails = (context) => {        
        utilities.setBaseContextParams(context);

        const id = context.params.id;

        memeService.getMemeById(id)
            .then(meme => {
                utilities.meme.setContext(context, meme);
                
                context.isCurrentUserCreator = meme.creator === context.username;
                context.creator = meme.creator;
                context.creatorId = meme._acl.creator;

                context.loadPartials({
                    header: "views/common/header.hbs",
                    footer: "views/common/footer.hbs"
                })
                .then(function () {
                    this.partial("views/meme/details/detailsPage.hbs");
                })
            });      
    };

    const checkout = (context) => {

    };

    return {
        getCreate,
        postCreate,
        remove,
        getEdit,
        postEdit,
        getDetails,
        checkout
    };
})();