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
})();
