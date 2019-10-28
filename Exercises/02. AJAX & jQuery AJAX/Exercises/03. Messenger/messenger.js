function attachEvents() {
    const $messages = $("#messages");
    const $authorField = $("#author");
    const $contentField = $("#content");
    const $submitBtn = $("#submit");
    const $refreshBtn = $("#refresh");
    const baseUrl = "https://testapp-e25c5.firebaseio.com/messenger";

    function addMessageToTextArea(message) {
        $messages.val($messages.val() + `${message.author}: ${message.content}\n`);
        $messages.text($messages.text() + `${message.author}: ${message.content}\n`);
    }

    $refreshBtn.click((e) => {
        e.preventDefault();
        e.stopPropagation();

        $.get({
            url: `${baseUrl}.json`,
            success: (res) => {
                $messages.val("");

                Object.values(res)
                    .sort((a, b) => a.timestamp - b.timestamp)
                    .forEach(message => {
                        addMessageToTextArea(message);
                    });
            }
        });
    });

    $submitBtn.click((e) => {
        //e.preventDefault();
        //e.stopPropagation();

        const author = $authorField.val().trim();
        const content = $contentField.val().trim();

        if (!author || !content) {
            return;
        }

        const message = {
            author,
            content,
            timestamp: Date.now()
        }

        $.post({
            url: `${baseUrl}.json`,
            data: JSON.stringify(message),
            success: () => {
                addMessageToTextArea(message);

                $authorField.val("");
                $contentField.val("");
            },
            error: (error) => {
                console.log(error);
            }
        });
    });
}