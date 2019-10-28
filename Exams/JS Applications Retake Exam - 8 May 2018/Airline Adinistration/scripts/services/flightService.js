const flightService = (() => {
    const getAllFlights = () => {
        return requester.get("appdata", "flights", "basic");
    };

    const create = (flight) => {
        return requester.post("appdata", "flights", "kinvey", flight);
    };

    const getFlightById = (flightId) => {
        return requester.get("appdata", `flights/${flightId}`);
    };

    const update = (flightId, flight) => {
        return requester.update("appdata", `flights/${flightId}`, "kinvey", flight);
    };

    const remove = (flightId) => {
        return requester.remove("appdata", `flights/${flightId}`);
    };

    const getUserFlights = () => {
        const userId = sessionStorage.getItem("userId");

        return requester.get("appdata", `flights?query={"_acl.creator":"${userId}"}`);
    };

    return {
        getAllFlights,
        create,
        getFlightById,
        update,
        remove,
        getUserFlights
    };
})();