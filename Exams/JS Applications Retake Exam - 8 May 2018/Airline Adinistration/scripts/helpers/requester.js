let requester = (() => {
    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_HJr0sjWR7";
    const kinveyAppSecret = "737105f7781b4b21916c9cb16f8857fe";
    const kinveyMasterSecret = "650f9a4b724e49189a08386fdd68fda0";

    // Creates the authentication header
    function makeAuth(type) {
        return type === 'basic'
            ?  'Basic ' + btoa(kinveyAppKey + ':' + kinveyMasterSecret)
            :  'Kinvey ' + sessionStorage.getItem('authtoken');
    }

    // Creates request object to kinvey
    function makeRequest(method, module, endpoint, auth) {
        return req = {
            method,
            url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
            headers: {
                'Authorization': makeAuth(auth)
            }
        };
    }

    // Function to return GET promise
    function get (module, endpoint, auth) {
        return $.ajax(makeRequest('GET', module, endpoint, auth));
    }

    // Function to return POST promise
    function post (module, endpoint, auth, data) {
        let req = makeRequest('POST', module, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    // Function to return PUT promise
    function update (module, endpoint, auth, data) {
        let req = makeRequest('PUT', module, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    // Function to return DELETE promise
    function remove (module, endpoint, auth) {
        return $.ajax(makeRequest('DELETE', module, endpoint, auth));
    }

    return {
        get,
        post,
        update,
        remove
    }
})();