// eslint-disable-next-line @typescript-eslint/naming-convention
export default class XNotification extends HTMLElement {
  delayTimerId?: number = undefined;
  timeoutTimerId?: number = undefined;
  notification?: Notification = undefined;

  get tag(): string | undefined {
    if (this.hasAttribute('tag')) {
      return this.getAttribute('tag') ?? undefined;
    }

    return undefined;
  }

  set tag(value: string | undefined) {
    if (value === null || value === undefined) {
      this.removeAttribute('tag');
    } else {
      this.setAttribute('tag', value);
    }
  }

  get icon(): string | undefined {
    if (this.hasAttribute('icon')) {
      return this.getAttribute('icon') ?? undefined;
    }

    return undefined;
  }

  set icon(value: string | undefined) {
    if (value === null || value === undefined) {
      this.removeAttribute('icon');
    } else {
      this.setAttribute('icon', value);
    }
  }

  get autoshow(): boolean {
    return this.hasAttribute('autoshow');
  }

  get delay(): number | undefined {
    if (this.hasAttribute('delay')) {
      return Number(this.getAttribute('delay')) || 0;
    }

    return undefined;
  }

  set delay(value: number | undefined) {
    if (value === null || value === undefined) {
      this.removeAttribute('delay');
    } else {
      this.setAttribute('delay', String(value));
    }
  }

  get timeout(): number | undefined {
    if (this.hasAttribute('timeout')) {
      return Number(this.getAttribute('timeout')) || 0;
    }

    return undefined;
  }

  set timeout(value: number | undefined) {
    if (value === null || value === undefined) {
      this.removeAttribute('timeout');
    } else {
      this.setAttribute('timeout', String(value));
    }
  }

  constructor() {
    super();
    this.style.display = 'none';
  }

  connectedCallback(): void {
    if (this.autoshow) {
      this.show();
    }
  }

  disconnectedCallback(): void {
    this.notification?.close();
  }

  addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture: boolean | AddEventListenerOptions): void {
    this.notification?.addEventListener(type, listener, useCapture);
  }

  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture: boolean | EventListenerOptions): void {
    this.notification?.removeEventListener(type, listener, useCapture);
  }

  show(): void {
    this.delayTimerId = window.setTimeout(() => {
      const dirs = new Set(['auto', 'ltr', 'rtl']);
      const options: NotificationOptions = {
        dir: dirs.has(this.dir) ? this.dir as NotificationDirection : undefined,
        lang: this.lang,
        body: this.textContent ?? undefined,
        tag: this.tag,
        icon: this.icon,
      };

      this.notification = new Notification(this.title, options);

      if (this.timeout === null) {
        this.timeoutTimerId = window.setTimeout(() => {
          this.close();
        }, this.timeout);
      }
    }, this.delay);
  }

  close(): void {
    this.notification?.close();
    window.clearTimeout(this.delayTimerId);
    window.clearTimeout(this.timeoutTimerId);
  }
}
