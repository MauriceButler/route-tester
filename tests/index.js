var routeTester = require('../'),
    test = require('grape');


test('routeTester Exists', function (t) {
    t.plan(2);
    t.ok(routeTester, 'routeTester Exists');
    t.equal(typeof routeTester, 'function',  'routeTester is a function');
});

test('routeTester passes on correct routes', function (t) {
    t.plan(7);

    var expectedRoutes = {
            '/foo': ['POST'],
            '/foo/`bar`': ['GET', 'PUT']
        },
        actualRoutes = {
            '/foo': {
                'POST': function(){}
            },
            '/foo/`bar`': {
                'GET': function(){},
                'PUT': function(){}
            }
        },
        testFramework = t;

    routeTester(testFramework, expectedRoutes, actualRoutes);
});

test('routeTester fails on missing route', function (t) {
    t.plan(7);

    var expectedRoutes = {
            '/foo': ['POST'],
            '/foo/`bar`': ['GET', 'PUT']
        },
        actualRoutes = {
            '/foo/`bar`': {
                'GET': function(){},
                'PUT': function(){}
            }
        },
        originalFail = t.fail,
        originalOk = t.ok,
        originalEqual = t.equal,
        testFramework = t;

        testFramework.fail = function(message){
            if(message === '/foo route is missing'){
                t.pass('/foo route validly missing');
                return;
            }

            originalFail.apply(this, arguments);
        };

        testFramework.ok = function(value, message){
            if(!value){
                if(message === '/foo Exists'){
                    t.pass('/foo validly missing');
                    return;
                }
            }

            originalOk.apply(this, arguments);
        };

        testFramework.equal = function(expected, actual, message){
            if(expected !== actual){
                if(message === '/foo is an object'){
                    t.pass('/foo validly undefined');
                    return;
                }
            }

            originalEqual.apply(this, arguments);
        };


    routeTester(testFramework, expectedRoutes, actualRoutes);
});

test('routeTester fails on missing route', function (t) {
    t.plan(8);

    var expectedRoutes = {
            '/foo': ['POST'],
            '/foo/`bar`': ['GET', 'PUT']
        },
        actualRoutes = {
            '/majigger': {
                'GET': function(){}
            },
            '/foo': {
                'POST': function(){}
            },
            '/foo/`bar`': {
                'GET': function(){},
                'PUT': function(){}
            }
        },
        originalFail = t.fail,
        testFramework = t;

        testFramework.fail = function(message){
            if(message === '/majigger is additional to expected routes'){
                t.pass('/majigger validly additional');
                return;
            }

            originalFail.apply(this, arguments);
        };

    routeTester(testFramework, expectedRoutes, actualRoutes);
});

test('routeTester fails on additional method', function (t) {
    t.plan(8);

    var expectedRoutes = {
            '/foo': ['POST'],
            '/foo/`bar`': ['GET', 'PUT']
        },
        actualRoutes = {
            '/foo': {
                'POST': function(){}
            },
            '/foo/`bar`': {
                'GET': function(){},
                'PUT': function(){},
                'DELETE': function(){}
            }
        },
        originalOk = t.ok,
        testFramework = t;

        testFramework.ok = function(value, message){
            if(!value){
                if(message === 'DELETE was added for /foo/`bar`'){
                    t.pass('DELETE validly missing');
                    return;
                }
            }

            originalOk.apply(this, arguments);
        };


    routeTester(testFramework, expectedRoutes, actualRoutes);
});

test('routeTester fails on missing method', function (t) {
    t.plan(7);

    var expectedRoutes = {
            '/foo': ['POST'],
            '/foo/`bar`': ['GET']
        },
        actualRoutes = {
            '/foo': {
                'POST': function(){}
            },
            '/foo/`bar`': {
                'GET': function(){},
                'PUT': function(){}
            }
        },
        originalOk = t.ok,
        testFramework = t;

        testFramework.ok = function(value, message){
            if(!value){
                if(message === 'PUT was added for /foo/`bar`'){
                    t.pass('PUT validly missing');
                    return;
                }
            }

            originalOk.apply(this, arguments);
        };


    routeTester(testFramework, expectedRoutes, actualRoutes);
});