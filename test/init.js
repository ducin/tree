require.config({
	baseUrl: '../src',
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
		'underscore': 'vendor/js/underscore',
		'qunit': 'vendor/js/qunit',
	}
});

require(['../test/suites/basic',
	'../test/qunit-extend',
	'init-config'
], function(BasicTests) {
	QUnit.config.autoload = false;
	QUnit.config.autostart = false;
	BasicTests.run();
	QUnit.load();
	QUnit.start();
});
