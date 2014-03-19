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
    t.plan(6);

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
        originalOk = t.ok,
        originalEqual = t.equal,
        testFramework = t;

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