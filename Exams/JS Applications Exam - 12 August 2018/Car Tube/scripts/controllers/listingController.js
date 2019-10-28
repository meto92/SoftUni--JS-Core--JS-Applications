const listingController = (() => {
    const allListings = (context) => {
        utilities.setBaseContextParams(context);

        if (!context.loggedIn) {
            notifications.showError("You should login first!");

            context.redirect("#/");

            return;
        }

        listingService.allListings()
            .then(allListings => {
                context.allListings = allListings;

                context.allListings
                    .forEach(listing => {
                        listing.isCurrentUserSeller = listing.seller === context.username;
                    });

                context.loadPartials({
                    header: "views/common/header.hbs",
                    listing: "views/listing/listing.hbs",
                    footer: "views/common/footer.hbs"
				})
				.then(function () {
					this.partial("views/listing/allListings.hbs");

					setTimeout(() => {
						$("nav").find(".active")
							.removeClass("active");
			
						$("a:contains('All')").addClass("active");
					}, 150);
				});
            });
    };
    
    const myListings = (context) => {
        utilities.setBaseContextParams(context);

        listingService.myListings()
            .then(myListings => {
                context.myListings = myListings;

                context.loadPartials({
                    header: "views/common/header.hbs",
                    myListing: "views/listing/myListing.hbs",
                    footer: "views/common/footer.hbs",
                })
                .then(function () {
                    this.partial("views/listing/myListingPage.hbs");

                    setTimeout(() => {
                        $("nav").find(".active")
                            .removeClass("active");
            
                        $("a:contains('My')").addClass("active");
                    }, 150);
                });
            });
    };

    const getCreate = (context) => {
        utilities.setBaseContextParams(context);

        if (!context.loggedIn) {
            notifications.showError("You should login first!");

            context.redirect("#/login");

            return;
        }

        context.loadPartials({
            header: "views/common/header.hbs",
            footer: "views/common/footer.hbs"
        })
        .then(function () {
            this.partial("views/listing/create.hbs");

            setTimeout(() => {
                $("nav").find(".active")
                    .removeClass("active");
    
                $("a:contains('Create')").addClass("active");
            }, 50);
        });
    };

    const postCreate = (context) => {
        listingService.create(context)
            .then(() => {
                notifications.showInfo("Listing successfully created!");

                context.redirect("#/");
            });
    };

    const remove = (context) => {
        const id = context.params.id;

        listingService.remove(id)
            .then(() => {
                notifications.showInfo("Listing deleted.");

                context.redirect("#/listing/all");
            });
    };
    
    const getEdit = (context) => {
        utilities.setBaseContextParams(context);

        const id = context.params.id;
        
        listingService.getListing(id)
            .then(listing => {
                context.loadPartials({
                    header: "views/common/header.hbs",
                    editForm: "views/listing/editForm.hbs",
                    footer: "views/common/footer.hbs",
                })
                .then(function () {
                    utilities.listing.setContext(context, listing);

                    this.partial("views/listing/editPage.hbs");
                });
            });
    };

    const postEdit = (context) => {
        listingService.edit(context)
            .then(() => {
                context.redirect("#/listing/my");
            })
            .catch(err => {

            });
    };

    const details = (context) => {        
        utilities.setBaseContextParams(context);

        const id = context.params.id;

        listingService.getListing(id)
            .then(listing => {
                utilities.listing.setContext(context, listing);
                
                context.isCurrentUserSeller = listing.seller === context.username;
                       
                context.loadPartials({
                    header: "views/common/header.hbs",
                    footer: "views/common/footer.hbs"
                })
                .then(function () {
                    this.partial("views/listing/details.hbs");
                })
            });      
    };

    return {
        allListings,
        myListings,
        getCreate,
        postCreate,
        remove,
        getEdit,
        postEdit,
        details
    };
})();