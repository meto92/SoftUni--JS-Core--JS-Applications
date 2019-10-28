function loadCommits() {
    const $usernameField = $("#username");
    const $repoField = $("#repo");
    const $commitsUl = $("#commits");

    const username = $usernameField.val();
    const repository = $repoField.val();

    $commitsUl.empty();

    function addLi(author, message) {
        $("<li>").text(`${author}: ${message}`)
            .appendTo($commitsUl);
    }

    $.get({
        url: `https://api.github.com/repos/${username}/${repository}/commits`,
        success: (data) => {
            Object.values(data)
                .forEach(commit => {
                    addLi(commit.commit.author.name, commit.commit.message);
                });
        },
        error: (error) => {
            $("<li>").text(`Error: ${error.status} (${error.statusText})`)
                .appendTo($commitsUl);
        }
    })
}