require.config({
	baseUrl: '../',
	shim: {
		'underscore': {
			exports: '_'
		},
		'tree' : {
			exports: 'Tree'
		},
		'qunit' : {
			exports: 'QUnit'
		}
	},
	paths: {
		'underscore': 'bower_components/underscore/underscore',
		'qunit': 'bower_components/qunit/qunit/qunit',
		'tree': 'src/tree'
	}
});

require([
	'test/suites/basic', 'test/qunit-extend'
], function(BasicTests) {
	QUnit.config.autoload = false;
	QUnit.config.autostart = false;
	BasicTests.run();
	QUnit.load();
	QUnit.start();
});
