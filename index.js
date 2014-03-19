module.exports = function(t, expectedRoutes, testRoutes){
    var expectedKeys = Object.keys(expectedRoutes);

    for (var i = 0; i < expectedKeys.length; i++) {
        t.ok(testRoutes[expectedKeys[i]], expectedKeys[i] + ' Exists');

        t.equal(typeof testRoutes[expectedKeys[i]], 'object', expectedKeys[i] + ' is an object');

        var actualKeys = Object.keys(testRoutes[expectedKeys[i]]);

        for (var j = 0; j < actualKeys.length; j++) {
            t.ok(~expectedRoutes[expectedKeys[i]].indexOf(actualKeys[j]), actualKeys[j] + ' was added for ' + expectedKeys[i]);
        }
    }
};