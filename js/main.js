'use strict';
var NUMBER_OF_PHOTOS = 25;
var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var picture = document.querySelector('.pictures');

var mixData = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

var getRandomElement = function (array) {
  var random = Math.floor(Math.random() * array.length);
  return array[random];
};

var createComments = function (number) {
  var comments = [];
  for (var i = 0; i < number; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getRandomElement(messages),
      name: getRandomElement(names)
    };
    comments.push(comment);
  }
  return comments;
};

var getRandomNotRepeat = function (min, max) {
  var numbers = Array(max - min + 1)
    .fill('')
    .map(function (el, i) {
      return i + min;
    });

  return mixData(numbers);
};

var generateBlock = function (number) {
  var users = [];
  var randomNumbers = getRandomNotRepeat(1, number);
  randomNumbers.forEach(function (random) {
    var elementDataComment = {
      url: 'photos/' + random + '.jpg',
      description: 'строка — описание фотографии',
      likes: getRandomNumber(15, 200),
      comments: createComments(getRandomNumber(1, 3))
    };
    users.push(elementDataComment);
  });
  return users;
};

var createBlockPhotos = function (block) {
  var pictureTemplate = document
      .querySelector('#picture')
      .content.querySelector('.picture');
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = block.url;
  pictureElement.querySelector('.picture__likes').textContent = block.likes;
  pictureElement.querySelector('.picture__comments').textContent =
      block.comments.length;
  return pictureElement;
};

var renderPhotos = function (photos) {
  var fragment = document.createDocumentFragment();
  blocksPhotos.forEach(function (data) {
    fragment.appendChild(photos(data));
  });

  picture.appendChild(fragment);
};

var blocksPhotos = generateBlock(NUMBER_OF_PHOTOS);
renderPhotos(createBlockPhotos);

// ---------
/* var ESC_KEY = 'Escape';
var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');

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

var onPinPressMouse = function (evt) {
  var coordinat = evt.clientX;
  return coordinat;
};

var a = effectLevelPin.addEventListener('mouseup', onPinPressMouse);

var createHashTag = function (object) {
  var tags = object.textContent.split('#');
  return tags;
};

var textHashtags = document.querySelector('.text__hashtags');
  console.log(createHashTag(textHashtags));*/
