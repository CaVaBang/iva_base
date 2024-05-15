/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Home Slider
5. Init Date Picker
6. Init SVG
7. Init Gallery
8. Init Testimonials Slider
9. Init Booking Slider
10. Init Blog Slider


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');

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
	initHomeSlider();
	initDatePicker();
	initSvg();
	initGallery();
	initTestSlider();
	initBookingSlider();
	initBlogSlider();

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

	4. Init Home Slider

	*/

	function initHomeSlider()
	{
		if($('.home_slider').length)
		{
			var homeSlider = $('.home_slider');
			homeSlider.owlCarousel(
			{
				items:1,
				autoplay:false,
				loop:false,
				nav:false,
				smartSpeed:1200,
				mouseDrag:false
			});

			/* Custom dots events */
			if($('.home_slider_custom_dot').length)
			{
				$('.home_slider_custom_dot').on('click', function()
				{
					$('.home_slider_custom_dot').removeClass('active');
					$(this).addClass('active');
					homeSlider.trigger('to.owl.carousel', [$(this).index(), 1200]);
				});
			}

			/* Change active class for dots when slide changes by nav or touch */
			homeSlider.on('changed.owl.carousel', function(event)
			{
				$('.home_slider_custom_dot').removeClass('active');
				$('.home_slider_custom_dots li').eq(event.page.index).addClass('active');
			});
		}
	}

	/*

	5. Init Date Picker

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

	6. Init SVG

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
				nav:true,
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

	/* 

	9. Init Booking Slider

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
				nav:true,
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

	/* 

	10. Init Blog Slider

	*/

	function initBlogSlider()
	{
		if($('.blog_slider').length)
		{
			var blogSlider = $('.blog_slider');
			blogSlider.owlCarousel(
			{
				items:3,
				autoplay:true,
				loop:true,
				smartSpeed:1200,
				dots:false,
				nav:true,
				margin:2,
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
    var bookingIn = document.querySelector(".booking_in");
    var bookingOut = document.querySelector(".booking_out");
    var bookingGuests = document.querySelector(".booking_input_b");
    var errorMessages = document.getElementById("errorMessages");

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





// Функция для проверки стиля элемента и блокировки/разблокировки прокрутки
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
