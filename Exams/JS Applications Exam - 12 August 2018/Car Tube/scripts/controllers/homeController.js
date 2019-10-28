const homeController = (() => {
    const index = (context) => {
        const username = sessionStorage.getItem("username");
        
        context.username = username;
        context.loggedIn = !!username;
        context.notLoggedIn = !context.loggedIn;

        context.loadPartials({
            header: "views/common/header.hbs",
            footer: "views/common/footer.hbs"
        })
        .then(function () {
            this.partial("views/home/home.hbs");
        });
    };

    return {
        index
    };
})();