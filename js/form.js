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
  controlValue.setAttribute('value', '100%');
  imageUploadPreview.style.transform = '';
  imageUploadPreview.className = '';
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
  var stringTag = tag;
  return stringTag.charAt(0);
};

// проверка на повторяющийся тэг
var checkRepeatTag = function (tags) {
  tags = tags.filter(function (elem, pos, arr) {
    return pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem);
  });
  return tags;
};

var messageValidity = '';
// проверка тегов и установка сообщений
var checkTags = function (array) {
  messageValidity = '';
  if (array.length > 5) {
    messageValidity = 'Укажите не больше пяти хештегов';
    setRedBorder(textHashtag);
  } else if (checkRepeatTag(array).length !== 0) {
    messageValidity = 'Хештеги не могут повторяться';
    setRedBorder(textHashtag);
  } else if (array.length === 0) {
    clearCustomValidity(textHashtag);
  } else {
    array.forEach(function (tag) {
      if (tag === '#' && tag.length === 1) {
        messageValidity = 'Хештег не может состоять только из решетки';
        setRedBorder(textHashtag);
      } else if (!tag.match(/^#[0-9a-zа-я]+$/) && tag[0] === '#') {
        messageValidity = 'Строка после # должна состоять из букв и чисел';
        setRedBorder(textHashtag);
      } else if (tag.length > 20) {
        messageValidity = 'Хештег не может быть длиннее 20 символов';
        setRedBorder(textHashtag);
      } else if (checkFirstChar(tag) !== '#' && tag !== '') {
        messageValidity = 'Хэш-тег должен начинаться с символа #';
        setRedBorder(textHashtag);
      } else {
        clearCustomValidity(textHashtag);
      }
    });
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
var effectList = document.querySelector('.effects__list');
var slider = document.querySelector('.effect-level');

// функция определения эффекта
var onClickPreviewImage = function (evt) {
  imageUploadPreview.classList = '';
  if (evt.target.value === 'none') {
    imageUploadPreview.className = '';
    slider.classList.add('hidden');
  } else {
    imageUploadPreview.classList.add(
        'effects__preview--' + evt.target.value + ''
    );
    slider.classList.remove('hidden');
  }
  setDefaultEffects();
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
      imageUploadPreview.style.filter = 'invert(' + inputSlider.value + '%)';
      break;
    case 'effects__preview--phobos':
      imageUploadPreview.style.filter =
          'blur(' + (inputSlider.value / 100) * 3 + 'px)';
      break;
    case 'effects__preview--heat':
      imageUploadPreview.style.filter =
          'brightness(' + ((inputSlider.value / 100) * 2 + 1) + ')';
      break;
    default:
      imageUploadPreview.style.filter = '';
  }
};

// нажатие на ползунок
pinSlider.addEventListener('mouseup', function (evt) {
  //  pinSlider.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX
  };

  /* var onMouseMove = function (
        moveEvt
    ) {
      moveEvt.preventDefault();

      var shift = {x: startCoords.x - moveEvt.clientX};

      startCoords = {x: moveEvt.clientX}; */

  var newPosition = pinSlider.offsetLeft - startCoords.x; //  var newPosition = pinSlider.offsetLeft - shift.x;
  if (
    newPosition > lineSlider.offsetWidth
  ) {
    newPosition = lineSlider.offsetWidth;
  } else if (
    newPosition < 0
  ) {
    newPosition = 0;
  }
  pinSlider.style.left = 100 + '%'; /* pinSlider.style.left = newPosition + 'px';*/
  effectLevel.style.width = 100 + '%'; /* effectLevel.style.width = newPosition + 'px';*/
  inputSlider.value = Math.round(
      (pinSlider.offsetLeft / lineSlider.offsetWidth) * 100
  );
  setValueOfEffect();

  /* var onMouseUp = function () {
      document.removeEventListener(
          'mousemove',
          onMouseMove
      );
      document.removeEventListener(
          'mouseup',
          onMouseUp
      );
    };

    document.addEventListener(
        'mousemove',
        onMouseMove
    );
    document.addEventListener(
        'mouseup',
        onMouseUp
    );*/
});

effectList.addEventListener('change', onClickPreviewImage);

// изменение размеров картинки
var controlValue = document.querySelector('.scale__control--value');
var imageUploadPreview = document.querySelector('.img-upload__preview img');

var changeSize = function () {
  var MIN_VALUE = 25;
  var STEP_CHANGE_SIZE = 25;
  var DEFAULT_VALUE_SIZE = 100;
  var scaleNumber = DEFAULT_VALUE_SIZE;
  var controlSmaller = document.querySelector(
      '.scale__control--smaller'
  );
  var controlBigger = document.querySelector(
      '.scale__control--bigger'
  );
  controlValue.value = scaleNumber + '%';

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

  // функция выбора кнопки размера
  var setSize = function (evt) {
    if (evt.target === controlBigger) {
      changeSizeBigger();
    } else if (evt.target === controlSmaller) {
      changeSizeSmaller();
    } else if (evt.target === uploadCancel) {
      scaleNumber = 100;
    }
  };

  imgUploadOverlay.addEventListener('click', setSize);
};
changeSize();

// функция валидации комментариев
var textComment = document.querySelector('.text__description');
var commentValidate = function () {
  if (textComment.value.length > 140) {
    textComment.setCustomValidity(
        'Длина комментария не может составлять больше 140 символов'
    );
    setRedBorder(textComment);
  } else {
    clearCustomValidity(textComment);
  }
};
textComment.addEventListener('input', commentValidate);

