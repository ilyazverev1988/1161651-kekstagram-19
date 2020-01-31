'use strict';
var NUMBER = 25;
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

var getFromArray = function (array) {
  getRandomElement(array);
};

var getComments = function (number) {
  var arrayComments = [];
  for (var i = 0; i < number; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getFromArray(messages),
      name: getFromArray(names)
    };
    arrayComments.push(comment);
  }
  return arrayComments;
};

var getRandomNotRepeat = function (min, max) {
  var totalNumbers = max - min + 1;
  var arrayTotalNumbers = [];
  var arrayRandomNumbers = [];
  var tempRandomNumber;

  while (totalNumbers--) {
    arrayTotalNumbers.push(totalNumbers + min);
  }

  while (arrayTotalNumbers.length) {
    tempRandomNumber = Math.round(
        Math.random() * (arrayTotalNumbers.length - 1)
    );
    arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
    arrayTotalNumbers.splice(tempRandomNumber, 1);
  }

  return arrayRandomNumbers;
};

var getTestData = function (number) {
  var arrayUsers = [];
  var arrayRandomNumbers = getRandomNotRepeat(1, number);
  arrayRandomNumbers.forEach(function (random) {
    for (var i = 0; i < number; i++) {
      var elementDataComment = {
        url: 'photos/' + random + '.jpg',
        description: 'строка — описание фотографии',
        likes: getRandomNumber(15, 200),
        comments: getComments(getRandomNumber(1, 3))
      };
    }
    arrayUsers.push(elementDataComment);
  });
  return arrayUsers;
};

var testData = getTestData(NUMBER);
var createComment = function (object) {
  var pictureTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture');
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = object.url;
  pictureElement.querySelector('.picture__likes').textContent = object.likes;
  pictureElement.querySelector('.picture__comments').textContent =
    object.comments.length;
  return pictureElement;
};

var fragment = document.createDocumentFragment();
testData.forEach(function (data) {
  fragment.appendChild(createComment(data));
});

picture.appendChild(fragment);
