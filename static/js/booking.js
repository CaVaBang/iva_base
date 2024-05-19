/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Date Picker
5. Init Booking Slider


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var ctrl = new ScrollMagic.Controller();

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();

		setTimeout(function()
		{
			$(window).trigger('resize.px.parallax');
		}, 375);
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initDatePicker();
	initBookingSlider();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 91)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.menu').length)
		{
			var menu = $('.menu');
			var hamburger = $('.hamburger');
			var close = $('.menu_close');

			hamburger.on('click', function()
			{
				menu.toggleClass('active');
			});

			close.on('click', function()
			{
				menu.toggleClass('active');
			});
		}
	}

	/* 

	4. Init Date Picker

	*/

    function initDatePicker() {
        if ($('.datepicker').length) {
            var datePickers = $('.datepicker');
            datePickers.each(function (index) {
                var dp = $(this);
                var placeholder = dp.data('placeholder');
                dp.val(placeholder);
                dp.datepicker({
                    minDate: 0, // Устанавливаем минимальную доступную дату как сегодняшний день
                    dateFormat: 'dd/mm/yy', // Устанавливаем формат даты
                    onSelect: function (selectedDate) {
                        // Проверка на соответствие формату даты
                        var isValidDate = /^\d{2}\/\d{2}\/\d{4}$/.test(selectedDate);
                        if (!isValidDate) {
                            var errorMessage = "Ошибка: Дата должна быть в формате dd/mm/yy";
                            var errorMessages = document.getElementById("errorMessages");
                            errorMessages.textContent = errorMessage;
                            errorMessages.style.display = "block";
                            return;
                        }
                        // Если ошибок нет, скрываем сообщение об ошибке
                        var errorMessages = document.getElementById("errorMessages");
                        errorMessages.style.display = "none";

                        // Если это первый календарь
                        if (index === 0) {
                            // Находим второй календарь по индексу и устанавливаем его минимальную дату как выбранную дату в первом календаре
                            datePickers.eq(1).datepicker('option', 'minDate', selectedDate);
                        }
                    }
                });

                // Удаляем обработчик события для ввода цифр
                dp.off('input');
                // Запрещаем ручной ввод текста в поле
                dp.on('keydown', function(e) {
                    e.preventDefault();
                });
            });
        }
    }

	/* 

	5. Init Booking Slider

	*/

	function initBookingSlider()
	{
		if($('.booking_slider').length)
		{
			var bookingSlider = $('.booking_slider');
			bookingSlider.owlCarousel(
			{
				items:3,
				autoplay:true,
				autoplayHoverPause:true,
				loop:false,
				smartSpeed:1200,
				dots:false,
				nav:false,
				margin:30,
				responsive:
				{
					0:{items:1},
					768:{items:2},
					992:{items:3}
				}
			});
		}
	}

});

document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("myModal");
    var openModalButton = document.getElementById("openModalButton");
    var btnModal = document.getElementById("btnModal");
    var bookingIn = document.querySelector(".booking_in");
    var bookingOut = document.querySelector(".booking_out");
    var bookingGuests = document.querySelector(".booking_input_b");
    var nameInput = document.querySelector(".name")
    var phoneInput = document.querySelector(".phone");
    var emailInput = document.querySelector(".email");
    var messageInput = document.querySelector(".message");
    var errorMessages = document.getElementById("errorMessages");
    var errorModal = document.getElementById("errorModal");


    openModalButton.onclick = function() {
        var isError = false;
        var errorMessage = "";

        // Проверяем, заполнены ли все поля
        if (bookingIn.value.trim() === "" || bookingOut.value.trim() === "" || bookingGuests.value.trim() === "") {
            errorMessage = "Пожалуйста, заполните все поля.";
            isError = true;
        }

        // Если есть ошибка, отображаем сообщение об ошибке
        if (isError) {
            errorMessages.textContent = errorMessage;
            errorMessages.style.display = "block";
            return;
        }

        // Если ошибок нет, открываем модальное окно
        modal.style.display = "block";
    }

    btnModal.onclick = function(event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию

        var isErrorModal = false;
        var errorModalWindow = "";

        if (nameInput.value.trim() === "") {
            errorModalWindow = "Пожалуйста, введите Ваше имя.";
            isErrorModal = true;
        } else if (phoneInput.value.trim() === "" && emailInput.value.trim() === "") {
            errorModalWindow = "Пожалуйста, введите номер телефона или адрес электронной почты.";
            isErrorModal = true;
        }

        if (isErrorModal) {
            errorModal.textContent = errorModalWindow;
            errorModal.style.display = "block";
            return;
        } else {
            // Если ошибок нет, можно отправить форму
            document.querySelector("#modalForm").submit();
        }
    }



    // Скрытие сообщения об ошибке при фокусе на поле ввода
    bookingIn.addEventListener('focus', function() {
        errorMessages.style.display = "none";
    });

    bookingOut.addEventListener('focus', function() {
        errorMessages.style.display = "none";
    });

    bookingGuests.addEventListener('focus', function() {
        errorMessages.style.display = "none";
    });

    phoneInput.addEventListener('focus', function() {
        errorModal.style.display = "none";
    });

    nameInput.addEventListener('focus', function() {
        errorModal.style.display = "none";
    });

    emailInput.addEventListener('focus', function() {
        errorModal.style.display = "none";
    });

    // Закрытие модального окна при клике на крестик или вне окна
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});



// Функция для блокировки/разблокировки прокрутки страницы когда открыта модалка
function checkModalDisplay(mutationsList, observer) {
    mutationsList.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            var modal = document.getElementById('myModal');
            if (modal.style.display === 'block') {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    });
}

var observer = new MutationObserver(checkModalDisplay);

var config = { attributes: true, childList: true, subtree: true };

observer.observe(document.getElementById('myModal'), config);