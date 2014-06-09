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

  this.delay = Number(this.getAttribute('delay')) || 0;
  this.timeout = Number(this.getAttribute('timeout')) || 0;
  this.autoshow = this.hasAttribute('autoshow');

  if (this.autoshow) {
    this.show();
  }
};

XNotificationPrototype.detachedCallback = function () {
  if (this.notification) {
    this.notification.close();
  }
};

XNotificationPrototype.attributeChangedCallback = function (attributeName, oldValue, newValue) {};

XNotificationPrototype.show = function () {
  var that = this;
  this.delayTimerId = setTimeout(function () {
    that.notification = new Notification(that.title, that.options);
    that.timeoutTimerId = setTimeout(function () {
      that.close();
    }, that.timeout);
  }, that.delay);
};

XNotificationPrototype.close = function () {
  if (this.notification) {
    this.notification.close();
  }
  this.disposeTimer();
};

XNotificationPrototype.disposeTimer = function () {
  if (this.delayTimerId) {
    clearTimeout(this.delayTimerId);
  }
  if (this.timeoutTimerId) {
    clearTimeout(this.timeoutTimerId);
  }
};

var XNotification = document.registerElement('x-notification', {
  prototype: XNotificationPrototype
});