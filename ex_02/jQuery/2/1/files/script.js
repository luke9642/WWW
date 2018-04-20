$(document).ready(function(){
    let location = window.location.hash;
    let alert_button = () => console.log("button clicked");
    $("#b1").on("click", alert_button);
    $("#b2").on("click", alert_button);


    if (location && ["#breakfast", "#lunch", "#dinner"].includes(location.trim()))
        hideShow(location);
    else
        hideShow("#breakfast");

    function hideShow(el) {
        $(".box").hide();
        $(el).show();
        $(".tab").removeClass("active");
        $(".tab[href='" + el + "']").addClass("active");

    }

    $(".button").on("click", function() {
        $(".button").attr("disabled", false);
        $(this).attr("disabled", true);
        hideShow($(this).attr("href"));
    });

    $('.tab').click(function(e) {
        let loc = $(this).attr("href");
        hideShow(loc);
        window.location.hash = loc;
		$(".button").attr("disabled", false);
		$(".button[href='" + loc + "']").attr("disabled", true);
        return false;
    });
});
   