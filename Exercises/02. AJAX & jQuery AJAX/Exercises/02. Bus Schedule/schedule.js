function solve() {
    const $infoSpan = $("#info span");
    const $departBtn = $("#depart");
    const $arriveBtn = $("#arrive");
    const baseUrl = "https://judgetests.firebaseio.com/schedule";

    let currentStopId = "depot";
    let stopName = null;

    function depart() {
        $.get({
            url: `${baseUrl}/${currentStopId}.json`,
            success: (response) => {
                currentStopId = response.next;
                stopName = response.name;

                $infoSpan.text(`Next stop ${stopName}`);
                $departBtn.attr("disabled", "");
                $arriveBtn.removeAttr("disabled");
            },
            error: () => {
                $infoSpan.text("Error");
                $departBtn.attr("disabled", "");
                $arriveBtn.attr("disabled", "");
            }
        })
    }

    function arrive() {
        $infoSpan.text(`Arriving at ${stopName}`);
        $departBtn.removeAttr("disabled");
        $arriveBtn.attr("disabled", "");
    }

    return {
      depart,
      arrive
    };
}