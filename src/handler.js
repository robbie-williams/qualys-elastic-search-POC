var qualys = require('./intent/gatherer/QualysApplicationVulnerabilityCountGatherer');
var messages = require('./static/messages');
var read = require('readline-sync');

var application = read.question('Name an application or vulnerability to query: ');

qualys(application, function (err, hostCount) {
const speechOutput = messages.GET_FACT_MESSAGE + 'There are a total of ' + hostCount +
    ' assets affected by ' + application + ' related vulnerabilities';
console.log(speechOutput);
});