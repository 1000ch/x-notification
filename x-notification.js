export default class XNotification extends HTMLElement {
  get tag() {
    if (this.hasAttribute('tag')) {
      return this.getAttribute('tag');
    }

    return null;
  }

  set tag(value) {
    this.setAttribute('tag', value);
  }

  get icon() {
    if (this.hasAttribute('icon')) {
      return this.getAttribute('icon');
    }

    return null;
  }

  set icon(value) {
    this.setAttribute('icon', value);
  }

  get autoshow() {
    return this.hasAttribute('autoshow');
  }

  get delay() {
    if (this.hasAttribute('delay')) {
      return Number(this.getAttribute('delay')) || 0;
    }

    return null;
  }

  set delay(value) {
    this.setAttribute('delay', value);
  }

  get timeout() {
    if (this.hasAttribute('timeout')) {
      return Number(this.getAttribute('timeout')) || 0;
    }

    return null;
  }

  set timeout(value) {
    this.setAttribute('timeout', value);
  }

  constructor() {
    super();

    this.style.display = 'none';

    // If Notification.permission is not 'granted'
    // request permission to show notification
    if (Notification.permission !== 'granted') {
      Notification.requestPermission(status => {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }
  }

  connectedCallback() {
    if (this.autoshow) {
      this.show();
    }
  }

  disconnectedCallback() {
    if (this.notification) {
      this.notification.close();
    }
  }

  addEventListener(type, listener, useCapture) {
    if (this.notification) {
      this.notification.addEventListener(type, listener, useCapture);
    }
  }

  removeEventListener(type, listener, useCapture) {
    if (this.notification) {
      this.notification.removeEventListener(type, listener, useCapture);
    }
  }

  show() {
    this.delayTimerId = setTimeout(() => {
      this.notification = new Notification(this.title, {
        dir: this.dir || 'auto',
        lang: this.lang,
        body: this.textContent,
        tag: this.tag,
        icon: this.icon
      });

      if (this.timeout !== 0) {
        this.timeoutTimerId = setTimeout(() => this.close(), this.timeout);
      }
    }, this.delay);
  }

  close() {
    if (this.notification) {
      this.notification.close();
    }

    this.disposeTimer();
  }

  disposeTimer() {
    if (this.delayTimerId) {
      clearTimeout(this.delayTimerId);
    }

    if (this.timeoutTimerId) {
      clearTimeout(this.timeoutTimerId);
    }
  }
}
