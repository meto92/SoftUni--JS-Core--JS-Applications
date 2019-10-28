function loadRepos() {
    const $reposUl = $("#repos");
    const username = $("#username").val();

    $.get({
        url: `https://api.github.com/users/${username}/repos`,
        success: (response) => {
            $reposUl.empty();

            Object.values(response)
                .forEach(repo => {
                    $("<li>").append($("<a>")
                        .text(repo.full_name)
                        .attr("href", repo.html_url))
                        .appendTo($reposUl);
                });
        },
        error: (error) => {
            $reposUl.empty();
            
            $("<li>").text("Error has occurred!")
                .appendTo($reposUl);
        }
    });
}