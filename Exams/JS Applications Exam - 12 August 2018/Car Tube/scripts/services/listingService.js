const listingService = (() => {
    const create = (context) => {
        const data = utilities.listing.getListingObj(context);
        
        const isValid = utilities.listing.validateListing(data);

        if (!isValid) {
            return;
        }

        return requester.post("appdata", "cars", "kinvey", data);
    };

    const allListings = () => {
        return requester.get("appdata", "cars", "kinvey");
    };

    const myListings = () => {
        const username = sessionStorage.getItem("username");
        
        return requester.get("appdata", `cars?query={"seller":"${username}"}`, "kinvey");
    };

    const remove = (id) => {
        return requester.remove("appdata", `cars/${id}`, "kinvey");
    }

    const getListing = (id) => {
        return requester.get("appdata", `cars/${id}`, "kinvey");
    };

    const edit = (context) => {
        const data = utilities.listing.getListingObj(context);
        const id = context.params.id;

        const isValid = utilities.listing.validateListing(data);

        if (!isValid) {
            return Promise.reject("There are invalid fields!");
        }

        return requester.update("appdata", `cars/${id}`, "kinvey", data);
    };

    return {
        create,
        allListings,
        myListings,
        remove,
        getListing,
        edit
    };
})();