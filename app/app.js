// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('./assets/templates/layouts/index.html');
  require('./assets/templates/layouts/admin-step1.html');
  require('./assets/templates/layouts/admin-step1__logged-in.html');
  require('./assets/templates/layouts/admin-step1__sidebar-sm.html');
  require('./assets/templates/layouts/admin-step2__logged-in.html');
  require('./assets/templates/layouts/admin-step3.html');
  require('./assets/templates/layouts/admin-step4.html');
  require('./assets/templates/layouts/admin-step5.html');
  require('./assets/templates/layouts/admin-step6.html');
  require('./assets/templates/layouts/profile-settings.html');
  require('./assets/templates/layouts/my-files.html');
  require('./assets/templates/layouts/orders-history.html');
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

  // upload & multiupload

  $(document).delegate('#upload-file', 'change', function() {
    var file = $('#upload-file')[0].files;
    for (var i = 0; i < file.length; i++) {
      $('#upload-preview').html('<div class="file"><span>' + file[i].name + '</span>\n' +
          '                  <i class="delete-file">\n' +
          '                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
          '                      <path d="M5.99945 7.19342C4.57713 8.6194 3.21463 9.98556 1.85091 11.3529C1.7215 11.4824 1.59819 11.6191 1.46023 11.7387C1.06711 12.0794 0.582422 12.0842 0.252786 11.7571C-0.0780719 11.4299 -0.0915015 10.9317 0.261332 10.552C0.68986 10.0906 1.14769 9.65593 1.59331 9.20908C2.64204 8.16035 3.692 7.11162 4.78956 6.01527C4.6223 5.83824 4.47824 5.67953 4.32807 5.52814C3.03516 4.23279 1.73981 2.93866 0.446905 1.64209C-0.0622005 1.13176 -0.133011 0.648296 0.234473 0.261278C0.617828 -0.144053 1.12327 -0.0769047 1.65924 0.456619C2.95581 1.74953 4.24872 3.04488 5.54285 4.33901C5.68447 4.48063 5.83341 4.61615 6.0141 4.78951C7.35707 3.4441 8.67806 2.12189 9.99782 0.798464C10.1553 0.63975 10.3091 0.477373 10.474 0.324764C10.9135 -0.0842299 11.4226 -0.106206 11.7693 0.26372C12.099 0.615333 12.0782 1.10735 11.679 1.5139C10.7242 2.48572 9.75975 3.44899 8.79038 4.40738C8.27028 4.92014 7.73188 5.4146 7.10313 6.01039C7.69647 6.56467 8.22511 7.03592 8.72933 7.53282C9.70115 8.48877 10.662 9.45448 11.6204 10.4239C12.0819 10.8902 12.1209 11.3969 11.7461 11.7619C11.3738 12.1245 10.8781 12.0757 10.408 11.6069C8.95275 10.1565 7.50601 8.7012 5.99945 7.19342Z"\n' +
          '                          fill="#FE9192" />\n' +
          '                    </svg>\n' +
          '                  </i>\n' +
          '                </div>');
    }
  });

  $(document).delegate('#upload-files', 'change', function() {
    var files = $('#upload-files')[0].files;
    for (var i = 0; i < files.length; i++) {
      $('#upload-prev').append('<div class="file"><span>' + files[i].name + '</span>\n' +
          '                  <i class="delete-file">\n' +
          '                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
          '                      <path d="M5.99945 7.19342C4.57713 8.6194 3.21463 9.98556 1.85091 11.3529C1.7215 11.4824 1.59819 11.6191 1.46023 11.7387C1.06711 12.0794 0.582422 12.0842 0.252786 11.7571C-0.0780719 11.4299 -0.0915015 10.9317 0.261332 10.552C0.68986 10.0906 1.14769 9.65593 1.59331 9.20908C2.64204 8.16035 3.692 7.11162 4.78956 6.01527C4.6223 5.83824 4.47824 5.67953 4.32807 5.52814C3.03516 4.23279 1.73981 2.93866 0.446905 1.64209C-0.0622005 1.13176 -0.133011 0.648296 0.234473 0.261278C0.617828 -0.144053 1.12327 -0.0769047 1.65924 0.456619C2.95581 1.74953 4.24872 3.04488 5.54285 4.33901C5.68447 4.48063 5.83341 4.61615 6.0141 4.78951C7.35707 3.4441 8.67806 2.12189 9.99782 0.798464C10.1553 0.63975 10.3091 0.477373 10.474 0.324764C10.9135 -0.0842299 11.4226 -0.106206 11.7693 0.26372C12.099 0.615333 12.0782 1.10735 11.679 1.5139C10.7242 2.48572 9.75975 3.44899 8.79038 4.40738C8.27028 4.92014 7.73188 5.4146 7.10313 6.01039C7.69647 6.56467 8.22511 7.03592 8.72933 7.53282C9.70115 8.48877 10.662 9.45448 11.6204 10.4239C12.0819 10.8902 12.1209 11.3969 11.7461 11.7619C11.3738 12.1245 10.8781 12.0757 10.408 11.6069C8.95275 10.1565 7.50601 8.7012 5.99945 7.19342Z"\n' +
          '                          fill="#FE9192" />\n' +
          '                    </svg>\n' +
          '                  </i>\n' +
          '                </div>');
    }
  });

  $(document).delegate('.delete-file', 'click', function() {
    $(this).closest('.file').remove();
    $(this).remove();
  });

    // card masks

  $('#credit_card').mask('9999 9999 9999 9999', {autoclear: false});
  $('#expiration_date').mask('99/99');
  $('#cvv').mask('999');

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
          required: 'Required',
        },
        password: {
          required: 'Required',
        },
        new_password: {
          required: 'Enter a new password',
        },
        re_password: {
          required: 'Submit password',
          equalTo: 'Passwords do not match'
        }
      },
        submitHandler: function() {
            if ($('#payment-form').length) {
                $.ajax({
                    data: $('#payment-form').serialize(),
                    success: function(data)
                    {
                        $.magnificPopup.open({
                            items: {
                                src: '#thank-you'
                            }
                        });
                    }
                });
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
