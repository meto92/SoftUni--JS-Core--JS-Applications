const furnitureController = (() => {
    const getAlFurniture = () => {
        return requester.get("appdata", "furniture", "kinvey");
    };

    const getCreate = (context) => {
        context.loggedIn = !!sessionStorage.getItem("username");

        context.loadPartials({
            header: "views/common/header.hbs"
        })
        .then(function () {
            this.partial("views/furniture/create.hbs");
        });
    };

    const postCreate = (context) => {
        furnitureModel.create(context)
            .then(() => {
                context.redirect("#/");
            })
            .catch(auth.handleError);
    };

    const details = (context) => {
        const id = context.params.id;

        context.loggedIn = !!sessionStorage.getItem("username");

        furnitureModel.getFurniture(id)
            .then(furniture => {
                context.imageUrl = furniture.imageUrl;
                context.make = furniture.make;
                context.model = furniture.model;
                context.year = furniture.year;
                context.description = furniture.description;
                context.price = furniture.price;
                context.material = furniture.material;

                context.loadPartials({
                    header: "views/common/header.hbs"                })
                .then(function () {
                    this.partial("views/furniture/details.hbs");
                });
            })
            .catch(auth.handleError);
    };

    const deleteFurniture = (context) => {
        const id = context.params.id;
        
        furnitureModel.deleteFurniture(id)
            .then(() => {
                context.redirect("#/profile");
            })
            .catch(auth.handleError);
    };

    return {
        getAlFurniture,
        getCreate,
        postCreate,
        details,
        deleteFurniture
    };
})();