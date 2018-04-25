$(document).ready(function () {
    var min_num, max_num, count_items, random_num, i, change_num, step, bubble_1, bubble_2, interval_ID, timeout_ID;
    var num_array = new Array();
    //Генерация массива случайных чисел
    $('#btn-generate').click(function () {
        $('#initial-array, #sorted-array').html('');
        $('#btn-sorting').attr('disabled', 'disabled');
        count_items = document.getElementById('count').value; //получение значений параметров
        min_num = document.getElementById('minValue').value;
        max_num = document.getElementById('maxValue').value;
        if ((min_num < max_num) && (count_items > 0)) { //проверка на корректный ввод параметров
            $('#btn-sorting').removeAttr('disabled').show();
            clearTimeout(timeout_ID); //отмена выполнения таймера
            clearInterval(interval_ID); //отмена выполнения интервала
            //Генерация массива случайных чисел и вывод элементов в виде шаров
            for (i = 0; i < count_items; i++) {
                random_num = Math.round((Math.random() * (max_num - min_num) + min_num));
                num_array[i] = random_num; //заполнение массива
                //отображение элементов
                $('#initial-array, #sorted-array').append('<div class="num">' + random_num + '</div>');
            }
        }
    });
    //Сортировка массива
    $('#btn-sorting').click(function () {
        $(this).attr('disabled', 'disabled');
        step = 1; //начальное значение для внешнего цикла (количество проходов)
        //сортировка
        function sorting() {
            if (step <= count_items) { //провека количества выполненных проходов для остановки сортировки 
                step++;
                i = 1; //начальное значение для внутреннего цикла (для проходов по каждому элементу массива)
                //функция, выполняющаяся с задержкой в 1 секунду
                (function () {
                    if (i < count_items) { //проверка значения внутреннего цикла, чтобы обойти все пары чисел
                        if (num_array[i] < num_array[i - 1]) { //сравнение текущего и предыдущего числа массива
                            bubble_1 = $('#sorted-array .num:eq(' + i + ')'); //выборка шара с текущим числом
                            bubble_2 = $('#sorted-array .num:eq(' + (i - 1) + ')'); //выборка шара с предыдущим числом
                            bubble_1.swap(bubble_2); //смена шаров местами
                            //внесение изменений в массив
                            change_num = num_array[i];
                            num_array[i] = num_array[i - 1];
                            num_array[i - 1] = change_num;
                            timeout_ID = setTimeout(arguments.callee, 1000); //вызов функции, выполняемой в данный момент, задав таймер на 1 секунду
                        }
                        else {
                            timeout_ID = setTimeout(arguments.callee, 0);
                            //вызов функции, выполняемой в данный момент, задав таймер на 0, чтобы не было задержки, так как числа не нужно обменивать
                        }
                        i++;
                    }
                    else { //если на текущем проходе были проверены все пары чисел, то отмена выполнения интервала, чтобы не было задержки между проходами
                        clearInterval(interval_ID);
                        sorting(); //запуск сортировки
                        interval_ID = setInterval(sorting, 1000 * count_items); //запуск выполнения функции sorting с интервалом равным количеству элементов
                    }
                })();
            }
            else {
                clearTimeout(timeout_ID); //отмена выполнения таймера
                clearInterval(interval_ID); //отмена выполнения интервала
            }
        }
        sorting(); //запуск сортировки
    });
});