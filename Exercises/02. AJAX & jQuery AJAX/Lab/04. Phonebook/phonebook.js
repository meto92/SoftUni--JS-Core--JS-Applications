const $phonesUl = $("#phonebook");
const $loadBtn = $("#btnLoad");
const $personField = $("#person");
const $phoneField = $("#phone");
const $createBtn = $("#btnCreate");
const baseUrl = "https://phonebook-2f4d4.firebaseio.com/Phonebook";

function deleteContact(id) {
    $.ajax({
        method: "DELETE",
        url: `${baseUrl}/${id}.json`,

    });
}

function addLi(id, name, phone) {
    $("<li>").text(`${name}: ${phone}`)
        .append($("<a>")
            .attr("href", "#")
            .text(" [Delete]")
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
            addLi(id, obj.name, obj.phone);
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
        name: person,
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
    const person = $personField.val();
    const phone = $phoneField.val();

    addContact(person, phone);
});