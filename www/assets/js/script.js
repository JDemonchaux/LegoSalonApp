$(document).ready(function () {
    $('.vue').hide();
    // Routeur
    $('.link').on('click', function () {
        console.log("ok");
        var vue = $(this).attr("data-view");
        $('.vue').hide();
        $('.' + vue).show();
    });


    var socket = io();
    socket.on('countVisiteur', function (data) {
        $(".nbVisiteur").html(data);
    });

    $(".in").on('click', function() {
        var value = $(this).attr("data-value");
        socket.emit("addVisiteur", value);
    });

    $(".out").on('click', function() {
        var value = $(this).attr("data-value");
        socket.emit("removeVisiteur", value);
    })
});
