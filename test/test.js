var expect = chai.expect;

describe('XNotification', function () {

  it('is a function', function () {
    expect(XNotification).to.be.a('function');
  });
  
  it('create an instance', function () {
    expect(new XNotification()).to.be.a('object');
  });

  it('create an instance', function () {
    expect(document.createElement('x-notification')).to.be.a('object');
  });

});

describe('XNotification Instance', function () {

  var notification = new XNotification();

  it('has "title" attribute', function () {
    expect(notification.title).to.be.a('string');
  });

  it('has "dir" attribute', function () {
    expect(notification.dir).to.be.a('string');
  });

  it('has "lang" attribute', function () {
    expect(notification.lang).to.be.a('string');
  });

  it('has "tag" attribute', function () {
    expect(notification.tag).to.be.a('string');
  });

  it('has "icon" attribute', function () {
    expect(notification.icon).to.be.a('string');
  });

  it('has "autoshow" attribute', function () {
    expect(notification.autoshow).to.be.a('boolean');
  });

  it('has "delay" attribute', function () {
    expect(notification.delay).to.be.a('number');
  });

  it('has "timeout" attribute', function () {
    expect(notification.timeout).to.be.a('number');
  });
});