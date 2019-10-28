const notifications = (() => {
    $(() => {
        $(document).ajaxStart(() => {
            $("#loadingBox").show();

            $("[type=submit]").attr("disabled", "");
        });

        $(document).ajaxStop(() => {
            $("#loadingBox").hide();

            $("[type=submit]").removeAttr("disabled");
        });

        $(document).ajaxError((e, res) => {
            utilities.handleError(res);
        });
		
		$(".notification").click((e) => {
            $(".notification").hide();
        });
    });
    
    const showInfo = (message) => {
        let infoBox = $('#infoBox');
        infoBox.find("span").text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(1000), 3000);
    };

    const showError = (message) => {
        let errorBox = $('#errorBox');
        errorBox.find("span").text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(1000), 3000);
    };
    
    return {
        showInfo,
        showError
    };
})();