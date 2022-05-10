// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('./assets/templates/layouts/index.html');
  require('./assets/templates/layouts/admin-step1.html');
  require('./assets/templates/layouts/admin-step1__logged-in.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Popup = require('_modules/popup');
//var LightGallery = require('_modules/lightgallery');
//var Slider = require('_modules/slider');
require('../node_modules/sumoselect/jquery.sumoselect.min');
//require('../node_modules/ez-plus/src/jquery.ez-plus');
require('../node_modules/sweetalert2/dist/sweetalert2');
require('../node_modules/jquery-validation/dist/jquery.validate.min');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function() {
  new Forms();
  new Popup();
    //new LightGallery();
  //new Slider();

  setTimeout(function() {
    $('body').trigger('scroll');
    $(window).trigger('resize');
  }, 100);

  // select

  $('.select').SumoSelect({
    forceCustomRendering: true
  });

  // header
  var header = $('.header'),
    scrollPrev = 0;

  $(window).scroll(function() {
    var scrolled = $(window).scrollTop();

    if (scrolled > 80 && scrolled) {
      header.addClass('fixed');
    }
    else {
      header.removeClass('fixed');
    }
    scrollPrev = scrolled;
  });

// mobile menu

  var touch = $('.mobile-menu__btn');
  var toggles = document.querySelectorAll('.mobile-menu__btn');

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  }

  function toggleHandler(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.contains('active') === true
                ? this.classList.remove('active')
                : this.classList.add('active');
    });
  }

  $(touch).click(function(e) {
    e.preventDefault();
    $('body').toggleClass('menu-opened');
    return false;
  });

  $(document).click(function() {
    $('body').removeClass('menu-opened');
  });

  $(document).on('click', '.mobile-menu__btn', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.mobile-menu__wrapper', function(e) {
    e.stopPropagation();
  });

    // edit form

  $('.edit-form').on('click', function() {
    $(this).closest('form').addClass('edit').find('.input.first').focus();
  });

  $('.save-form').on('click', function() {
    $(this).closest('form').removeClass('edit');
  });

    // order details

  $('.profile-order__head .order-info').on('click', function() {
    $(this).toggleClass('active').closest('.profile-order').find('.profile-order__body').slideToggle();
  });

    // card masks

  $('#credit_card').mask('9999 9999 9999 9999', {autoclear: false});
  $('#expiration_date').mask('99/99');
  $('#cvv').mask('999');

  $('#credit_card').on('keyup', function() {
    var result = $(this).val();
    $(this).on('blur focusout', function() {
      var card_num = $(this).val();
      $(this).data('value', card_num);
      if (card_num.length) {
        $(this).val($(this).data('value').slice(0, 15).replace(/\d/g, '•') + $(this).data('value').slice(15, 19)).unmask();
      }
    }).focus(function() {
      $(this).val(result).mask('9999 9999 9999 9999', {autoclear: false});
    });
  });

    // remove from cart

  $('.cart-item__del').on('click', function() {
    $(this).closest('.cart-item').remove();
    if ($('.cart-item').length >= 3 && $(window).height() < 900 && $(window).width() > 575) {
      $('.cart-items').css('min-height', 392);
    }
    else if ($('.cart-item').length >= 2 && $(window).height() < 900 && $(window).width() > 575) {
      $('.cart-items').css('min-height', 256);
    }
      else if ($('.cart-item').length >= 1 && $(window).height() < 900 && $(window).width() > 575) {
        $('.cart-items').css('min-height', 136);
      }
    if ($('.cart-item').length < 1) {
      $('.cart-items').removeAttr('style');
      $('.cart-main__total, .cart-buttons').hide();
      $('.page-subtitle').html('Your cart is empty');
    }
  });

  if ($('.cart-item, .cart-review__item').length >= 3 && $(window).height() < 900 && $(window).width() > 575) {
    $('.cart-items, .cart-review__items').css('min-height', 392);
  }
  else if ($('.cart-item, .cart-review__item').length >= 2 && $(window).height() < 900 && $(window).width() > 575) {
    $('.cart-items, .cart-review__items').css('min-height', 256);
  }
    else if ($('.cart-item, .cart-review__item').length >= 1 && $(window).height() < 900 && $(window).width() > 575) {
      $('.cart-items, .cart-review__items').css('min-height', 136);
    }
    else {
      $('.cart-items, .cart-review__items').removeAttr('style');
    }

  $(window).on('resize', function() {
    if ($('.cart-item, .cart-review__item').length >= 3 && $(window).height() < 900 && $(window).width() > 575) {
      $('.cart-items, .cart-review__items').css('min-height', 392);
    }
    else if ($('.cart-item, .cart-review__item').length >= 2 && $(window).height() < 900 && $(window).width() > 575) {
      $('.cart-items, .cart-review__items').css('min-height', 256);
    }
        else if ($('.cart-item, .cart-review__item').length >= 1 && $(window).height() < 900 && $(window).width() > 575) {
          $('.cart-items, .cart-review__items').css('min-height', 136);
        }
        else {
          $('.cart-items, .cart-review__items').removeAttr('style');
        }
  });

    // input value

  $('.input, .textarea').blur(function() {
    if ($(this).val()) {
      $(this).closest('.input-wrapper').addClass('active');
    }
    else {
      $(this).closest('.input-wrapper').removeClass('active');
    }
  });

    // show/hide password

  $('.show-password').click(function() {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active').closest('.input-wrapper').find('.input').attr('type', 'text');
    } else {
      $(this).removeClass('active').closest('.input-wrapper').find('.input').attr('type', 'password');
    }
  });

    // validation

  $('.validate-form').each(function() {
    $(this).validate({
      highlight: function(element) {
        $(element).parent().addClass('error');
      },
      unhighlight: function(element) {
        $(element).parent().removeClass('error');
      },
      rules: {
        email: {
          required: true,
        },
        password: {
          required: true,
        },
        new_password: {
          required: true,
        },
        re_password: {
          required: true,
          equalTo: '#new_password'
        }
      },
      messages: {
        email: {
          required: 'Povinné pole',
        },
        password: {
          required: 'Povinné pole',
        },
        new_password: {
          required: 'Zadejte nové heslo',
        },
        re_password: {
          required: 'Odeslat heslo',
          equalTo: 'Hesla se neshodují'
        }
      }
    });
  });

    // lazy load
  var lazyload = function() {
    var scroll = $(window).scrollTop() + $(window).height() * 3;

    $('.lazy').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('src', $(this).data('original'));
      }
    });
    $('.lazy-web').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('srcset', $(this).data('original'));
      }
    });
  };
  $(window).scroll(lazyload);
});
