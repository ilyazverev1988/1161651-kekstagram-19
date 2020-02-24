'use strict';

(function () {

  var picture = document.querySelector('.pictures');
  var main = document.querySelector('main');

  // создание изображения
  var renderPhoto = function (block) {
    var pictureTemplate = document
      .querySelector('#picture')
      .content.querySelector('.picture');
    var pictureElement = pictureTemplate.cloneNode(true);

    var onSmallImageClick = function (evt) {
      evt.preventDefault();
      window.preview.showBigPicture(block);
    };

    pictureElement.querySelector('.picture__img').src = block.url;
    pictureElement.querySelector('.picture__likes').textContent = block.likes;
    pictureElement.querySelector('.picture__comments').textContent =
      block.comments.length;
    pictureElement.addEventListener('click', onSmallImageClick);
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

  var debounceRenderPhotos = window.utils.debounce(function (data) {
    renderPhotos(data);
  });

  // отрисовка данных в случае успешной загрузки
  var onSuccess = function (data) {
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
    var filterDefault = document.querySelector('#filter-default');
    var filterRandom = document.querySelector('#filter-random');
    var filterDiscussed = document.querySelector('#filter-discussed');
    var filterFormsButton = document.querySelectorAll('.img-filters__form button');

    var dataForGallery = data.slice();

    renderPhotos(data);

    // функция удаления всех отрисованных картинок
    var deletePictures = function () {
      var pictureImg = document.querySelectorAll('.picture');
      pictureImg.forEach(function (item) {
        picture.removeChild(item);
      });
    };

    // функция удаления класса
    var deleteClass = function () {
      filterFormsButton.forEach(function (button) {
        button.classList.remove('img-filters__button--active');
      });
    };

    var renderDataFilter = function (dataForPhoto) {
      deleteClass();
      deletePictures();
      debounceRenderPhotos(dataForPhoto);
    };

    // отрисовка всего по клику по умолчвнию
    filterDefault.addEventListener('click', function (evt) {
      renderDataFilter(data);
      evt.target.classList.add('img-filters__button--active');
    });

    // отрисовка по клику случайные 10 картинок
    filterRandom.addEventListener('click', function (evt) {
      renderDataFilter(window.filter.getRandomDataForPictures(data));
      evt.target.classList.add('img-filters__button--active');
    });

    // отрисовка по клику самые комментируемые
    filterDiscussed.addEventListener('click', function (evt) {
      renderDataFilter(window.filter.sortMostCommented(dataForGallery));
      evt.target.classList.add('img-filters__button--active');
    });
  };

  // в случае ошибки загрузки вывод сообщения об ошибке
  var onError = function (message) {

    var errorTemplate = document
      .querySelector('#error')
      .content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);

    var renderBlockError = function () {
      error.querySelector('.error__title').textContent = message;
      error.querySelector('.error__button').style.display = 'none';
      main.appendChild(error);
    };

    renderBlockError();

    // закрытие окна с ошибкой
    var onScreenEscPress = function (evt) {
      if (evt.key === window.preview.ESC_KEY) {
        main.removeChild(error);
      }
    };

    // функция закрытия сообщения об ошибке
    var onErrorMessageClick = function () {
      main.removeChild(error);
      document.removeEventListener('keydown', onScreenEscPress);
      main.removeEventListener('click', onErrorMessageClick);
    };

    // закрытие сообщения по клику или ESC
    document.addEventListener('keydown', onScreenEscPress);
    main.addEventListener('click', onErrorMessageClick);
  };

  window.server.load(onSuccess, onError);

  window.gallery = {
    main: main,
    renderPhotos: renderPhotos
  };
})();
