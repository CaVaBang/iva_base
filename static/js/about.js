/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Date Picker
5. Init SVG
6. Init Milestones
7. Init Loaders
8. Init Testimonials Slider


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
	initSvg();
	initMilestones();
	initLoaders();
	initTestSlider();

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

	5. Init SVG

	*/

	function initSvg()
	{
		if($('img.svg').length)
		{
			jQuery('img.svg').each(function()
			{
				var $img = jQuery(this);
				var imgID = $img.attr('id');
				var imgClass = $img.attr('class');
				var imgURL = $img.attr('src');

				jQuery.get(imgURL, function(data)
				{
					// Get the SVG tag, ignore the rest
					var $svg = jQuery(data).find('svg');

					// Add replaced image's ID to the new SVG
					if(typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
					}
					// Add replaced image's classes to the new SVG
					if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
					}

					// Remove any invalid XML tags as per http://validator.w3.org
					$svg = $svg.removeAttr('xmlns:a');

					// Replace image with new SVG
					$img.replaceWith($svg);
				}, 'xml');
			});
		}	
	}

	/* 

	6. Init Milestones

	*/

	function initMilestones()
	{
		if($('.milestone_counter').length)
		{
			var milestoneItems = $('.milestone_counter');

	    	milestoneItems.each(function(i)
	    	{
	    		var ele = $(this);
	    		var endValue = ele.data('end-value');
	    		var eleValue = ele.text();

	    		/* Use data-sign-before and data-sign-after to add signs
	    		infront or behind the counter number */
	    		var signBefore = "";
	    		var signAfter = "";

	    		if(ele.attr('data-sign-before'))
	    		{
	    			signBefore = ele.attr('data-sign-before');
	    		}

	    		if(ele.attr('data-sign-after'))
	    		{
	    			signAfter = ele.attr('data-sign-after');
	    		}

	    		var milestoneScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		var counter = {value:eleValue};
		    		var counterTween = TweenMax.to(counter, 4,
		    		{
		    			value: endValue,
		    			roundProps:"value", 
						ease: Circ.easeOut, 
						onUpdate:function()
						{
							document.getElementsByClassName('milestone_counter')[i].innerHTML = signBefore + counter.value + signAfter;
						}
		    		});
		    	})
			    .addTo(ctrl);
	    	});
		}
	}

	/* 

	7. Init Loaders

	*/

	function initLoaders()
	{
		if($('.loader').length)
		{
			var loaders = $('.loader');

			loaders.each(function()
			{
				var loader = this;
				var endValue = $(loader).data('perc');

				var loaderScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		var bar = new ProgressBar.Circle(loader,
					{
						color: '#ffa37b',
						// This has to be the same size as the maximum width to
						// prevent clipping
						strokeWidth: 2.5,
						trailWidth: 0,
						trailColor: 'transparent',
						easing: 'easeInOut',
						duration: 1400,
						text:
						{
							autoStyleContainer: false
						},
						from:{ color: '#ffa37b', width: 2.5 },
						to: { color: '#ffa37b', width: 2.5 },
						// Set default step function for all animate calls
						step: function(state, circle)
						{
							circle.path.setAttribute('stroke', state.color);
							circle.path.setAttribute('stroke-width', state.width);

							var value = Math.round(circle.value() * 100);

							if (value === 0)
							{
								circle.setText('0%');
							}
							else
							{
								circle.setText(value + "%");
							}
						}
					});


					bar.animate(endValue);  // Number from 0.0 to 1.0
		    	})
			    .addTo(ctrl);
			});
		}
	}

	/* 

	8. Init Testimonials Slider

	*/

	function initTestSlider()
	{
		if($('.test_slider').length)
		{
			var testSlider = $('.test_slider');
			testSlider.owlCarousel(
			{
				items:3,
				autoplay:true,
				loop:true,
				smartSpeed:1200,
				dots:false,
				nav:false,
				margin:30,
				autoplayHoverPause:true,
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