(function () {
	require.config({
		baseUrl: "../src"
	});

	require(["../test/suites/basic",
		'../test/qunit-extend',
		'qunit'
	], function(BasicTests) {
		QUnit.config.autoload = false;
		QUnit.config.autostart = false;
		BasicTests.run();
		QUnit.load();
		QUnit.start();
	});
}());
