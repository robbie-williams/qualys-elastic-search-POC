var request = require('request');
var XML2JS = require('xml2js');
var fs = require('fs');
var _ = require('underscore');
var tough = require('tough-cookie');

var authUnenc;
try {
    authUnenc = '' + fs.readFileSync('src/resources/auth/qualysBasicAuth.base64.txt');
    authUnenc = Buffer.from(authUnenc.substring(0, authUnenc.length - 2), 'base64');
} catch (err) {
    authUnenc = null;
    console.log(err);
}

var createSessionOptions = {
    method: 'POST',
    url: 'https://qualysapi.qg1.apps.qualys.in/api/2.0/fo/session/',
    headers: {
        'Cache-Control': 'no-cache',
        'X-Requested-With': 'azserfvghnjuytrfcxserfgvbhytgbnj',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    },
    formData: {
        action: 'login',
        username: (authUnenc + '').split(':')[0],
        password: (authUnenc + '').split(':')[1]
    }
};

var sessionCookie;

var logoutSessionOptions = {
    method: 'POST',
    url: 'https://qualysapi.qg1.apps.qualys.in/api/2.0/fo/session/',
    headers: {
        'Cache-Control': 'no-cache',
        'X-Requested-With': 'HeyRobbie! nib IT Security Personal Assistant.',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        cookie: null
    },
    formData: {
        action: 'logout'
    },

};

module.exports.login = function (callback) {
    if (authUnenc == null) {
        console.log('Auth Unenc: ' + authUnenc);
        return callback(new Error("No authentication found"), null);
    }
    request(createSessionOptions, function (error, response, body) {
        if (error) return callback(error, null);
        XML2JS.parseString(body, function (err, jsonResult) {
            if (typeof jsonResult.SIMPLE_RETURN.RESPONSE.CODE !== 'undefined') {
                return callback(new Error('A login failure occurred.'), null);
            }


            var rawcookies = response.headers['set-cookie'];
            for (var i in rawcookies) {
                var cookie = tough.parse(rawcookies[i]);
                if (cookie.key == 'QualysSession') {
                    sessionCookie = cookie;
                }
            }
            return callback(null, sessionCookie.value);
        });
    });
};

module.exports.logout = function (callback) {
    if (!sessionCookie == null) {
        return callback(new Error("No session"), null);
    }
    logoutSessionOptions.headers.cookie = sessionCookie;

    request(logoutSessionOptions, function (error, response, body) {
        if (error) return callback(error, null);
        XML2JS.parseString(body, function (err, jsonResult) {
            if (typeof jsonResult.SIMPLE_RETURN.RESPONSE.CODE !== 'undefined') {
                return callback(new Error('A login failure occurred.'));
            }
            return callback(null);
        });
    });
};

module.exports.getSession = function (callback) {
    if (!sessionCookie == null) {
        return callback(new Error("No session"), null);
    }
    return callback(null, sessionCookie);
}