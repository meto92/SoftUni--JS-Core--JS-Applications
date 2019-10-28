const homeController = (() => {
    const showMain = (context) => {
        context.loadPartials({
            header: "views/common/header.hbs",
            footer: "views/common/footer.hbs"
        })
        .then(function () {
            this.partial("views/home/main.hbs");
        });
    }
    
    const showFeed = (context) => {
        memeService.getAllMemes()
            .then(allMemes => {
                const memes = JSON.parse(JSON.stringify(allMemes));

                context.allMemes = memes;

                memes.forEach(meme => {
                    meme.isCurrentUserCreator = meme.creator === sessionStorage.getItem("username");
                });

                context.loadPartials({
                    header: "views/common/header.hbs",
                    meme: "views/meme/meme.hbs",
                    footer: "views/common/footer.hbs"
                })
                .then(function () {
                    this.partial("views/home/feed.hbs");
                });
            });
    };

    const index = (context) => {
        utilities.setBaseContextParams(context);

        if (!context.loggedIn) {
            showMain(context);
        } else {
            showFeed(context);
        }
    };

    return {
        index
    };
})();