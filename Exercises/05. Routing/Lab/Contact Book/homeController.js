(() => {
    function attachEvents(contacts) {
        const $list = $("#list");
        const selectedContactClass = "selectedContact";

        $list.find(".contact").click((e) => {
            let $element = $(e.target).attr("data-id")
                ? $(e.target)
                : $(e.target).parent();

            $list.find(`.${selectedContactClass}`)
                .removeClass(selectedContactClass);
            $element.addClass(selectedContactClass);

            const index = +$element.attr("data-id");
            const contact = contacts[index];

             $.get("./templates/contacts/selectedContactDetails.hbs")
                .then(source => {
                    const template = Handlebars.compile(source);
                    const $book = $("#book");

                    $book.find("#details").remove();
                    
                    $book.append(template(contact));
                });        
        });
    }

    window.homeController = {
        render: (context) => {
            context.isAuth = !!sessionStorage.getItem("username");

            $.get("./data.json")
                .then(contacts => {
                    context.contacts = contacts;
                    
                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        navigation: './templates/common/navigation.hbs',
                        loginForm: "./templates/forms/loginForm.hbs",
                        contact: "./templates/contacts/contact.hbs",
                        contactList: "./templates/contacts/contactList.hbs",
                        //selectedContactDetails: "./templates/contacts/selectedContactDetails.hbs",
                        contactPage: "./templates/contacts/contactPage.hbs",
                        footer: './templates/common/footer.hbs',
                    }).then(function () {
                        this.partial('./templates/welcome.hbs');
                        
                        setTimeout(() => {
                            if (!context.isAuth) {
                                $("div.container").addClass("centered");
                            }

                            attachEvents(contacts);
                        }, 100);
                    });   
                });
        }
    };
})();