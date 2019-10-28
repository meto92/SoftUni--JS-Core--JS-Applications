function getInfo() {
    const $stopIdField = $("#stopId");
    const $stopNameDiv = $("#stopName");
    const $busesUl = $("#buses");
    const baseUrl = "https://judgetests.firebaseio.com/businfo";

    const stopId = $stopIdField.val();

    $busesUl.empty();

    $.get({
        url: `${baseUrl}/${stopId}.json`,
        success: (response) => {
            $stopNameDiv.text(response.name);
            
            Object.entries(response.buses)
                .forEach(([busId, time]) => {
                    $("<li>").text(`Bus ${busId} arrives in ${time} minutes`)
                        .appendTo($busesUl);
                });
        },
        error: () => {
            $stopNameDiv.text("Error");
        }
    });
}