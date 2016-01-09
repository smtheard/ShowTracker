var logic = require('../build/js/logic.js');

exports.testCanary = function(test) {
	test.ok(true);
	test.done();
};

exports.testCreateShowReturnsJsonObjWithShowData = function(test) {
	var result = logic.createShow('Breaking Bad', 4, 13);
	test.deepEqual({"showName": 'Breaking Bad', "seasons": 4, "episodes": 13}, result);
	test.done();
};