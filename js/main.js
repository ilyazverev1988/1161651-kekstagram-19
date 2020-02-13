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
var bigPicture = document.querySelector('.big-picture');

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

// новое задание
// показывает большую картинку
var showBigPicture = function (image) {
  var imgBigPicture = bigPicture.querySelector('.big-picture__img img');
  var likesBigPicture = bigPicture.querySelector('.likes-count');
  var quantityCommentsBigPicture = bigPicture.querySelector('.comments-count');
  var descriptionBigPicture = bigPicture.querySelector('.social__caption');

  bigPicture.classList.remove('hidden');
  imgBigPicture.src = image.url;
  likesBigPicture.textContent = image.likes;
  quantityCommentsBigPicture.textContent = image.comments.length;
  descriptionBigPicture.textContent = image.description;
  renderComments(image.comments);
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
};

// создание коментария
var renderComment = function (block) {
  var commentItem = document.querySelector('.social__comment');
  var commentElement = commentItem.cloneNode(true);
  commentElement.querySelector('.social__picture').src = block.avatar;
  commentElement.querySelector('.social__picture').alt = block.name;
  commentElement.querySelector('.social__text').textContent = block.message;
  return commentElement;
};

// отрисовка комментариев на большой картинке
var renderComments = function (comments) {
  var listCommentsBigPicture = bigPicture.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  comments.forEach(function (item) {
    fragment.appendChild(renderComment(item));
  });
  listCommentsBigPicture.innerHTML = '';
  listCommentsBigPicture.appendChild(fragment);
};

showBigPicture(blocksPhotos[0]);

// закрытие большого окна, временно
var bigPictureCancel = document.querySelector('.big-picture__cancel');
var bigPictureOverlay = document.querySelector('.big-picture');
bigPictureCancel.addEventListener('click', function () {
  bigPictureOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

/* // функция показа любой картинки
var selectBigPicture = function () {
  var smallPictureAll = document.querySelectorAll('.picture');
  smallPictureAll.forEach(function (item) {
    item.addEventListener("click", showBigPicture(blocksPhotos[0]));
  });
};
selectBigPicture();*/
