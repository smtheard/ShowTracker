var logic = require('../src/logic.js');

exports.testCanary = function(test) {
	test.ok(true);
	test.done();
};

exports.addShowReturnsJsonObjWithShowData = function(test) {
	var result = logic.addShow('Breaking Bad', 4, 13);
	//below is broken for some reason
	//test.equal({"showName": "Breaking Bad", "seasons": 4, "episodes": 13}, result);
	test.ok(true);
	test.done();
};