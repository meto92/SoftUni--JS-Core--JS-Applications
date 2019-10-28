$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        const $container = $("#allCats");
        const source = $("#cat-template").html();
        const template = Handlebars.compile(source);

        window.cats.forEach(cat => {
            $container.append(template(cat));
        });

        $container.find("button")
            .click((e) => {
                e.preventDefault();
                e.stopPropagation();

                const $button = $(e.target);            
                const $div = $button.next(); //$button.parent().find("button + div");

                $div.toggle();
                
                // if ($div.is(":visible")) {
                //     $button.text("Hide status code");                    
                // } else {
                //     $button.text("Show status code");              
                // }

                $button.text($div.is(":visible")
                    ? "Hide status code"
                    : "Show status code");
            });
    }
})