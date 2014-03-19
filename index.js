function getAdditionalKeys(array1, array2) {
    return array1.filter(function(key) {
        return array2.indexOf(key) === -1;
    });
}

module.exports = function(t, expectedRoutes, actualRoutes){
    var expectedKeys = Object.keys(expectedRoutes),
        actualRouteKeys = Object.keys(actualRoutes),
        missingKeys = getAdditionalKeys(expectedKeys, actualRouteKeys),
        additionalKeys = getAdditionalKeys(actualRouteKeys, expectedKeys),
        i = 0;

    if(missingKeys.length){
        for (i = 0; i < missingKeys.length; i++) {
            t.fail(missingKeys[i] + ' route is missing');
        }
    }

    if(additionalKeys.length){
        for (i = 0; i < additionalKeys.length; i++) {
            t.fail(additionalKeys[i] + ' is additional to expected routes');
        }
    }

    for (i = 0; i < expectedKeys.length; i++) {
        t.ok(actualRoutes[expectedKeys[i]], expectedKeys[i] + ' Exists');

        t.equal(typeof actualRoutes[expectedKeys[i]], 'object', expectedKeys[i] + ' is an object');

        var actualKeys = Object.keys(actualRoutes[expectedKeys[i]] || {});

        for (var j = 0; j < actualKeys.length; j++) {
            t.ok(~expectedRoutes[expectedKeys[i]].indexOf(actualKeys[j]), actualKeys[j] + ' was added for ' + expectedKeys[i]);
        }
    }
};