# [`<x-notification>`](http://1000ch.net/x-notification)

## About

Declarative Browser Notifications as Web Components.

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

Import `x-notification.html`.

```html
<link rel="import" href="x-notification.html">
```

After import, put `<x-notification>` tag.

```html
<x-notification
  autoshow
  title='Notification Title'
  delay='1000'
  timeout='3000'
  tag='tag'>Notification body</x-notification>
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

### `onclick=<Function>`

A handler for the `click` event. It is triggered each time the user clicks on the notification.

### `onshow=<Function>`

A handler for the `show` event. It is triggered when the notification is displayed.

### `onerror=<Function>`

A handler for the `error` event. It is triggered each time the notification encounters an error.

### `onclose=<Function>`

A handler for the `close` event. It is triggered when the user closes the notification.

## License

MIT