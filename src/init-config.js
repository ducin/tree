var require = {
	shim: {
		"underscore": {
			exports: "_"
		},
		'tree' : {
			exports: 'Tree'
		},
		'qunit' : {
			exports: 'QUnit',
			init: function() {
				this.QUnit.config.autostart = false;
				return this.QUnit;
			}
		}
	},
	paths: {
		'underscore': 'vendor/js/underscore',
		'qunit': 'vendor/js/qunit',
	}
};
