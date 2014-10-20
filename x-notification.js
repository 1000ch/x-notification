'use strict';

if (!document.registerElement) {
  throw new Error('Browser does not support document.registerElement');
}

window.XNotification = (function () {

  var NOOP = function () {};

  // fix Notification object
  var Notification = window.Notification || window.webkitNotification || window.mozNotification;
  var XNotificationPrototype = Object.create(HTMLElement.prototype);

  Object.defineProperty(XNotificationPrototype, 'title', {
    configurable: false,
    enumerable: false,
    get: function () {
      return this.getAttribute('title');
    },
    set: function (newValue) {
      this.setAttribute('title', newValue);
    }
  });

  Object.defineProperty(XNotificationPrototype, 'dir', {
    configurable: false,
    enumerable: false,
    get: function () {
      return this.getAttribute('dir');
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
      return this.getAttribute('lang');
    },
    set: function (newValue) {
      this.setAttribute('lang', newValue);
    }
  });

  Object.defineProperty(XNotificationPrototype, 'tag', {
    configurable: false,
    enumerable: false,
    get: function () {
      return this.getAttribute('tag');
    },
    set: function (newValue) {
      this.setAttribute('tag', newValue);
    }
  });

  Object.defineProperty(XNotificationPrototype, 'icon', {
    configurable: false,
    enumerable: false,
    get: function () {
      return this.getAttribute('icon');
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
      return Number(this.getAttribute('delay')) || 0;
    },
    set: function (newValue) {
      this.setAttribute('delay', newValue);
    }
  });

  Object.defineProperty(XNotificationPrototype, 'timeout', {
    configurable: false,
    enumerable: false,
    get: function () {
      return Number(this.getAttribute('timeout')) || 0;
    },
    set: function (newValue) {
      this.setAttribute('timeout', newValue);
    }
  });

  Object.defineProperty(XNotificationPrototype, 'onclick', {
    configurable: false,
    enumerable: false,
    get: function () {
      if (this.hasAttribute('onclick')) {
        return new Function(this.getAttribute('onclick'))
      } else {
        return NOOP;
      }
    },
    set: function (newValue) {
      this.setAttribute('onclick', newValue);
    }
  });

  Object.defineProperty(XNotificationPrototype, 'onshow', {
    configurable: false,
    enumerable: false,
    get: function () {
      if (this.hasAttribute('onshow')) {
        return new Function(this.getAttribute('onshow'))
      } else {
        return NOOP;
      }
    },
    set: function (newValue) {
      this.setAttribute('onshow', newValue);
    }
  });

  Object.defineProperty(XNotificationPrototype, 'onerror', {
    configurable: false,
    enumerable: false,
    get: function () {
      if (this.hasAttribute('onerror')) {
        return new Function(this.getAttribute('onerror'))
      } else {
        return NOOP;
      }
    },
    set: function (newValue) {
      this.setAttribute('onerror', newValue);
    }
  });

  Object.defineProperty(XNotificationPrototype, 'onclose', {
    configurable: false,
    enumerable: false,
    get: function () {
      if (this.hasAttribute('onclose')) {
        return new Function(this.getAttribute('onclose'))
      } else {
        return NOOP;
      }
    },
    set: function (newValue) {
      this.setAttribute('onclose', newValue);
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

      // Set callbacks
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