'use strict';
(function () {
  var textHashtag = document.querySelector('.text__hashtags');

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
      return (
        pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem)
      );
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
      messageValidity =
                     'Хештег не может состоять только из решетки';
      setRedBorder(textHashtag);
    } else if (checkTagContent(array)) {
      messageValidity =
                     'Строка после # должна состоять из букв и чисел';
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

  textHashtag.addEventListener('input', onHashtagInput);


  window.validation = {
    textComment: textComment
  };
})();
