const petsService = (() => {
    const create = (pet) => {
        return requester.post("appdata", "pets", "kinvey", pet);
    };

    const remove = (id) => {
        return requester.remove("appdata", `pets/${id}`);
    };

    const getMyPets = () => {
        const userId = sessionStorage.getItem("userId");

        return requester.get("appdata", `pets?query={"_acl.creator":"${userId}"}`);
    };  

    const getPetById = (id) => {
        return requester.get("appdata", `pets/${id}`);
    };

    const update = (id, pet) => {
        return requester.update("appdata", `pets/${id}`, "kinvey", pet);
    };

    const getAllPets = () => {
        return requester.get("appdata", `pets?query={}&sort={"likes": -1}`);
    };

    return {
        create,
        remove,
        getMyPets,
        getPetById,
        update,
        getAllPets
    };
})();