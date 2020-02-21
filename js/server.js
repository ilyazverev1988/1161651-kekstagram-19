'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var errorMessage;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          errorMessage = 'Неверный запрос';
          break;
        case 401:
          errorMessage = 'Пользователь не авторизован';
          break;
        case 404:
          errorMessage = 'Ничего не найдено';
          break;
        default:
          errorMessage =
            'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (errorMessage) {
        onError(errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  window.server = {
    load: load,
  };

})();

