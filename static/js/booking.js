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
	initGallery();
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

	7. Init Gallery

	*/

	function initGallery()
	{
		if($('.gallery_slider').length)
		{
			var gallerySlider = $('.gallery_slider');
			gallerySlider.owlCarousel(
			{
				items:10,
				loop:true,
				autoplay:true,
				dots:false,
				nav:true,
				smartSpeed:1200,
				responsive:
				{
					0:{items:1},
					576:{items:2},
					768:{items:3},
					992:{items:4}
				}
			});

			if($('.colorbox').length)
			{
				$('.colorbox').colorbox(
				{
					rel:'colorbox',
					photo: true,
					maxWidth:'95%',
					maxHeight:'95%'
				});
			}
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
				loop:true,
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
    var nameInput = document.querySelector(".name");
    var phoneInput = document.querySelector(".phone");
    var emailInput = document.querySelector(".email");
    var messageInput = document.querySelector(".message");
    var errorMessages = document.getElementById("errorMessages");
    var errorModal = document.getElementById("errorModal");
    var thankYouMessage = document.getElementById("thankYouMessage");
    var closeModal = document.getElementById("closeModal");
    var bookNowButtonIds = [
        "bookNowButton1",
        "bookNowButton2",
        "bookNowButton3",
        "bookNowButton4",
        "bookNowButton5",
        "bookNowButton6",
        "bookNowButton7",
        "bookNowButton8"
    ];

    // Скрытые поля в модальной форме
    var modalCheckIn = document.getElementById("modalCheckIn");
    var modalCheckOut = document.getElementById("modalCheckOut");
    var modalGuests = document.getElementById("modalGuests");

    nameInput.setAttribute('autocomplete', 'off');
    phoneInput.setAttribute('autocomplete', 'off');
    emailInput.setAttribute('autocomplete', 'off');
    messageInput.setAttribute('autocomplete', 'off');

    function formatDate(date) {
        var parts = date.split('/');
        return parts[2] + '-' + parts[1] + '-' + parts[0]; // Преобразование в формат YYYY-MM-DD
    }

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

        // Если ошибок нет, передаем значения в скрытые поля модальной формы
        modalCheckIn.value = formatDate(bookingIn.value);
        modalCheckOut.value = formatDate(bookingOut.value);
        modalGuests.value = bookingGuests.value;

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
        } else if (phoneInput.value.trim() === "+7" && emailInput.value.trim() === "") {
            errorModalWindow = "Пожалуйста, введите номер телефона или адрес электронной почты.";
            isErrorModal = true;
        } else if (phoneInput.value.trim() === "" && emailInput.value.trim() === "") {
            errorModalWindow = "Пожалуйста, введите номер телефона или адрес электронной почты.";
            isErrorModal = true;
        } else if (emailInput.value.trim() !== "" && !validateEmail(emailInput.value)) {
            errorModalWindow = "Пожалуйста, введите корректный адрес электронной почты.";
            isErrorModal = true;
        } else if (phoneInput.value.trim().length !== 12) { // Добавленная проверка длины номера телефона
            errorModalWindow = "Пожалуйста, введите корректный номер телефона.";
            isErrorModal = true;
        }

        if (isErrorModal) {
            errorModal.textContent = errorModalWindow;
            errorModal.style.display = "block";
            return;
        } else {
            // Собираем данные для отправки
            var formData = new FormData(document.getElementById("modalForm"));

            // Отправляем данные на сервер
            fetch('/submit_form', {
                method: 'POST',
                body: formData
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Возникла ошибка');
                }
                // Показываем сообщение об успехе и скрываем форму
                document.querySelector("#modalForm").style.display = "none";
                thankYouMessage.style.display = "block";
                modal.style.display = "block"; // Показываем модалку "Спасибо"
            })
            .catch(function(error) {
                console.error('There has been a problem with your fetch operation:', error);
            });
        }
    }

    bookNowButtonIds.forEach(function(id) {
        var bookNowButton = document.getElementById(id);
        if (bookNowButton) { // Проверяем, что кнопка существует
            bookNowButton.onclick = function(event) {
                event.preventDefault(); // Предотвращаем переход по ссылке
                modal.style.display = "block"; // Открываем модальное окно
            }
        }
    });

    // Обработчик для закрытия модалки
    closeModal.onclick = function() {
        modal.style.display = "none";
        document.querySelector("#modalForm").style.display = "block";
        thankYouMessage.style.display = "none";
        document.querySelector("#modalForm").reset();
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

    // Ограничение на поле "Количество гостей"
    bookingGuests.addEventListener('input', function() {
        if (bookingGuests.value > 100) {
            bookingGuests.value = 100;
        }
    });

    // Ограничение на поле "Ваше имя"
    nameInput.addEventListener('input', function() {
        nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '').slice(0, 30);
    });

    phoneInput.value = "+7";
    phoneInput.addEventListener('input', function() {
        let input = phoneInput.value;

        // Если введенный номер не начинается с "+7", исправляем это
        if (!input.startsWith("+7")) {
            input = "+7" + input.replace(/\D/g, '');
        }

        // Убираем все нецифровые символы и ограничиваем до 10 цифр после "+7"
        let cleaned = input.slice(2).replace(/\D/g, '').slice(0, 10);
        phoneInput.value = "+7" + cleaned;
    });

    // Ограничение на поле "Email"
    emailInput.addEventListener('input', function() {
        emailInput.value = emailInput.value.slice(0, 50);
    });

    // Ограничение на поле "Дополнительные пожелания"
    messageInput.addEventListener('input', function() {
        messageInput.value = messageInput.value.slice(0, 250);
    });

    // Функция для проверки корректности email
    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
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