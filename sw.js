self.addEventListener('install', function (e) {

  console.log('ServiceWorker.oninstall: ', e);

  e.waitUntil(
    caches.open('x-notification-v1').then(function (cache) {
      return cache.addAll([
        'bower_components/webcomponentsjs/webcomponents.js',
        'bower_components/markdown.css/markdown.css',
        'bower_components/paper-button/paper-button.html',
        'bower_components/paper-input/paper-input.html',
        'bower_components/paper-radio-group/paper-radio-group.html',
        'bower_components/paper-button/paper-button.html',

        'x-notification.js'
        'x-notification-editor.html'
      ]);
    });
  );
});

self.addEventListener('fetch', function (e) {

  console.log('ServiceWorker.onfetch: ', e);

  e.respondWith(
    caches.open('x-notification-v1').then(function (cache) {
      return cache.match(e.request).then(function (response) {
        return response || fetch(e.request.clone()).then(function(response) {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    });
  );
});