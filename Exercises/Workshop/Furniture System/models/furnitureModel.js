const furnitureModel = (() => {
    const getFurniture = (id) => {
        return requester.get("appdata", `furniture/${id}`, "kinvey");
    };

    const create = (context) => {
        const $makeField = $("#new-make");
        const $modelField = $("#new-model");
        const $yearField = $("#new-year");
        const $descriptionField = $("#new-description");
        const $priceField = $("#new-price");
        const $imageField = $("#new-image");
        const $materialField = $("#new-material");
        
        const $arr = [$makeField, $modelField, $yearField, $descriptionField, $priceField, $imageField, $descriptionField];
        
        $arr.forEach(($elem) => {
            $elem.removeClass("is-valid")
                .addClass("is-invalid");
            });

        const make = $makeField.val();
        const model = $modelField.val();
        const year = +$yearField.val();
        const description = $descriptionField.val();
        const price = +$priceField.val();
        const imageUrl = $imageField.val();
        const material = $materialField.val();

        const validClass = "is-valid";
        const invalidClass = "is-invalid";

        const setValid = ($elem) => {
            $elem.addClass(validClass);
            $elem.removeClass(invalidClass);
        };

        if (make.length >= 4) {
            setValid($makeField)
        }

        if (model.length >= 4) {
            setValid($modelField);
        }

        if (year >= 1950 && year <= 2050) {
            setValid($yearField);
        }

        if (description.length > 10) {
            setValid($descriptionField);
        }

        if ($priceField.val() && price >= 0) {
            setValid($priceField);
        }

        if (imageUrl.length) {
            setValid($imageField);
        }

        setValid($materialField);

        const isFormInvalid = $arr.some($elem => $elem.hasClass(invalidClass));

        if (isFormInvalid) {
            return;
        }

        const data = {
            make,
            model,
            year,
            description,
            price,
            imageUrl,
            material
        };
        
        return requester.post("appdata", "furniture", "kinvey", data);
    };

    const deleteFurniture = (id) => {
        return requester.remove("appdata", `furniture/${id}`, "kinvey");
    };

    return {
        getFurniture,
        create,
        deleteFurniture
    };
})();