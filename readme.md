# [`<x-notification>`](http://1000ch.github.io/x-notification)

## About

Declarative Browser Notifications as Web Components.

[![Build Status](https://travis-ci.org/1000ch/x-notification.svg?branch=master)](https://travis-ci.org/1000ch/x-notification)
[![NPM version](https://badge.fury.io/js/x-notification.svg)](http://badge.fury.io/js/x-notification)

## Install

Using [npm](https://www.npmjs.org/package/x-notification):

```sh
$ npm install x-notification
```

Using [bower](http://bower.io/search/?q=x-notification):

```sh
$ bower install x-notification
```

## Usage

Load `x-notification.js`.

```html
<script src="x-notification.js"></script>
```

After loading, put `<x-notification>` tag.

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

MIT: http://1000ch.mit-license.org/
