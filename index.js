module.exports = function(t, expectedRoutes, actualRoutes){
    var expectedKeys = Object.keys(expectedRoutes);

    for (var i = 0; i < expectedKeys.length; i++) {
        t.ok(actualRoutes[expectedKeys[i]], expectedKeys[i] + ' Exists');

        t.equal(typeof actualRoutes[expectedKeys[i]], 'object', expectedKeys[i] + ' is an object');

        var actualKeys = Object.keys(actualRoutes[expectedKeys[i]] || {});

        // console.log(expectedKeys.length, actualKeys.length)
        for (var j = 0; j < actualKeys.length; j++) {
            t.ok(~expectedRoutes[expectedKeys[i]].indexOf(actualKeys[j]), actualKeys[j] + ' was added for ' + expectedKeys[i]);
        }
    }
};