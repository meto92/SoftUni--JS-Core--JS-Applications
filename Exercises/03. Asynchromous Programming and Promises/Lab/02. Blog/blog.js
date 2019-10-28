function attachEvents() {
    const $loadBtn = $("#btnLoadPosts");
    const $postsSelect = $("#posts");
    const $viewPostBtn = $("#btnViewPost");
    const $postTitle = $("#post-title");
    const $postBody = $("#post-body");
    const $postComments = $("#post-comments");
    const baseUrl = "https://baas.kinvey.com/appdata/kid_HJr0sjWR7";
    const username = "guest";
    const password = "guest";

    function addOption(id, postBody, postTitle) {
        $("<option>").val(id)
            .attr("body", postBody)
            .text(postTitle)
            .appendTo($postsSelect);
    }

    function handleError(error) {
        console.log(`Error: ${error.status} (${error.statusText})`);
    }

    $loadBtn.click(() => {
        $.get({
            url: `${baseUrl}/posts`,
            headers: {
                Authorization: "Basic " + btoa(`${username}:${password}`)
            },
            success: (data) => {
                $postsSelect.empty();

                data.forEach(post => {
                    addOption(post._id, post.body, post.title);
                });
            },
            error: handleError
        });
    });
    
    $viewPostBtn.click(() => {
        const postId = $postsSelect.find(":selected").val();
        
        $.get({
            url: `${baseUrl}/comments/?query={"post_id":"${postId}"}`,
            headers: {
                Authorization: "Basic " + btoa(`${username}:${password}`)
            },
            success: (data) => {
                const $selectedOption = $postsSelect.find(":selected");

                $postComments.empty();
                $postTitle.text($selectedOption.text());
                $postBody.text($selectedOption.attr("body"));
                
                data.forEach(comment => {
                    $("<li>").text(comment.text)
                        .appendTo($postComments);
                });
            },
            error: handleError
        });
    });
}