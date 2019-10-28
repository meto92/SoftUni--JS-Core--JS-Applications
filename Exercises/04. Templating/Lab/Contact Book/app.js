$(() => {
    const $list = $("#list div.content");
    const $details = $("#details div.content");
    
    let p1 = $.get("./templates/contacts.hbs");
    let p2 = $.get("./templates/contact.hbs");
    let p3 = $.get("./templates/details.hbs");
    let p4 = $.get("./data.json");

    Promise.all([p1, p2, p3, p4])
        .then(([contactsTemplate, contactTemplate, detailsTemplate, contacts]) => {
            const template = Handlebars.compile(contactsTemplate);
            detailsTemplate = Handlebars.compile(detailsTemplate);

            Handlebars.registerPartial('contact', contactTemplate);

            let html = template({
                contacts
            });
            
            $list.append(html);

            $(".contact").click((e) => {
                let $element = $(e.target);
                
                if (!$element.hasClass("contact")) {
                    $element = $element.parent("div.contact");
                }

                const index = $element.attr("data-id");
                
                $details.html(detailsTemplate(contacts[index]));

                $list.find(".selected-contact").removeClass("selected-contact");
                $element.addClass("selected-contact");
            });
        });
});