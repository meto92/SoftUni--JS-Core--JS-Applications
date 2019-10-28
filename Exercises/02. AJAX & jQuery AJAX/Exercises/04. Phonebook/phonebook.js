function attachEvents() {
    const $phonesUl = $("#phonebook");
    const $loadBtn = $("#btnLoad");
    const $personField = $("#person");
    const $phoneField = $("#phone");
    const $createBtn = $("#btnCreate");
    const baseUrl = "https://phonebook-nakov.firebaseio.com/phonebook";

    function deleteContact(id) {
        $.ajax({
            method: "DELETE",
            url: `${baseUrl}/${id}.json`,

        });
    }

    function addLi(id, person, phone) {
        $("<li>").text(`${person}: ${phone}`)
            .append(" ")
            .append($("<button>")
                .text("[Delete]")
                .click((e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    deleteContact(id);
                    $(e.target).parents("li:first")
                        .remove();
                }))
            .appendTo($phonesUl);
    }

    function loadContacts(response) {
        Object.entries(response)
            .filter(p => !!p[1])
            .forEach(([id, obj]) => {
                addLi(id, obj.person, obj.phone);
            });
    }

    $loadBtn.click(() => {
        $.get({
            url: baseUrl + ".json",
            success: (response) => {
                $phonesUl.empty();
                
                loadContacts(response);
            },
            error: (err) => {
                console.log(err)
            }
        })
    });

    function addContact(person, phone) {
        if (!person || !phone) {
            return;
        }

        const data = JSON.stringify({
            person,
            phone
        });

        $.ajax({
            type: "POST",
            url: `${baseUrl}.json`,
            data,
            success: (response) => {
                $personField.val("");
                $phoneField.val("");

                addLi(response.name, person, phone);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    $createBtn.click(() => {
        const person = $personField.val().trim();
        const phone = $phoneField.val().trim();

        addContact(person, phone);
    });
}