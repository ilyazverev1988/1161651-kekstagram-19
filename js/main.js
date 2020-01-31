'use strict';
var countDescribe = 25;

var getRandom = function (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

var getMessageFunction = function () {
  var messageMassive = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var randomMessage = Math.floor(Math.random() * messageMassive.length);
  return messageMassive[randomMessage];
};

var getNameFunction = function () {
  var nameMassive = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var randomName = Math.floor(Math.random() * nameMassive.length);
  return nameMassive[randomName];
};

var getComments = function (x) {
  var arrComments = [];
  for (var i = 0; i < x; i++) {
    var elementMassiveComment = {
      avatar: 'photos/' + getRandom(1, 6) + '.jpg',
      message: getMessageFunction(),
      name: getNameFunction()
    };
    arrComments.push(elementMassiveComment);
  }
  return arrComments;
};

var getMassive = function (x) {
  var arrUser = [];
  for (var i = 0; i < x; i++) {
    var elementMassive = {
      url: 'photos/' + getRandom(1, 25) + '.jpg',
      description: 'строка — описание фотографии',
      likes: getRandom(15, 200),
      comments: getComments(getRandom(1, 3))
    };
    arrUser.push(elementMassive);
  }
  return arrUser;
};

var testMassive = getMassive(countDescribe);
var pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
var picture = document.querySelector('.pictures');

var renderComment = function (x) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = x.url;
  pictureElement.querySelector('.picture__likes').textContent =
    x.likes;
  pictureElement.querySelector('.picture__comments').textContent =
    x.comments.length;
  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < countDescribe; i++) {
  fragment.appendChild(renderComment(testMassive[i]));
}

picture.appendChild(fragment);
