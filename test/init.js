(function () {
	require.config({
		baseUrl: "../src"
	});

	var tests = [
		"../test/suites/basic"
	],
	others = [
		'../test/qunit-extend',
		'qunit'
	];

	require(tests.concat(others), function(){
		QUnit.load();
		QUnit.start();
	});
}());
