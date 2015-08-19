var Firebase      = require('firebase');
var Q             = require('q');

var accessRef = new Firebase('https://insta-food-locator.firebaseio.com');

function getAccessToken (username) {

    return accessRef.once('value', function (snapshot) {
        console.log('accessRef.snapshot', snapshot.val());
    });
}

function testQ () {
    var deferred = Q.defer();

    setTimeout(function () {
        deferred.resolve('elisa');
    }, 1000);

    return deferred.promise;
}

function saveAccessToken (username, accessToken) {

    

}

module.exports = {
    getAccessToken: getAccessToken,
    saveAccessToken: saveAccessToken,
    testQ: testQ
};
