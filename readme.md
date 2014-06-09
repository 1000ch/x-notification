# `<x-notification>`

## Usage

Import `x-notification.html`.

```html
<link rel="import" href="x-notification.html">
```

After import, put `<x-notification>` tag.

```html
<x-notification autoshow title='Notification Title' delay='1000' timeout='3000' tag='tag'>Notification body</x-notification>
```

If you set `autoshow` attribute, a notification will be shown automatically.

To show it manually, execute `show()` function.

```js
document.querySelector('x-notification').show();
```

## Attributes

### Title (String)

**This is a required option** . This will be set as notification title.

### dir

The direction of the notification.
It can be **auto** , **ltr** , or **rtl** .

### lang

Specify the language used within the notification.

### body

A string representing an extra content to display within the notification.

### tag

An ID for a given notification that allows to retrieve, replace or remove it if necessary.

### icon

The URL of an image to be used as an icon by the notification.

### delay

### timeout

### autoshow

## License

MIT