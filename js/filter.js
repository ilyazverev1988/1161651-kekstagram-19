'use strict';

(function () {
  // перемешивание массива с сервера
  var getRandomDataForPictures = function (data) {
    var randomDataForPictures = window.utils.mixData(data);
    var dataRandomForRender = function (array, number) {
      var dataRandom = [];
      for (var i = 0; i < number; i++) {
        dataRandom.push(array[i]);
      }
      return dataRandom;
    };
    window.gallery.renderPhotos(
        dataRandomForRender(randomDataForPictures, 10)
    );
  };

  // сортировка массива по самому коментируеммому
  var sortMostCommented = function (array) {
    array.sort(function (first, second) {
      if (first.comments.length > second.comments.length) {
        return -1;
      } else if (first.comments.length < second.comments.length) {
        return 1;
      } else {
        return 0;
      }
    });
    window.gallery.renderPhotos(array);
  };

  window.filter = {
    getRandomDataForPictures: getRandomDataForPictures,
    sortMostCommented: sortMostCommented
  };
})();
