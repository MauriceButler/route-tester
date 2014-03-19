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
