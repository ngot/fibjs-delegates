var test = require('test');
var delegate = require('index');

test.setup();

describe('.method(name)', function () {
  it('should delegate methods', function () {
    var obj = {};

    obj.request = {
      foo: function (bar) {
        assert(this == obj.request);
        return bar;
      }
    };

    delegate(obj, 'request').method('foo');

    assert.equal(obj.foo('something'), 'something');
  })
})

describe('.getter(name)', function () {
  it('should delegate getters', function () {
    var obj = {};

    obj.request = {
      get type () {
        return 'text/html';
      }
    }

    delegate(obj, 'request').getter('type');

    assert.equal(obj.type, 'text/html');
  })
})

describe('.setter(name)', function () {
  it('should delegate setters', function () {
    var obj = {};

    obj.request = {
      get type () {
        return this._type.toUpperCase();
      },

      set type (val) {
        this._type = val;
      }
    }

    delegate(obj, 'request').setter('type');

    obj.type = 'hey';
    assert.equal(obj.request.type, 'HEY')
  })
})

describe('.access(name)', function () {
  it('should delegate getters and setters', function () {
    var obj = {};

    obj.request = {
      get type () {
        return this._type.toUpperCase();
      },

      set type (val) {
        this._type = val;
      }
    }

    delegate(obj, 'request').access('type');

    obj.type = 'hey';
    assert.equal(obj.type, 'HEY')
  })
})

describe('.fluent(name)', function () {
  it('should delegate in a fluent fashion', function () {
    var obj = {
      settings: {
        env: 'development'
      }
    };

    delegate(obj, 'settings').fluent('env');

    assert.equal(obj.env(), 'development')
    assert.equal(obj.env('production'), obj)
    assert.equal(obj.settings.env, 'production')
  })
})

test.run()