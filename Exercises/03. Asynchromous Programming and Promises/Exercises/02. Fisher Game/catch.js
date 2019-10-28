function attachEvents() {
    const $loadBtn = $("button.load:first");
    const $addBtn = $("button.add:first");
    const $catches = $("#catches");
    const $addForm = $("#addForm");
    
    const baseUrl = "https://baas.kinvey.com/appdata/kid_HJr0sjWR7/biggestCatches";
    const username = "guest";
    const password = "guest";
    const auth = "Basic " + btoa(`${username}:${password}`);

    function getCatch($container) {
        const angler = $container.find("input.angler").val().trim();
        let weight = $container.find("input.weight").val().trim();
        const species = $container.find("input.species").val().trim();
        const location = $container.find("input.location").val().trim();
        const bait = $container.find("input.bait").val().trim();
        let captureTime = $container.find("input.captureTime").val().trim();

        if (!angler || !weight || !species || !location || !bait || !captureTime) {
            throw new Error("Missing argument!");
        }

        weight = +weight;
        captureTime = +captureTime;

        if (weight < 0 || captureTime < 0 || !Number.isInteger(captureTime)) {
            throw new Error("Invalid weight or capture time!");
        }

        return {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };
    }

    function clearAddForm() {
        $addForm.find("input").val("");
    }

    function updateCatch($container) {
        let catchObj = null;

        try {
            catchObj = getCatch($container);
        } catch(error) {
            console.log("Invalid catch!")
            
            return;
        }

        const id = $container.attr("data-id");

        $.ajax({
            method: "PUT",
            url: `${baseUrl}/${id}`,
            headers: {
                Authorization: auth,
                "Content-type": "application/json"
            },
            data: JSON.stringify(catchObj),
            success: () => {
                console.log("Update successful!")
            },
            error: (error) => {
                console.log("Update failed!");
                console.log(error);
            }
        });
    }

    function deleteCatch(id) {
        $.ajax({
            method: "DELETE",
            url: `${baseUrl}/${id}`,
            headers: {
                Authorization: auth,
                "Content-type": "application/json"
            },
            success: () => {
                $catches.find(`div.catch[data-id=${id}]`).remove();
            }
        });
    }

    function addCatchDiv(catchObj) {
        $("<div>").addClass("catch")
            .attr("data-id", catchObj._id)
            .append($("<label>")
                .text("Angler"))
            .append($("<input>")
                .attr("type", "text")
                .addClass("angler")
                .val(catchObj.angler))
            .append($("<label>")
                .text("Weight"))
            .append($("<input>")
                .attr("type", "number")
                .addClass("weight")
                .val(catchObj.weight))
            .append($("<label>")
                .text("Species"))
            .append($("<input>")
                .attr("type", "text")
                .addClass("species")
                .val(catchObj.species))
            .append($("<label>")
                .text("Location"))
            .append($("<input>")
                .attr("type", "text")
                .addClass("location")
                .val(catchObj.location))
            .append($("<label>")
                .text("Bait"))
            .append($("<input>")
                .attr("type", "text")
                .addClass("bait")
                .val(catchObj.bait))
            .append($("<label>")
                .text("Capture Time"))
            .append($("<input>")
                .attr("type", "number")
                .addClass("captureTime")
                .val(catchObj.captureTime))
            .append($("<button>")
                .addClass("update")
                .text("Update")
                .click((e) => {
                    const $container = $(e.target).parents("div.catch");

                    updateCatch($container);
                }))
            .append($("<button>")
                .addClass("delete")
                .text("Delete")
                .click((e) => {
                    const id = $(e.target).parents("div.catch")
                        .attr("data-id")
                    
                    deleteCatch(id);
                }))
            .appendTo($catches);
    }

    $addBtn.click(() => {
        let catchObj = null;

        try {
            catchObj = getCatch($addForm);
        } catch(error) {
            console.log(error.message);

            return;
        }
        
        $.ajax({
            method: "POST",
            url: baseUrl,
            headers: {
                Authorization: auth,
                "Content-type": "application/json"
            },
            data: JSON.stringify(catchObj),
            success: (data) => {
                clearAddForm();
                addCatchDiv(data);
            }
        });
    });

    function displayCatches(data) {
        $catches.empty();

        data.forEach(catchObj => addCatchDiv(catchObj));
    }

    $loadBtn.click(() => {
        $.get({
            url: baseUrl,
            headers: {
                Authorization: auth
            },
            success: displayCatches
        });
    });
}