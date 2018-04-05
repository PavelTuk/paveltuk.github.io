var initialValue = null;
var dif = null;
var target = 15;
var loadingBar = document.getElementsByClassName('loading-bar')[0];
dif = target - initialValue;
$(document).ready($.ajax({
    url: 'http://alex.devel.softservice.org/testapi/'
    , success: (data) => {
        initialValue = data.balance_usd;
        dif = target - initialValue;
    }
    , error: (jqXHR, exception) => {
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        }
        else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        }
        else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        }
        else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        }
        else if (exception === 'timeout') {
            msg = 'Time out error.';
        }
        else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        }
        else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        console.log(msg);
        initialValue = 0;
        dif = target - initialValue;
    }
, }))
$('#btn').on('click', foo)

function foo() {
    if (initialValue && initialValue <= target) {
        $('.loading-bar').width(Math.ceil(initialValue) / target * 100 + '%');
        var percentDif = 100 - parseInt(loadingBar.style.width);
        var count = dif / 0.2;
        var step = percentDif / count;
        $('#targetSpan').text(Math.round(dif));
        $('#number-container').text('$' + initialValue.toFixed(1));
        var interval = setInterval(
            () => {
                initialValue += 0.2;
                if (initialValue <= target) {
                    $('.loading-bar').width(step + parseFloat(loadingBar.style.width) + '%');
                    dif = target - initialValue;
                    $('#targetSpan').text(dif.toFixed(2));
                    $('#number-container').text('$' + initialValue.toFixed(1));
                }
                /*if (parseFloat(loadingBar.style.width) > 100)*/
                if (initialValue >= target) {
                    $('.target').addClass('done');
                    $('.second-flex:first').fadeTo(250, 0);
                    setTimeout(
                        () => {
                            $('.second-flex:first').hide()
                        }, 1000)
                    clearInterval(interval)
                }
                console.log(loadingBar.style.width)
            }, 2000)
    }
    else {
        console.log('error')
    }
}