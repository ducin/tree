define([
	'underscore', 'qunit', 'tree'
], function(_, QUnit, Tree) {
	var QUnitExtend = {
		deepStructureCorrect: function(tree) {
			for (var i = 0; i < tree.length; i++) {
				QUnit.ok(Tree.prototype.isPrototypeOf(tree.childrenOf(tree[i])));
			}
		}
	};

	_.extend(QUnit, QUnitExtend);
});
