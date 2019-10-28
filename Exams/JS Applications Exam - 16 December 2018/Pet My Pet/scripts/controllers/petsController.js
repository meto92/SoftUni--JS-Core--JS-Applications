const petsController = (() => {
    const getCreate = (context) => {
        if (!context.loggedIn) {
            notifications.showError("You should login first!");

            context.redirect("#/login");

            return;
        }

        context.loadPartials({
            header: "views/common/header.hbs",
            createForm: "views/pets/create/createForm.hbs",
            footer: "views/common/footer.hbs"
        })
        .then(function () {
            this.partial("views/pets/create/createPage.hbs");
        });
    };

    const postCreate = (context) => {
        const pet = utilities.pets.getPet(context);

        petsService.create(pet)
            .then(() => {
                notifications.showInfo("Pet created.");

                context.redirect("#/");
            });
    };

    const getMyPets = (context) => {
        petsService.getMyPets()
            .then(myPets => {
                context.myPets = myPets;

                context.loadPartials({
                    header: "views/common/header.hbs",
                    myPet: "views/pets/myPet.hbs",
                    footer: "views/common/footer.hbs"
                })
                .then(function () {
                    this.partial("views/pets/myPetsPage.hbs");
                });
            });
    };

    const getEdit = (context) => {
        if (!context.loggedIn) {
            notifications.showError("You should login first!");

            context.redirect("#/login");

            return;
        }

        const id = context.params.id;

        petsService.getPetById(id)
            .then(pet => {
                utilities.pets.setContext(pet, context);

                context.loadPartials({
                    header: "views/common/header.hbs",
                    footer: "views/common/footer.hbs"
                })
                .then(function () {
                    this.partial("views/pets/myPetDetails.hbs");
                });
            });
    };

    const postEdit = (context) => {
        const id = context.params.id;

        petsService.getPetById(id)
            .then(pet => {
                pet.description = context.params.description;

                return pet;
            })
            .then(pet => {
                petsService.update(pet._id, pet)
                    .then(() => {
                        notifications.showInfo("Updated successfully!");
                        
                        context.redirect("#/dashboard");
                    });
            })
    };

    const getDeletePage = (context) => {
        const id=  context.params.id;

        petsService.getPetById(id)
            .then(pet => {
                utilities.pets.setContext(pet, context);

                context.loadPartials({
                    header: "views/common/header.hbs",
                    footer: "views/common/footer.hbs"
                })
                .then(function () {
                    this.partial("views/pets/deletePage.hbs");
                });
            });
    };

    const remove = (context) => {
        const id = context.params.id;

        petsService.remove(id)
            .then(() => {
                notifications.showInfo("Pet removed successfully!");

                context.redirect("#/");
            });
    };
    
    const showPets = (type) => {
        type = type === "All"
            ? ""
            : type;

        $(".otherPet").hide()
            .filter((index, li) => {
                return $(li).html().includes(`<p>Category: ${type}`);
            })
            .show();
    };

    const attachEvents = () => {
        $("a:contains(All), a:contains(Cats), a:contains(Dogs), a:contains(Parrots), a:contains(Reptiles), a:contains(Other)")
            .click(e => {
                let type = $(e.target).text();
                
                if (type.endsWith("s")) {
                    type = type.substr(0, type.length - 1);
                }

                $(e.target).addClass("active");

                showPets(type);
            });
    };

    const getDashboard = (context) => {
        const userId = sessionStorage.getItem("userId");

        petsService.getAllPets()
            .then(allPets => {
                const otherPets = allPets.filter(p => p._acl.creator !== userId);
                
                context.otherPets = otherPets;

                context.loadPartials({
                    header: "views/common/header.hbs",
                    otherPet: "views/pets/otherPet.hbs",
                    footer: "views/common/footer.hbs"
                })
                .then(function () {
                    this.partial("views/pets/dashboard/dashboardPage.hbs");

                    setTimeout(() => {
                        attachEvents();
                    }, 200);

                });
            })
    };

    const getDetails = (context) => {
        const id = context.params.id;

        petsService.getPetById(id)
            .then(pet => {
                utilities.pets.setContext(pet, context);

                context.loadPartials({
                    header: "views/common/header.hbs",
                    footer: "views/common/footer.hbs"
                })
                .then(function () {
                    this.partial("views/pets/detailsPage.hbs");
                });
            });
    };

    const petPet = (context) => {
        const id = context.params.id;

        petsService.getPetById(id)
            .then(pet => {
                return pet;
            })
            .then(pet => {
                pet.likes = +pet.likes + 1;

                petsService.update(id, pet)
                    .then(() => {
                        context.redirect(`#/pets/details/${id}`);
                    })
            });
    };

    return {
        getCreate,
        postCreate,
        getMyPets,
        getEdit,
        postEdit,
        getDeletePage,
        remove,
        getDashboard,
        getDetails,
        petPet
    };
})();