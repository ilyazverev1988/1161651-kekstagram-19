'use strict';
(function () {
  var NUMBER_OF_PHOTOS = 25;
  var picture = document.querySelector('.pictures');

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

  var blocksPhotos = window.data.createForBlockPhoto(NUMBER_OF_PHOTOS);
  renderPhotos(blocksPhotos);
})();
