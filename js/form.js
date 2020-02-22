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
  var form = document.querySelector('.img-upload__form');

  var onPopupEscPress = function (evt) {
    if (evt.key === window.preview.ESC_KEY) {
      imgUploadOverlay.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      setDefaultValueForm();
    }
  };

  var setDefaultValueForm = function () {
    uploadFile.value = '';
    window.size.controlValue.setAttribute('value', '100%');
    window.size.controlValue.value = '100%';
    imageUploadPreview.style.transform = '';
    imageUploadPreview.style.filter = '';
    imageUploadPreview.className = '';
    window.validation.setDefaultTagComment();
    window.effect.setDefaultEffects();
  };

  // функция закрытие формы
  var onPopupClose = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setDefaultValueForm();
  };

  // функция закрытия формы при нажатии на крестик
  uploadCancel.addEventListener('click', onPopupClose);

  // открытие формы на изменение картинки
  uploadFile.addEventListener('change', function () {
    document.addEventListener('keydown', onPopupEscPress);
    window.effect.slider.classList.add('hidden');
    imgUploadOverlay.classList.remove('hidden');
  });

  // не закрывает окно редактирование картинки, когда в фокусе строка тега
  textHashtag.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  // возвращает обработчик, когда с тега исчезает фокус
  textHashtag.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  // не закрывает окно редактирование картинки, когда в фокусе строка комментариев
  window.validation.textComment.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  }
  );

  // возвращает обработчик, когда со строки комментариев исчезает фокус
  window.validation.textComment.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  }
  );

  // функция отправки формы

  form.addEventListener('submit', function (evt) {
    window.server.upload(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  });

  // отрисовка в случае успешной выгрузки
  var onSuccess = function () {
    imgUploadOverlay.classList.add('hidden');
    onPopupClose();

    // вывод сообщения
    var successTemplate = document
                   .querySelector('#success')
                   .content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    window.gallery.main.appendChild(success);
    var successButton = document.querySelector('.success__button');

    // закрытия сообщения
    // по ESC
    var onSuccessMessageEscPress = function (evt) {
      if (evt.key === window.preview.ESC_KEY) {
        setDefaultValueForm();
        window.gallery.main.removeChild(success);
        document.removeEventListener('keydown', onSuccessMessageEscPress);
        window.gallery.main.removeEventListener('click', onSuccessMessageClick);
        successButton.removeEventListener('click', onSuccessMessageClick);
      }
    };

    var onSuccessMessageClick = function () {
      setDefaultValueForm();
      window.gallery.main.removeChild(success);
      document.removeEventListener('keydown', onSuccessMessageEscPress);
      window.gallery.main.removeEventListener('click', onSuccessMessageClick);
      successButton.removeEventListener('click', onSuccessMessageClick);
    };

    document.addEventListener('keydown', onSuccessMessageEscPress);
    window.gallery.main.addEventListener('click', onSuccessMessageClick);
    successButton.addEventListener('click', onSuccessMessageClick);
  };

  // отрисовка сообщения в случае ошибки
  var onError = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);

    var renderBlockError = function () {
      error.querySelector('.error__title').textContent = message;
      window.gallery.main.appendChild(error);
    };
    onPopupClose();
    renderBlockError();
    var errorButton = document.querySelector('.error__button');

    // закрытия сообщения
    // по ESC
    var onErrorMessageEscPress = function (evt) {
      if (evt.key === window.preview.ESC_KEY) {
        window.gallery.main.removeChild(error);
        document.removeEventListener('keydown', onErrorMessageEscPress);
        window.gallery.main.removeEventListener('click', onErrorMessageClick);
        errorButton.removeEventListener('click', onErrorMessageClick);
      }
    };

    var onErrorMessageClick = function () {
      window.gallery.main.removeChild(error);
      document.removeEventListener('keydown', onErrorMessageEscPress);
      window.gallery.main.removeEventListener('click', onErrorMessageClick);
      errorButton.removeEventListener('click', onErrorMessageClick);
    };

    document.addEventListener('keydown', onErrorMessageEscPress);
    window.gallery.main.addEventListener('click', onErrorMessageClick);
    errorButton.addEventListener('click', onErrorMessageClick);
  };
})();
