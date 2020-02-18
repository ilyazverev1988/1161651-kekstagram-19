'use strict';

(function () {

  var pinSlider = document.querySelector('.effect-level__pin');
  var lineSlider = document.querySelector('.effect-level__line');
  var effectLevel = document.querySelector('.effect-level__depth');
  var inputSlider = document.querySelector('.effect-level__value');
  var effectList = document.querySelector('.effects__list');
  var slider = document.querySelector('.effect-level');
  var imageUploadPreview = document.querySelector('.img-upload__preview img');

  // функция установки дефолтных значений для эффектов
  var setDefaultEffects = function () {
    inputSlider.value = 100;
    pinSlider.style.left = '100%';
    effectLevel.style.width = '100%';
  };

  // функция определения эффекта
  var onPreviewImageClick = function (evt) {
    if (evt.target.value === 'none') {
      imageUploadPreview.className = '';
      slider.classList.add('hidden');
    } else {
      imageUploadPreview.className =
                     'effects__preview--' + evt.target.value;
      slider.classList.remove('hidden');
    }
    setDefaultEffects();
    setValueOfEffect();
  };

  // функция расчета эффектов
  var setValueOfEffect = function () {
    switch (imageUploadPreview.className) {
      case 'effects__preview--chrome':
        imageUploadPreview.style.filter =
                       'grayscale(' + inputSlider.value / 100 + ')';
        break;
      case 'effects__preview--sepia':
        imageUploadPreview.style.filter =
                       'sepia(' + inputSlider.value / 100 + ')';
        break;
      case 'effects__preview--marvin':
        imageUploadPreview.style.filter =
                       'invert(' + inputSlider.value + '%)';
        break;
      case 'effects__preview--phobos':
        imageUploadPreview.style.filter =
                       'blur(' + (inputSlider.value / 100) * 3 + 'px)';
        break;
      case 'effects__preview--heat':
        imageUploadPreview.style.filter =
                       'brightness(' +
                       ((inputSlider.value / 100) * 2 + 1) +
                       ')';
        break;
      default:
        imageUploadPreview.style.filter = '';
    }
  };

  // нажатие на ползунок
  pinSlider.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {x: startCoords.x - moveEvt.clientX};
      startCoords = {x: moveEvt.clientX};

      var newPosition = pinSlider.offsetLeft - shift.x;
      if (newPosition > lineSlider.offsetWidth) {
        newPosition = lineSlider.offsetWidth;
      } else if (newPosition < 0) {
        newPosition = 0;
      }
      pinSlider.style.left = newPosition + 'px';
      effectLevel.style.width = newPosition + 'px';
      inputSlider.value = Math.round(
          (pinSlider.offsetLeft / lineSlider.offsetWidth) * 100
      );
      setValueOfEffect();
    };
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  effectList.addEventListener('change', onPreviewImageClick);

  window.effect = {
    imageUploadPreview: imageUploadPreview,
    setDefaultEffects: setDefaultEffects,
    slider: slider
  };
})();
