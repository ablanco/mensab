/*jslint vars: false */
/*global jQuery, $ */

jQuery.github = {
    getRepos: function (username, callback) {
        "use strict";
        jQuery.getJSON("https://api.github.com/users/" + username + "/repos?callback=?", callback);
    },

    filterList: ["config", "GECO", "geco-ffox-extension", "cagg-browser-extensions", "agora-ciudadana", "yith-library-server"]
};

jQuery.fn.loadRepositories = function (username, descViewport) {
    "use strict";
    var target = this,
        sortByNumberOfWatchers;

    this.html("<span>Querying GitHub for repositories...</span>");

    sortByNumberOfWatchers = function (repos) {
        repos.sort(function (a, b) {
            return b.watchers - a.watchers;
        });
    };

    $.github.getRepos(username, function (response) {
        var repos = response.data,
            descriptions = $(descViewport),
            list = $('<ul/>'),
            projects,
            projectsDescs,
            height,
            showDesc;

        sortByNumberOfWatchers(repos);

        target.empty().append(list);
        $(repos).filter(function (idx) {
            return jQuery.inArray(this.name, $.github.filterList) === -1;
        }).each(function (idx) {
            var name = this.name;
            if (name.length > 25) {
                name = name.substring(0, 22) + "...";
            }
            list.append("<li class='github' id='" + idx + "-project'><a href='" + this.html_url + "'>" + name + "</a> <img class='info' src='icons/info.png'>");
            descriptions.append("<span class='hidden' id='" + idx + "-projectdesc'>" + this.description + "</span>");
        });

        // mouse behaviours
        projects = list.find('li');
        projectsDescs = descriptions.find('span');

        showDesc = function (node) {
            var desc = $("#" + node.id.split('-')[0] + "-projectdesc");
            projectsDescs.addClass("hidden");
            desc.removeClass("hidden");
        };

        projects.on("mouseenter", function () {
            showDesc(this);
        });

        projects.on("mouseleave", function () {
            projectsDescs.addClass("hidden");
        });

        list.find("li img.info").click(function () {
            showDesc($(this).parent()[0]);
        });
    });
};
