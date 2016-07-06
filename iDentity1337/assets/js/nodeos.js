$(document).ready(function() {
    $("#main1-txt").append('<span class="sph1" style="display: none">Introducing NodeOS</span>').find('span.sph1').fadeIn(1500, function() {
        $("#main1-txt").append('<span class="sph2" style="display: none">First operating system powered by npm</span>').find('span.sph2').fadeIn(1500, function() {
            $("#main1-txt").append('<a href="/download"><i id="download" style="display: none; color: #264668" class="fa fa-download fa-3x"></i></a>').find('i').fadeIn(1500);
        });
    });
});