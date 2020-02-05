'use strict';
// Объявление переменных и констант
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

// перемешивание массива
var mixData = function (array) {
  var dataForMix = array.slice();
  for (var i = dataForMix.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = dataForMix[i];
    dataForMix[i] = dataForMix[j];
    dataForMix[j] = temp;
  }
  return dataForMix;
};

// Получение случайного числа в диапазоне
var getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

// получение случайного элемента массива
var getRandomElement = function (array) {
  var random = Math.floor(Math.random() * array.length);
  return array[random];
};

// получение списка комментариев
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

// получение массива чисел из диапазона не повторяющихся
var getRandomNotRepeat = function (min, max) {
  var numbers = Array(max - min + 1)
    .fill('')
    .map(function (el, i) {
      return i + min;
    });

  return mixData(numbers);
};

// получение описания изображения
var createDataForBlockPhoto = function (number) {
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

// создание изображения
var renderPhoto = function (block) {
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

// отрисовка изображений на странице
var renderPhotos = function (photos) {
  var fragment = document.createDocumentFragment();
  photos.forEach(function (item) {
    fragment.appendChild(renderPhoto(item));
  });
  picture.appendChild(fragment);
};

var blocksPhotos = createDataForBlockPhoto(NUMBER_OF_PHOTOS);
renderPhotos(blocksPhotos);

