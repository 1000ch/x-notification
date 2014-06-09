var XNotificationPrototype = Object.create(HTMLElement.prototype);

XNotificationPrototype.createdCallback = function () {
  if (Notification && Notification.permission !== 'granted') {
    Notification.requestPermission(function (status) {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
    });
  }
};

XNotificationPrototype.attachedCallback = function () {
  this.title = this.getAttribute('title');
  this.options = {
    dir: this.getAttribute('dir'),
    lang: this.getAttribute('lang'),
    body: this.textContent,
    tag: this.getAttribute('tag'),
    icon: this.getAttribute('icon')
  };

  this.delay = this.getAttribute('delay');
  this.timeout = this.getAttribute('timeout');

  if (this.delay) {
    this.delay -= 0;
  } else {
    this.delay = 0;
  }
  setTimeout(function () {
    this.showNotification();
  }.bind(this), this.delay);

  if (this.timeout) {
    this.timeout -= 0;
  } else {
    this.timeout = 0;
  }
  setTimeout(function () {
    this.closeNotification();
  }.bind(this), this.timeout);
};

XNotificationPrototype.detachedCallback = function () {
  if (this.notification) {
    this.notification.close();
  }
};

XNotificationPrototype.attributeChangedCallback = function (attributeName, oldValue, newValue) {};

XNotificationPrototype.showNotification = function () {
  this.notification = new Notification(this.title, this.options);
};

XNotificationPrototype.closeNotification = function () {
  if (this.notification) {
    this.notification.close();
  }
};

var XNotification = document.registerElement('x-notification', {
  prototype: XNotificationPrototype
});