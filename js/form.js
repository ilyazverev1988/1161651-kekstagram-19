'use strict';

var ESC_KEY = 'Escape';
var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  uploadFile.value = '';
};

uploadCancel.addEventListener('click', function () {
  closePopup();
});

uploadFile.addEventListener('change', function () {
  document.addEventListener('keydown', onPopupEscPress);
  imgUploadOverlay.classList.remove('hidden');
});

var textHashtag = document.querySelector('.text__hashtags');

// преобразование строки в массив
var onHashtagCheck = function () {
  clearCustomValidity(textHashtag);
  var tags = textHashtag.value;
  var toLowerCaseTags = tags.toLowerCase();
  var spliteTags = toLowerCaseTags.split(' ');
  checkTags(spliteTags);
};

// очистка поля ошибки
var clearCustomValidity = function (object) {
  object.setCustomValidity('');
  object.style.borderColor = '';
};

// установка красной обводки у элемента
var setRedBorder = function (object) {
  object.style.borderColor = 'red';
};

// проверка первого элемента на #
var checkFirstChar = function (tag) {
  var stringTag = tag + '';
  var firstChar = stringTag.charAt(0);
  return firstChar;
};

// проверка на повторяющийся тэг
var checkRepeatTag = function (tags) {
  tags = tags.filter(function (elem, pos, arr) {
    return pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem);
  });
  return tags;
};

// проверка тегов и установка сообщений
var checkTags = function (array) {
  if (array.length > 5) {
    textHashtag.setCustomValidity('Укажите не больше пяти хештегов');
    setRedBorder(textHashtag);
  } else if (checkRepeatTag(array).length !== 0) {
    textHashtag.setCustomValidity('Хештеги не могут повторяться');
    setRedBorder(textHashtag);
  } else if (array.length === 0) {
    clearCustomValidity(textHashtag);
  } else {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === '#' && array[i].length === 1) {
        textHashtag.setCustomValidity(
            'Хештег не может состоять только из решетки'
        );
        setRedBorder(textHashtag);
        break;
      } else if (array[i].lenght > 20) {
        textHashtag.setCustomValidity(
            'Хештег не может быть длиннее 20 символов'
        );
        setRedBorder(textHashtag);
        break;
      } else if (checkFirstChar(array[i]) !== '#' && array[0] !== '') {
        textHashtag.setCustomValidity('Хэш-тег должен начинаться с символа #');
        setRedBorder(textHashtag);
        break;
      } else if (!array[i].match(/^#[0-9a-zа-я]+$/)) {
        textHashtag.setCustomValidity(
            'Строка после # должна состоять из букв и чисел'
        );
        setRedBorder(textHashtag);
      } else {
        clearCustomValidity(textHashtag);
      }
    }
  }
};

textHashtag.addEventListener('input', onHashtagCheck);

// изменение эффекта на картинку
(function () {
  var pinSlaider = document.querySelector('.effect-level__pin');
  var lineSlider = document.querySelector('.effect-level__line');
  var effectLevel = document.querySelector('.effect-level__depth');
  var inputSlaider = document.querySelector(
      '.effect-level__value'
  );
  var imagePreview = document.querySelector(
      '.img-upload__preview'
  );
  var effectList = document.querySelector('.effects__list');
  var slaider = document.querySelector('.effect-level');

  // функция определения эффекта
  var addClassEffect = function (evt) {
    imagePreview.classList = '';
    imagePreview.style.filter = '';
    switch (evt.target.id) {
      case 'effect-none':
        slaider.classList.add('hidden');
        break;
      case 'effect-chrome':
        slaider.classList.remove('hidden');
        imagePreview.classList.add('effects__preview--chrome');
        break;
      case 'effect-sepia':
        slaider.classList.remove('hidden');
        imagePreview.classList.add('effects__preview--sepia');
        break;
      case 'effect-marvin':
        slaider.classList.remove('hidden');
        imagePreview.classList.add('effects__preview--marvin');
        break;
      case 'effect-phobos':
        slaider.classList.remove('hidden');
        imagePreview.classList.add('effects__preview--phobos');
        break;
      case 'effect-heat':
        slaider.classList.remove('hidden');
        imagePreview.classList.add('effects__preview--heat');
        break;
      default:
        slaider.classList.remove('hidden');
    }
  };

  // функция расчета эффекта
  var calculationEffect = function () {
    switch (imagePreview.className) {
      case 'effects__preview--chrome':
        imagePreview.style.filter =
          'grayscale(' + inputSlaider.value / 100 + ')';
        break;
      case 'effects__preview--sepia':
        imagePreview.style.filter = 'sepia(' + inputSlaider.value / 100 + ')';
        break;
      case 'effects__preview--marvin':
        imagePreview.style.filter = 'invert(' + inputSlaider.value + '%)';
        break;
      case 'effects__preview--phobos':
        imagePreview.style.filter =
          'blur(' + (inputSlaider.value / 100) * 3 + 'px)';
        break;
      case 'effects__preview--heat':
        imagePreview.style.filter =
          'brightness(' + (inputSlaider.value / 100) * 3 + ')';
        break;
      default:
        imagePreview.style.filter = '';
    }
  };

  // нажатие на ползунок
  pinSlaider.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var newPosition = pinSlaider.offsetLeft - shift.x;
      if (newPosition > lineSlider.offsetWidth) {
        newPosition = lineSlider.offsetWidth;
      } else if (newPosition < 0) {
        newPosition = 0;
      }
      pinSlaider.style.left = newPosition + 'px';
      effectLevel.style.width = newPosition + 'px';
      inputSlaider.value = Math.round(
          (pinSlaider.offsetLeft / lineSlider.offsetWidth) * 100
      );
      calculationEffect();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  effectList.addEventListener('click', addClassEffect);
})();

// изменение размеров картинки
(function () {
  var controlSmaller = document.querySelector(
      '.scale__control--smaller'
  );
  var controlBigger = document.querySelector(
      '.scale__control--bigger'
  );
  var controlValue = document.querySelector(
      '.scale__control--value'
  );
  var imagePreview = document.querySelector(
      '.img-upload__preview'
  );
  var DEFAULT_VALUE_SIZE = 100;
  var MIN_VALUE = 0;
  var STEP_CHANGE_SIZE = 25;
  var scaleNumber = DEFAULT_VALUE_SIZE;
  controlValue.value = scaleNumber + '%';

  // функция увеличения размера
  var onBiggerClick = function () {
    if (scaleNumber + STEP_CHANGE_SIZE >= DEFAULT_VALUE_SIZE) {
      scaleNumber = DEFAULT_VALUE_SIZE;
    } else {
      scaleNumber += STEP_CHANGE_SIZE;
    }
    controlValue.value = scaleNumber + '%';
    return scaleNumber;
  };
  // функция уменьшения размера
  var onSmallerClick = function () {
    if (scaleNumber - STEP_CHANGE_SIZE <= MIN_VALUE) {
      scaleNumber = MIN_VALUE;
    } else {
      scaleNumber -= STEP_CHANGE_SIZE;
    }
    controlValue.value = scaleNumber + '%';
    return scaleNumber;
  };

  controlBigger.addEventListener('click', function () {
    onBiggerClick();
    imagePreview.style.transform =
                   'scale(' + scaleNumber / 100 + ')';
  });
  controlSmaller.addEventListener('click', function () {
    onSmallerClick();
    imagePreview.style.transform =
                   'scale(' + scaleNumber / 100 + ')';
  });
})();

