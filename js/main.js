'use strict';
var NUMBER_OF_PHOTO = 25;
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

  var mixNumbers = function (array) {
    return array.sort(function () {
      return 0.5 - Math.random();
    });
  };
  return mixNumbers(numbers);
};

var generatePicture = function (number) {
  var users = [];
  var randomNumber = getRandomNotRepeat(1, number);
  randomNumber.forEach(function (random) {
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

var photoCreate = generatePicture(NUMBER_OF_PHOTO);
var createBlock = function (block) {
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

var showPhoto = function () {
  var fragment = document.createDocumentFragment();
  photoCreate.forEach(function (data) {
    fragment.appendChild(createBlock(data));
  });

  picture.appendChild(fragment);
};

showPhoto();
