const memeService = (() => {
    const getAllMemes = () => {
        return requester.get("appdata", "memes");
    };
    
    const create = (meme) => {        
        return requester.post("appdata", "memes", "kinvey", meme);
    };

    const remove = (id) => {
        return requester.remove("appdata", `memes/${id}`, "kinvey");
    }

    const getMemeById = (id) => {
        return requester.get("appdata", `memes/${id}`, "kinvey");
    };

    const update = (id, meme) => {
        return requester.update("appdata", `memes/${id}`, "kinvey", meme);
    };

    const getMemesByUserId = (userId) => {
        return requester.get("appdata", `memes?query={"_acl.creator":"${userId}"}`);
    };

    return {
        getAllMemes,
        create,
        remove,
        getMemeById,
        update,
        getMemesByUserId
    };
})();