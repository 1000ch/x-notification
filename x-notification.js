'use strict';

var Notification = window.Notification || window.webkitNotification || window.mozNotification;
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

  if (['auto', 'ltr', 'rtl'].indexOf(this.options.dir) === -1) {
    this.options.dir = 'auto';
  }

  this.delay = Number(this.getAttribute('delay')) || 0;
  this.timeout = Number(this.getAttribute('timeout')) || 0;
  this.autoshow = this.hasAttribute('autoshow');

  this.onclick = this.getAttribute('onclick') ? new Function(this.getAttribute('onclick')) : this.noop;
  this.onshow = this.getAttribute('onshow') ? new Function(this.getAttribute('onshow')) : this.noop;
  this.onerror = this.getAttribute('onerror') ? new Function(this.getAttribute('onerror')) : this.noop;
  this.onclose = this.getAttribute('onclose') ? new Function(this.getAttribute('onclose')) : this.noop;

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
    that.notification.onclick = that.onclick;
    that.notification.onshow = that.onshow;
    that.notification.onerror = that.onerror;
    that.notification.onclose = that.onclose;
    if (that.timeout !== 0) { 
      that.timeoutTimerId = window.setTimeout(function () {
        that.close();
      }, that.timeout);
    }
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
    window.clearTimeout(this.delayTimerId);
  }
  if (this.timeoutTimerId) {
    window.clearTimeout(this.timeoutTimerId);
  }
};

XNotificationPrototype.noop = function () {};

var XNotification = document.registerElement('x-notification', {
  prototype: XNotificationPrototype
});