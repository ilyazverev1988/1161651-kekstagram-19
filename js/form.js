'use strict';
(function () {
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector(
      '.img-upload__overlay'
  );
  var uploadCancel = imgUploadOverlay.querySelector(
      '#upload-cancel'
  );

  var textHashtag = document.querySelector('.text__hashtags');
  var imageUploadPreview = window.effect.imageUploadPreview;

  var onPopupEscPress = function (evt) {
    if (evt.key === window.preview .ESC_KEY) {
      closePopup();
    }
  };

  // функция закрытие формы
  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    uploadFile.value = '';
    window.size.controlValue.setAttribute('value', '100%');
    window.size.controlValue.value = '100%';
    imageUploadPreview.style.transform = '';
    imageUploadPreview.style.filter = '';
    imageUploadPreview.className = '';
    window.effect.setDefaultEffects();
  };

  // функция закрытия формы при нажатии на крестик
  uploadCancel.addEventListener('click', function () {
    closePopup();
  });

  // открытие формы на изменение картинки
  uploadFile.addEventListener('change', function () {
    document.addEventListener('keydown', closePopup);
    window.effect.slider.classList.add('hidden');
    imgUploadOverlay.classList.remove('hidden');
  });

  // не закрывает окно редактирование картинки, когда в фокусе строка тега
  textHashtag.addEventListener('focus', function () {
    document.removeEventListener('keydown', closePopup);
  });

  // возвращает обработчик, когда с тега исчезает фокус
  textHashtag.addEventListener('blur', function () {
    document.addEventListener('keydown', closePopup);
  });

  // не закрывает окно редактирование картинки, когда в фокусе строка комментариев
  window.validation.textComment.addEventListener('focus', function () {
    document.removeEventListener('keydown', closePopup);
  });

  // возвращает обработчик, когда со строки комментариев исчезает фокус
  window.validation.textComment.addEventListener('blur', function () {
    document.addEventListener('keydown', closePopup);
  });

  // функция отправки формы
  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.server.upload(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  });

  // отрисовка в случае успешной выгрузки
  var onSuccess = function () {
    imgUploadOverlay.classList.add('hidden');
    closePopup();

    // вывод сообщения
    var successTemplate = document
      .querySelector('#success')
      .content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    var successButton = document.querySelector('.success__button');

    window.gallery.main.appendChild(success);

    // закрытия сообщения
    // по ESC
    var onScreenEscPress = function (evt) {
      if (evt.key === window.preview.ESC_KEY) {
        window.gallery.main.removeChild(success);
      }
    };

    var onSuccessMessageClick = function () {
      window.gallery.main.removeChild(success);
      document.removeEventListener('keydown', onScreenEscPress);
      window.gallery.main.removeEventListener('click', onSuccessMessageClick);
      successButton.removeEventListener('click', onSuccessMessageClick);
    };

    document.addEventListener('keydown', onScreenEscPress);
    window.gallery.main.addEventListener('click', onSuccessMessageClick);
    successButton.addEventListener('click', onSuccessMessageClick);
  };

  // отрисовка сообщения в случае ошибки
  var onError = function () {
    var errorTemplate = document
      .querySelector('#error')
      .content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);

    // error.querySelector('.error__title').textContent = message;
    // error.querySelector('.error__button').style.display = 'none';
    window.gallery.main.appendChild(error);
  };

})();
