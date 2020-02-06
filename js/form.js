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

// ползунок
var pinSlaider = document.querySelector('.effect-level__pin');
var lineSlider = document.querySelector('.effect-level__line');
var inputSlaider = document.querySelector('.effect-level__value');

pinSlaider.addEventListener('mouseup', function () {
  inputSlaider.value = (pinSlaider.offsetLeft / lineSlider.offsetWidth) * 100;
});
