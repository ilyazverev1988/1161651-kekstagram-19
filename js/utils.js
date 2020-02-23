'use strict';

(function () {
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

  // устранение "дребезга"
  var debounce = function (action) {
    var DEBOUNCE_INTERVAL = 500; // ms
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(action, DEBOUNCE_INTERVAL);
  };

  window.utils = {
    mixData: mixData,
    debounce: debounce
  };
})();
