window.onload = (event) => {
    console.log("Pàgina carregada completament. Inicialitzant..");
    var tabOptions = { "swipeable": true };
    var tabElems = document.getElementsByClassName('tabs');
    var tabInstance = M.Tabs.init(tabElems[0], tabOptions);

    var navOptions = { "swipeable": true };
    var navElems = document.querySelectorAll('.sidenav');
    var navInstances = M.Sidenav.init(navElems, navOptions);

    $.ajax({
        method: "GET",
        url: "https://api.spaceflightnewsapi.net/v4/articles/?limit=25",
        dataType: "json"   // necessitem això pq ens retorni un objecte JSON
    }).done(function (msg) {
        let htmlText = '<ul class="collection">' + "\n";
        for (let result in msg.results) {
            htmlText += '<li class="collection-item avatar">' + "\n";
            htmlText += '<img src="' + msg.results[result].image_url + '" alt="' + msg.results[result].title + '" class="circle">' + "\n";
            htmlText += '<span class="title">' + msg.results[result].title + '</span>' + "\n";
            htmlText += '<p>' + msg.results[result].summary + '</p>' + "\n";
            htmlText += '<a id="' + msg.results[result].id + '" class="secondary-content"><i class="material-icons">send</i></a>' + "\n";
            htmlText += '</li>' + "\n";
        };
        htmlText += '</ul>' + "\n";
        $("#question-tab").html(htmlText);
    }).fail(function () {
        alert("ERROR");
    });

    $("#question-tab").on("click", ".collection-item a", function () {
        var id = $(this).attr("id");
        $.ajax({
            method: "GET",
            url: "https://api.spaceflightnewsapi.net/v4/articles/" + id,
            dataType: "json",   // necessitem això pq ens retorni un objecte JSON
            error: function (request, error) {
                console.log(arguments);
                alert(" Can't do because: " + error);
            }
        }).done(function (msg) {
            var htmlText = '<h4>' + msg.title + '</h4>' + "\n";
            htmlText += '<img src="' + msg.image_url + '" alt="' + msg.title + '" class="materialboxed">' + "\n";
            htmlText += '<p>' + msg.summary + '</p>' + "\n";
            htmlText += '<a href="' + msg.url + '" target="_blank">Noticia completa</a>' + "\n";
            $("#result-tab").html(htmlText);
            tabInstance.select("result-tab");
        }).fail(function () {
            alert("ERROR");
        });
    });
};