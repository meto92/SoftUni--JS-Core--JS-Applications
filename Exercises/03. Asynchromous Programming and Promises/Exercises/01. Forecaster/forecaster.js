function attachEvents() {
    const $location = $("#location");
    const $submitBtn = $("#submit");
    const $forecast = $("#forecast");
    const $current = $("#current");
    const $upcoming = $("#upcoming");
    const url = "https://judgetests.firebaseio.com/locations.json";
    const currentConditionUrl = "https://judgetests.firebaseio.com/forecast/today";
    const upcomingConditionUrl = "https://judgetests.firebaseio.com/forecast/upcoming";

    function getWeatherSymbol(name) {
        const symbolByName = {
            Sunny: "&#x2600;", // ☀
            "Partly sunny":	"&#x26C5;", // ⛅
            Overcast: "&#x2601;", // ☁
            Rain: "&#x2614;", // ☂
            Degrees: "&#176;" // °
        };

        return symbolByName[name];
    }

    function showCurrentWeather(data) {
        const name = data.name;
        const condition = data.forecast.condition;
        const high = data.forecast.high;
        const low = data.forecast.low;
        const weatherSymbol = getWeatherSymbol(condition);
        const degreesSymbol = getWeatherSymbol("Degrees");

        $("<span>").addClass("condition symbol")
            .html(weatherSymbol)
            .appendTo($current);

        $("<span>").addClass("condition")
            .append($("<span>")
                .addClass("forecast-data")
                .text(name))
            .append($("<span>")
                .addClass("forecast-data")
                .html(`${low}${degreesSymbol}/${high}${degreesSymbol}`))
            .append($("<span>")
                .addClass("forecast-data")
                .text(condition))
            .appendTo($current);
    }

    function showUpcomingWeather(data) {
        data.forecast.forEach(forecast => {
            const condition = forecast.condition;
            const high = forecast.high;
            const low = forecast.low;
            const weatherSymbol = getWeatherSymbol(condition);
            const degreesSymbol = getWeatherSymbol("Degrees");

            $("<span>").addClass("upcoming")
                .append($("<span>")
                    .addClass("symbol")
                    .html(weatherSymbol))
                .append($("<span>")
                    .addClass("forecast-data")
                    .html(`${low}${degreesSymbol}/${high}${degreesSymbol}`))
                .append($("<span>")
                    .addClass("forecast-data")
                    .text(condition))
                .appendTo($upcoming);
        });
    }

    function showWeather(data) {
        $forecast.show();
        $current.find("span").remove();
        $upcoming.find("span").remove();

        const locationName = $location.val();

        let code = null;

        try {
            code = data.filter(obj => obj.name === locationName)[0].code;
        } catch(error) {
            displayError();

            return;
        }

        let currentConditionReq = $.get(`${currentConditionUrl}/${code}.json`);
        let upcomingConditionReq = $.get(`${upcomingConditionUrl}/${code}.json`);
        
        Promise.all([currentConditionReq, upcomingConditionReq])
            .then(([currentCondition, upcomingCondition]) => {
                showCurrentWeather(currentCondition);
                showUpcomingWeather(upcomingCondition);
            })
            .catch(displayError);
    }

    function displayError() {
        $("<span>").text("Error")
            .prependTo($current);
    }

    $submitBtn.click(() => {
        $.get({
            url,
            success: showWeather,
            error: displayError
        });
    });
}