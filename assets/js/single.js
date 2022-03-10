var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    console.log(repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response){
        //request was succesful
        if (response.ok) {
            response.json().then(function(data){
                //pass response to dom
                displayIssues(data);
            });
        }
        else {
            alert("There was a problem with your request!")
        }
    });
};

getRepoIssues("facebook/react");

var displayIssues = function(issues) {
    if(issues.length === 0 ) {
        issueContainerEl.textContent = "This repo has no issues"
        return;
    } 
    for (var i=0; i < issues.length; i++) {
        //create link element to issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        // create span to hold issue
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        // appends to container
        issueEl.appendChild(titleEl);
        //creates a type element
        var typeEl = document.createElement("span");
        // check if issue is an issue or pull
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        //apend to container
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    };

};