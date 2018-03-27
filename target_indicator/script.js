jQuery('document').ready(function () {
    jQuery.ajax({
        url: 'http://alex.devel.softservice.org/testapi/'
        , method: 'get'
        , dataType: 'json'
        , success: function (data) {
            var current_value = data.balance_usd;
            jQuery('#target-value').html(current_value);
            jQuery('.shape .indicator .target-line-current').css('width', current_value * 7.66);
            var arrow_pos = parseInt(jQuery('.shape .indicator .target-line-current').css('width')) + parseInt(jQuery('.shape .indicator .arrow').css("left"));
            jQuery('.shape .indicator .arrow').css("left", arrow_pos);
            var update_interval = setInterval(function () {
                current_value = (current_value + 0.2).toFixed(1) * 1;
                if (current_value >= 15) {
                    jQuery('.info').hide();
                    jQuery('.target-box').css('background-color', '#00a910');
                    clearInterval(update_interval);
                }
                jQuery('#arrow-value').html(current_value);
                jQuery('.shape .indicator .target-line-current').css('width', current_value * 7.66);
                jQuery('.shape .indicator .arrow').css('left', '+=1.55');
            }, 2000);
        }
    })
});