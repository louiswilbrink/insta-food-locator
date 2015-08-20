var Firebase      = require('firebase');
var Q             = require('q');

var userAccessTokensRef = new Firebase('https://insta-food-locator.firebaseio.com/user_access_tokens');

function getAccessToken (username) {
    var accessTokensRef = new Firebase('https://insta-food-locator.firebaseio.com/user_access_tokens');
    var deferred = Q.defer();

    // Retrieve the user_access_tokens object.
    // key - usernames
    // val - accessTokens
    accessTokensRef.once('value', function (snapshot) {
        var accessTokens = snapshot.val();

        if (accessTokens[username]) {
            // Return the user's accessToken.
            deferred.resolve(accessTokens[username]);
        }
        else {
            // No accessToken found for this user.
            deferred.resolve(null);
        }
    }, function (error) {
        // There was an error retrieving the user_access_tokens object.
        deferred.reject(error);
    });

    return deferred.promise;
}

function test () {
}

function saveAccessToken (username, accessToken) {
    var isSaved = Q.defer();

    // Create reference to user in user_access_tokens.
    userAccessTokensRef.child(username).set(accessToken, function (error) {
        if (!error) {
            isSaved.resolve(true);
        }
        else {
            isSaved.reject(error);
        }
    });

    return isSaved.promise;
}

module.exports = {
    getAccessToken: getAccessToken,
    saveAccessToken: saveAccessToken,
    test: test
};
