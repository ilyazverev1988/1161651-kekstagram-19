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
    return dataRandomForRender(randomDataForPictures, 10);
  };

  // сортировка массива по самому коментируеммому
  var sortMostCommented = function (array) {
    array.sort(function (first, second) {
      return first.comments.length > second.comments.length ? -1 : 1;
    });
    return array;
  };

  window.filter = {
    getRandomDataForPictures: getRandomDataForPictures,
    sortMostCommented: sortMostCommented
  };
})();
