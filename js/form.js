'use strict';

var ESC_KEY = 'Escape';
var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

var textHashtag = document.querySelector('.text__hashtags');
var textDescription = document.querySelector('.text__description');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

// функция закрытие формы
var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  uploadFile.value = '';
};

// функция закрытия формы при нажатии на крестик или ESC
uploadCancel.addEventListener('click', function () {
  closePopup();
  controlValue.value = 100;
  imageUploadPreview.style.transform = 'scale(' + 1 + ')';
  imagePreview.classList.remove('effects__preview' + classEffect + '');
  setDefaultEffects();
});

// открытие формы на изменение картинки
uploadFile.addEventListener('change', function () {
  document.addEventListener('keydown', onPopupEscPress);
  slider.classList.add('hidden');
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
textDescription.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

// возвращает обработчик, когда со строки комментариев исчезает фокус
textDescription.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

// преобразование строки в массив
var onHashtagInput = function () {
  var tags = textHashtag.value;
  var toLowerCaseTags = tags.toLowerCase();
  var transformedTags = toLowerCaseTags.split(' ');
  checkTags(transformedTags);
};

// очистка поля ошибки
var clearCustomValidity = function (message) {
  message.setCustomValidity('');
  message.style.borderColor = '';
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

// проверка количества хэштэгов
var checkMountTags = function (array) {
  if (array.length > 5) {
    messageValidity = 'Укажите не больше пяти хештегов';
  }
  setRedBorder(textHashtag);
  return messageValidity;
};

// проверка повторов хэштегов
var checkRepeatTags = function (array) {
  if (checkRepeatTag(array).length !== 0) {
    messageValidity = 'Хештеги не могут повторяться';
  }
  setRedBorder(textHashtag);
  return messageValidity;
};

// проверка тега на решетку
var checkOnlyGridInTag = function (tag) {
  if (tag === '#' && tag.length === 1) {
    messageValidity = 'Хештег не может состоять только из решетки';
  }
  setRedBorder(textHashtag);
  return messageValidity;
};

// проверка длины тега больше 20 символов
var checkNumberCharacters20 = function (tag) {
  if (tag.length > 20) {
    var messageValidity = 'Хештег не может быть длиннее 20 символов';
  }
  setRedBorder(textHashtag);
  return messageValidity;
};

// проверка начала тега с #
var checkGridInStartTag = function (tag) {
  if (checkFirstChar(tag) !== '#' && tag !== '') {
    messageValidity = 'Хэш-тег должен начинаться с символа #';
  }
  setRedBorder(textHashtag);
  return messageValidity;
};

// проверка содержимого тэга
var checkTagContent = function (tag) {
  if (!tag.match(/^#[0-9a-zа-я]+$/) && tag[0] === '#') {
    messageValidity = 'Строка после # должна состоять из букв и чисел';
  }
  setRedBorder(textHashtag);
  return messageValidity;
};

// проверка массива на пустоту
var checkLengthTags = function (array) {
  if (array.length === 0) {
    clearCustomValidity(textHashtag);
  }
};
var messageValidity = '';

// проверка тегов и установка сообщений
var checkTags = function (array) {
  messageValidity = '';

  checkLengthTags(array);
  checkMountTags(array);
  checkRepeatTags(array);
  array.forEach(function (tag) {
    checkOnlyGridInTag(tag);
    checkTagContent(tag);
    checkNumberCharacters20(tag);
    checkGridInStartTag(tag);
  });

  if (messageValidity === '') {
    textHashtag.style.borderColor = '';
  }
  textHashtag.setCustomValidity(messageValidity);
};

textHashtag.addEventListener('input', onHashtagInput);

// функция установки дефолтных значений для эффектов
var setDefaultEffects = function () {
  inputSlider.value = 100;
  pinSlider.style.left = lineSlider.offsetWidth + 'px';
  effectLevel.style.width = lineSlider.offsetWidth + 'px';
};

var pinSlider = document.querySelector('.effect-level__pin');
var lineSlider = document.querySelector('.effect-level__line');
var effectLevel = document.querySelector('.effect-level__depth');
var inputSlider = document.querySelector('.effect-level__value');
var imagePreview = document.querySelector('.img-upload__preview');
var effectList = document.querySelector('.effects__list');
var slider = document.querySelector('.effect-level');
var classEffect;

// изменение эффекта на картинку
var changeEffect = function () {
  // функция определения эффекта
  var onClickPreviewImage = function (evt) {
    imagePreview.classList = '';
    imagePreview.style.filter = '';
    classEffect = '';
    switch (evt.target.id) {
      case 'effect-none':
        slider.classList.add('hidden');
        classEffect = '--none';
        break;
      case 'effect-chrome':
        slider.classList.remove('hidden');
        classEffect = '--chrome';
        break;
      case 'effect-sepia':
        slider.classList.remove('hidden');
        classEffect = '--sepia';
        break;
      case 'effect-marvin':
        slider.classList.remove('hidden');
        classEffect = '--marvin';
        break;
      case 'effect-phobos':
        slider.classList.remove('hidden');
        classEffect = '--phobos';
        break;
      case 'effect-heat':
        slider.classList.remove('hidden');
        classEffect = '--heat';
        break;
      default:
        slider.classList.remove('hidden');
    }
    imagePreview.classList.add('effects__preview' + classEffect + '');
    setDefaultEffects();
  };

  // функция расчета эффектов
  var calculationEffect = function () {
    switch (imagePreview.className) {
      case 'effects__preview--chrome':
        imagePreview.style.filter =
          'grayscale(' + inputSlider.value / 100 + ')';
        break;
      case 'effects__preview--sepia':
        imagePreview.style.filter = 'sepia(' + inputSlider.value / 100 + ')';
        break;
      case 'effects__preview--marvin':
        imagePreview.style.filter = 'invert(' + inputSlider.value + '%)';
        break;
      case 'effects__preview--phobos':
        imagePreview.style.filter =
          'blur(' + inputSlider.value / 100 * 3 + 'px)';
        break;
      case 'effects__preview--heat':
        imagePreview.style.filter =
          'brightness(' + (inputSlider.value / 100 * 2 + 1) + ')';
        break;
      default:
        imagePreview.style.filter = '';
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

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var newPosition = pinSlider.offsetLeft - shift.x;
      if (newPosition > lineSlider.offsetWidth) {
        newPosition = lineSlider.offsetWidth;
      } else if (newPosition < 0) {
        newPosition = 0;
      }
      pinSlider.style.left = newPosition + 'px';
      effectLevel.style.width = newPosition + 'px';
      inputSlider.value = +Math.round(
          pinSlider.offsetLeft / lineSlider.offsetWidth * 100
      );
      calculationEffect();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  effectList.addEventListener('click', onClickPreviewImage);
};
changeEffect();

// изменение размеров картинки
var controlValue = document.querySelector('.scale__control--value');
var imageUploadPreview = document.querySelector('.img-upload__preview');
var changeSize = function () {

  var controlSmaller = document.querySelector(
      '.scale__control--smaller'
  );
  var controlBigger = document.querySelector(
      '.scale__control--bigger'
  );
  var MIN_VALUE = 0;
  var STEP_CHANGE_SIZE = 25;
  var DEFAULT_VALUE_SIZE = 100;
  var scaleNumber = DEFAULT_VALUE_SIZE;
  controlValue.value = scaleNumber + '%';
  // общая функция изменения размер
  var onButtonSizeClick = function (evt) {
    // функция увеличения размера
    var changeSizeBigger = function () {
      if (
        scaleNumber + STEP_CHANGE_SIZE >= DEFAULT_VALUE_SIZE
      ) {
        scaleNumber = DEFAULT_VALUE_SIZE;
      } else {
        scaleNumber += STEP_CHANGE_SIZE;
      }
      controlValue.value = scaleNumber + '%';
      imageUploadPreview.style.transform = 'scale(' + scaleNumber / 100 + ')';
    };
    // функция уменьшения размера
    var changeSizeSmaller = function () {
      if (scaleNumber - STEP_CHANGE_SIZE <= MIN_VALUE) {
        scaleNumber = MIN_VALUE;
      } else {
        scaleNumber -= STEP_CHANGE_SIZE;
      }
      controlValue.value = scaleNumber + '%';
      imageUploadPreview.style.transform = 'scale(' + scaleNumber / 100 + ')';
    };

    if (evt.target === controlBigger) {
      changeSizeBigger();
    } else {
      changeSizeSmaller();
    }
  };

  controlBigger.addEventListener('click', onButtonSizeClick);
  controlSmaller.addEventListener('click', onButtonSizeClick);

};
changeSize();
