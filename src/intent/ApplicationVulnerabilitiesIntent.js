var qualys = require('./gatherer/QualysApplicationVulnerabilityCountGatherer');
var messages = require('../static/messages');

module.exports = function () {
    var application = alexa.event.request.intent.slots.Application.value;
    qualys(application, function (err, hostCount) {
        const speechOutput = messages.GET_FACT_MESSAGE + 'There are a total of ' + hostCount +
            ' assets affected by ' + application + ' related vulnerabilities';
        console.log(speechOutput);
    });