/*jslint browser: true */
/*global jQuery, $ */

jQuery.github = {
    getRepos: function (username, callback) {
        "use strict";
        jQuery.getJSON("https://api.github.com/users/" + username +
            "/repos?callback=?", callback);
    },

    filterList: [
        "config", "GECO", "geco-ffox-extension", "cagg-browser-extensions",
        "agora-ciudadana", "yith-library-server", "django-mathjax", "mensab",
        "postgresql", "dissim-memoria", "zc.sourcerelease"
    ]
};

jQuery.fn.loadRepositories = function (username) {
    "use strict";
    var target = this,
        sortByNumberOfWatchers;

    this.html("<span class='fa fa-spinner fa-spin'></span> Querying GitHub for repositories...");

    sortByNumberOfWatchers = function (repos) {
        repos.sort(function (a, b) {
            return b.watchers - a.watchers;
        });
    };

    $.github.getRepos(username, function (response) {
        var repos = response.data,
            list = $('<ul class="list-unstyled"><ul/>');

        sortByNumberOfWatchers(repos);
        target.empty().append(list);

        $(repos).filter(function () {
            return jQuery.inArray(this.name, $.github.filterList) === -1;
        }).each(function () {
            var $info, $li;

            $li = $("<li class='github'><a href='" + this.html_url +
                "' target='_blank'>" + this.name + "</a> <span class='fa " +
                "fa-info-circle pull-right'></span>");

            $info = $li.find("span.fa-info-circle");
            $info.popover({
                placement: "left",
                trigger: "click",
                title: this.name,
                content: this.description
            });

            $info.on("show.bs.popover", function () {
                $("#github-projects span.fa-info-circle").popover("hide");
            });

            list.append($li);
        });
    });
};
