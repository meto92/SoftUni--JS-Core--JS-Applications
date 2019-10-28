function attachEvents() {
    const $towns = $("#towns");
    const $loadTownsBtn = $("#btnLoadTowns");
    const $root = $("#root");
    
    const source = $("#towns-template").html();
    const template = Handlebars.compile(source);
    
    $loadTownsBtn.click(() => {
        const towns = $towns.val()
            .split(", ")
            .reduce((acc, cur) => {
                acc.push({
                    name: cur
                });

                return acc;
            }, []);
        
        $root.html(template({towns}));
    });
}