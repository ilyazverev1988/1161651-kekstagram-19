'use strict';

(function () {
  // изменение размеров картинки
  var MIN_VALUE = 25;
  var DEFAULT_VALUE_SIZE = 100;
  var controlValue = document.querySelector(
      '.scale__control--value'
  );
  var imageUploadPreview = window.effect.imageUploadPreview;
  var controlSmaller = document.querySelector(
      '.scale__control--smaller'
  );
  var controlBigger = document.querySelector(
      '.scale__control--bigger'
  );
  var imgUploadScale = document.querySelector(
      '.img-upload__scale'
  );
  controlValue.value = 100 + '%';

  // функция выбора кнопки размера и изименения размера
  var onSizeClick = function (evt) {
    var stepChangeSize = 0;
    var currentScale = parseInt(controlValue.value, 10);
    if (
      evt.target === controlBigger &&
                   currentScale < DEFAULT_VALUE_SIZE
    ) {
      stepChangeSize = 25;
    } else if (
      evt.target === controlSmaller &&
                   currentScale > MIN_VALUE
    ) {
      stepChangeSize = -25;
    }
    currentScale = currentScale + stepChangeSize;
    controlValue.value = currentScale + '%';
    imageUploadPreview.style.transform =
                   'scale(' + currentScale / 100 + ')';
  };
  imgUploadScale.addEventListener('click', onSizeClick);

  window.size = {
    controlValue: controlValue
  };
})();
