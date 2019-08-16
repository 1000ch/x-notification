# `<x-notification>`

Declarative Browser Notifications as Web Components.

## Install

Via [npm](https://www.npmjs.org/package/x-notification):

```sh
$ npm install x-notification
```

## Usage

Import `x-notification.js` and register.

```html
<script type="module">
  import XNotification from './x-notification.js';
  customElements.define('x-notification', XNotification);
</script>
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

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
