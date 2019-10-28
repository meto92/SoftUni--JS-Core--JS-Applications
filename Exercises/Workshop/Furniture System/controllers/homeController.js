const homeController = (() => {
    const index = (context) => {
        context.loggedIn = !!sessionStorage.getItem("username");
        
        if (!context.loggedIn) {
            context.loadPartials({
                header: "views/common/header.hbs"
            })
            .then(function () {
                this.partial("views/home/home.hbs");
            });

            return;
        }

        furnitureController.getAlFurniture()
            .then(allFurniture => {
                context.allFurniture = allFurniture;

                context.loadPartials({
                    header: "views/common/header.hbs",
                    furniture: "views/furniture/form.hbs"
                })
                .then(function () {
                    this.partial("views/home/home.hbs");
                });
            })
            .catch(auth.handleError);
    };

    return {
        index
    };
})();