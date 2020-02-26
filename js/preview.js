'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  // показывает большую картинку
  var showBigPicture = function (image) {
    var imgBigPicture = bigPicture.querySelector('.big-picture__img img');
    var likesBigPicture = bigPicture.querySelector('.likes-count');
    var quantityCommentsBigPicture = bigPicture.querySelector('.comments-count');
    var descriptionBigPicture = bigPicture.querySelector('.social__caption');
    var socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');
    var clickOnLoad = 1;

    imgBigPicture.src = image.url;
    likesBigPicture.textContent = image.likes;
    quantityCommentsBigPicture.textContent = image.comments.length;
    descriptionBigPicture.textContent = image.description;

    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    socialCommentsLoader.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureEscPress);
    var commentsForImage = image.comments;

    if (commentsForImage.length < 5) {
      // рендер комментариев по умолчанию по 5 штук
      renderComments(commentsForImage);
      socialCommentsLoader.classList.add('hidden');
    } else { // рендер остальных комментариев по клику на загрузить еще
      renderComments(commentsForImage.slice(0, 5));
      socialCommentsLoader.addEventListener('click', function () {
        clickOnLoad++;
        var commentsForLoad = commentsForImage.slice(0, 5 * clickOnLoad);
        renderComments(commentsForLoad);
        socialCommentsLoader.classList.remove('hidden');
        if (commentsForLoad.length >= commentsForImage.length) {
          socialCommentsLoader.classList.add('hidden');
        }
      });
    }
  };

  // создание коментария
  var renderComment = function (block) {
    var commentItem = document.querySelector('.social__comment');
    var commentElement = commentItem.cloneNode(true);
    commentElement.querySelector('.social__picture').src =
                   block.avatar;
    commentElement.querySelector('.social__picture').alt =
                   block.name;
    commentElement.querySelector('.social__text').textContent =
                   block.message;
    return commentElement;
  };

  // отрисовка комментариев на большой картинке
  var renderComments = function (comments) {
    var listCommentsBigPicture = bigPicture.querySelector(
        '.social__comments'
    );
    var fragment = document.createDocumentFragment();
    comments.forEach(function (item) {
      fragment.appendChild(renderComment(item));
    });
    listCommentsBigPicture.innerHTML = '';
    listCommentsBigPicture.appendChild(fragment);
  };

  // закрытие большой картинки
  var bigPictureCancel = document.querySelector(
      '.big-picture__cancel'
  );
  var bigPictureOverlay = document.querySelector('.big-picture');
  var ESC_KEY = 'Escape';

  var onBigPictureEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      bigPictureOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  };

  // функция закрытия редактирования картинки
  var onBigPictureClose = function () {
    bigPictureOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  bigPictureCancel.addEventListener('click', onBigPictureClose);

  window.preview = {
    showBigPicture: showBigPicture,
    ESC_KEY: ESC_KEY
  };
})();
