window.XNotification = (function () {

  'use strict';

  // fix Notification object
  var Notification = window.Notification || window.webkitNotification || window.mozNotification;
  var XNotificationPrototype = Object.create(HTMLElement.prototype);

  Object.defineProperty(XNotificationPrototype, 'title', {
    configurable: false,
    enumerable: false,
    get: function () {
      if (this.hasAttribute('title')) {
        return this.getAttribute('title');
      } else {
        return null
      }
    },
    set: function (newValue) {
      this.setAttribute('title', newValue);
    }
  });

  Object.defineProperty(XNotificationPrototype, 'dir', {
    configurable: false,
    enumerable: false,
    get: function () {
      if (this.hasAttribute('dir')) {
        return this.getAttribute('dir');
      } else {
        return null;
      }
    },
    set: function (newValue) {
      if (['auto', 'ltr', 'rtl'].indexOf(newValue) !== -1) {
        this.setAttribute('dir', newValue);
      } else {
        throw new Error(newValue + ' is invalid value for dir');
      }
    }
  });

  Object.defineProperty(XNotificationPrototype, 'lang', {
    configurable: false,
    enumerable: false,
    get: function () {
      if (this.hasAttribute('lang')) {
        return this.getAttribute('lang');
      } else {
        return null;
      }
    },
    set: function (newValue) {
      this.setAttribute('lang', newValue);
    }
  });

  Object.defineProperty(XNotificationPrototype, 'tag', {
    configurable: false,
    enumerable: false,
    get: function () {
      if (this.hasAttribute('tag')) {
        return this.getAttribute('tag');
      } else {
        return null;
      }
    },
    set: function (newValue) {
      this.setAttribute('tag', newValue);
    }
  });

  Object.defineProperty(XNotificationPrototype, 'icon', {
    configurable: false,
    enumerable: false,
    get: function () {
      if (this.hasAttribute('icon')) {
        return this.getAttribute('icon');
      } else {
        return null
      }
    },
    set: function (newValue) {
      this.setAttribute('icon', newValue);
    }
  });

  Object.defineProperty(XNotificationPrototype, 'autoshow', {
    configurable: false,
    enumerable: false,
    get: function () {
      return this.hasAttribute('autoshow');
    }
  });

  Object.defineProperty(XNotificationPrototype, 'delay', {
    configurable: false,
    enumerable: false,
    get: function () {
      if (this.hasAttribute('delay')) {
        return Number(this.getAttribute('delay')) || 0;
      } else {
        return null;
      }
    },
    set: function (newValue) {
      this.setAttribute('delay', newValue);
    }
  });

  Object.defineProperty(XNotificationPrototype, 'timeout', {
    configurable: false,
    enumerable: false,
    get: function () {
      if (this.hasAttribute('timeout')) {
        return Number(this.getAttribute('timeout')) || 0;
      } else {
        return null;
      }
    },
    set: function (newValue) {
      this.setAttribute('timeout', newValue);
    }
  });

  // Check the permission for browser notification
  XNotificationPrototype.createdCallback = function () {
    
    this.style.display = 'none';

    // if Notification.permission is not 'granted'
    // request permission to show notification
    if (Notification.permission !== 'granted') {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }
  };

  // When x-notification or XNotification object it set,
  // prepare parameters for Notification object
  XNotificationPrototype.attachedCallback = function () {
    if (this.autoshow) {
      this.show();
    }
  };

  XNotificationPrototype.detachedCallback = function () {
    if (this.notification) {
      this.notification.close();
    }
  };

  // If attribute is changed
  XNotificationPrototype.attributeChangedCallback = function (attributeName, oldValue, newValue) {};

  // Show notification
  XNotificationPrototype.show = function () {

    var that = this;

    this.delayTimerId = setTimeout(function () {

      // Initialize notification instance
      that.notification = new Notification(that.title, {
        dir: that.dir,
        lang: that.lang,
        body: that.textContent,
        tag: that.tag,
        icon: that.icon
      });

      if (that.timeout !== 0) {
        that.timeoutTimerId = window.setTimeout(function () {
          that.close();
        }, that.timeout);
      }
    }, that.delay);
  };

  XNotificationPrototype.addEventListener = function (type, listener, useCapture) {
    this.notification.addEventListener(type, listener, useCapture);
  };

  XNotificationPrototype.removeEventListener = function (type, listener, useCapture) {
    this.notification.removeEventListener(type, listener, useCapture);
  };

  // Close notification
  XNotificationPrototype.close = function () {

    if (this.notification) {
      this.notification.close();
    }

    this.disposeTimer();
  };

  // Stop timers for delay and timeout
  XNotificationPrototype.disposeTimer = function () {

    // Clear delay timer
    if (this.delayTimerId) {
      window.clearTimeout(this.delayTimerId);
    }

    // Clear timeout timer
    if (this.timeoutTimerId) {
      window.clearTimeout(this.timeoutTimerId);
    }
  };

  return document.registerElement('x-notification', {
    prototype: XNotificationPrototype
  });
})();