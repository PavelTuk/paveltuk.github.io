jQuery('document').ready(function () {
    jQuery.ajax({
        url: 'https://paveltuk.github.io/paveltuk.github.io/target_indicator_api/'
        , method: 'get'
        , dataType: 'json'
        , success: function (data) {
            var current_value = data.balance_usd;
            var on_load_value = 0;
            jQuery('#target-value').html(on_load_value);
            jQuery('.shape .indicator .target-line-current').css('width', on_load_value * 7.428);
            jQuery('#arrow-value').html(on_load_value);
            var on_load = setInterval(function () {
                on_load_value = (on_load_value + 0.2).toFixed(1) * 1;
                if (on_load_value > current_value) {
                    clearInterval(on_load);
                    var update_interval = setInterval(function () {
                        current_value = (current_value + 0.2).toFixed(1) * 1;
                        if (current_value >= 15) {
                            jQuery('.shape .indicator .info').hide();
                            jQuery('.shape .indicator .target-box').css('background', '#00a910');
                            clearInterval(update_interval);
                        }
                        jQuery('#arrow-value').html(current_value);
                        jQuery('.shape .indicator .target-line-current').css('width', current_value * 7.428);
                        jQuery('.shape .indicator .arrow').css('left', '+=1.485');
                    }, 2000);
                }
                else {
                    jQuery('#target-value').html(on_load_value);
                    jQuery('.shape .indicator .target-line-current').css('width', on_load_value * 7.428);
                    jQuery('#arrow-value').html(on_load_value);
                    var arrow_pos = parseInt(jQuery('.shape .indicator .target-line-current').css('width')) + parseInt(jQuery('.shape .indicator .target-line-current').css("left"));
                    jQuery('.shape .indicator .arrow').css("left", arrow_pos - 10);
                }
            }, 50);
        }
    })
});