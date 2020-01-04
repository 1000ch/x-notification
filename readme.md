# `<x-notification>`

> Declarative Browser Notification as Web Components.

[![Build Status](https://travis-ci.org/1000ch/x-notification.svg?branch=master)](https://travis-ci.org/1000ch/x-notification)
[![NPM version](https://badge.fury.io/js/x-notification.svg)](http://badge.fury.io/js/x-notification)
[![devDependency Status](https://david-dm.org/1000ch/x-notification/dev-status.svg)](https://david-dm.org/1000ch/x-notification?type=dev)

## Install

Using [npm](https://www.npmjs.org/package/x-notification):

```sh
$ npm install x-notification
```

## Usage

Import `XNotification` and register it.

```html
<script type="module">
import XNotification from 'https://unpkg.com/x-notification/dist/index.js';
customElements.define('x-notification', XNotification);
</script>
```

Put `<x-notification>` tag.

```html
<x-notification autoshow title="Notification Title" delay="1000" timeout="3000" tag="tag">
  Notification body
</x-notification>
```

If you set `autoshow` attribute, a notification will be shown automatically.

To show it manually, execute `show()` function.

```js
document.querySelector('x-notification').show();
```

## Attributes

### `title=<String>`

**This is a required option** . This will be set as notification title.

### `dir=<String>`

The direction of the notification.
It can be **auto** , **ltr** , or **rtl** .

### `lang=<String>`

Specify the language used within the notification.

### `body=<String>`

A string representing an extra content to display within the notification.

### `tag=<String>`

An ID for a given notification that allows to retrieve, replace or remove it if necessary.

### `icon=<String>`

The URL of an image to be used as an icon by the notification.

### `delay=<Number>`

Delay for timing to show notification.

### `timeout=<Number>`

Timeout for timing to close notification automatically.

### `autoshow`

If you add this attribute, notification will be shown automatically.

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
