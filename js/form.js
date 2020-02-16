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
  imageUploadPreview.style.filter = '';
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
  return tag.charAt(0);
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
  return array.length > 5;
};

// проверка повторов хэштегов
var checkRepeatTags = function (array) {
  return checkRepeatTag(array).length !== 0;
};

// проверка тега на решетку
var checkOnlyGridInTag = function (array) {
  var check = function (tag) {
    return tag === '#' && tag.length === 1;
  };
  return array.some(check);
};

// проверка длины тега больше 20 символов
var checkNumberCharacters = function (array) {
  var check = function (tag) {
    return tag.length > 20;
  };
  return array.some(check);
};

// проверка начала тега с #
var checkGridInStartTag = function (array) {
  var check = function (tag) {
    return checkFirstChar(tag) !== '#' && tag !== '';
  };
  return array.some(check);
};

// проверка содержимого тэга
var checkTagContent = function (array) {
  var check = function (tag) {
    return !tag.match(/^#[0-9a-zа-я]+$/) && tag[0] === '#';
  };
  return array.some(check);
};

// проверка тегов и установка сообщений
var checkTags = function (array) {
  var messageValidity = '';
  if (checkMountTags(array)) {
    messageValidity = 'Укажите не больше пяти хештегов';
    setRedBorder(textHashtag);
  } else if (checkRepeatTags(array)) {
    messageValidity = 'Хештеги не могут повторяться';
    setRedBorder(textHashtag);
  } else if (checkOnlyGridInTag(array)) {
    messageValidity = 'Хештег не может состоять только из решетки';
    setRedBorder(textHashtag);
  } else if (checkTagContent(array)) {
    messageValidity = 'Строка после # должна состоять из букв и чисел';
    setRedBorder(textHashtag);
  } else if (checkNumberCharacters(array)) {
    messageValidity = 'Хештег не может быть длиннее 20 символов';
    setRedBorder(textHashtag);
  } else if (checkGridInStartTag(array)) {
    messageValidity = 'Хэш-тег должен начинаться с символа #';
    setRedBorder(textHashtag);
  } else {
    clearCustomValidity(textHashtag);
  }
  textHashtag.setCustomValidity(messageValidity);
};

textHashtag.addEventListener('input', onHashtagInput);

// функция установки дефолтных значений для эффектов
var setDefaultEffects = function () {
  inputSlider.value = 100;
  pinSlider.style.left = '100%';
  effectLevel.style.width = '100%';
};

var pinSlider = document.querySelector('.effect-level__pin');
var lineSlider = document.querySelector('.effect-level__line');
var effectLevel = document.querySelector('.effect-level__depth');
var inputSlider = document.querySelector('.effect-level__value');
var effectList = document.querySelector('.effects__list');
var slider = document.querySelector('.effect-level');

// функция определения эффекта
var onPreviewImageClick = function (evt) {
  if (evt.target.value === 'none') {
    imageUploadPreview.className = '';
    slider.classList.add('hidden');
  } else {
    imageUploadPreview.className = 'effects__preview--' + evt.target.value;
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
    document.removeEventListener('mousemove', onMouseMove
    );
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

effectList.addEventListener('change', onPreviewImageClick);

// изменение размеров картинки
var MIN_VALUE = 25;
var DEFAULT_VALUE_SIZE = 100;
var controlValue = document.querySelector('.scale__control--value');
var imageUploadPreview = document.querySelector('.img-upload__preview img');
var controlSmaller = document.querySelector(
    '.scale__control--smaller'
);
var controlBigger = document.querySelector(
    '.scale__control--bigger'
);
var imgUploadScale = document.querySelector('.img-upload__scale');
controlValue.value = 100 + '%';

// функция выбора кнопки размера и изименения размера
var onSizeClick = function (evt) {
  var stepChangeSize = 0;
  var currentScale = parseInt(controlValue.value, 10);
  if (evt.target === controlBigger && currentScale < DEFAULT_VALUE_SIZE) {
    stepChangeSize = 25;
  } else if (evt.target === controlSmaller && currentScale > MIN_VALUE) {
    stepChangeSize = -25;
  }
  currentScale = currentScale + stepChangeSize;
  controlValue.value = currentScale + '%';
  imageUploadPreview.style.transform = 'scale(' + currentScale / 100 + ')';
};
imgUploadScale.addEventListener('click', onSizeClick);

// функция валидации комментариев
var textComment = document.querySelector('.text__description');
var onCommentInput = function () {
  if (textComment.value.length > 140) {
    textComment.setCustomValidity(
        'Длина комментария не может составлять больше 140 символов'
    );
    setRedBorder(textComment);
  } else {
    clearCustomValidity(textComment);
  }
};
textComment.addEventListener('input', onCommentInput);

