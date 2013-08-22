'use strict';
define(
	['underscore', 'qunit', 'tree'],
	function(_, QUnit, Tree) {

	return {
		run: function() {

			QUnit.module('tree test module');

			QUnit.test('constructor', function() {
				var tree = new Tree();
				QUnit.ok(_.isEmpty(tree.children), 'children are empty');
				QUnit.ok(Tree.prototype.isPrototypeOf(tree));
				QUnit.ok(tree.constructor === Tree);
			});

			QUnit.test('modify in place: push, pop, shift, unshift', function() {
				var tree = new Tree(), len, el;

				len = tree.push(1);
				QUnit.ok(len === 1);

				len = tree.push(2, 3, 4);
				QUnit.ok(len === 4);
				QUnit.ok(tree[0] === 1);
				QUnit.ok(tree[tree.length - 1] === 4);
				QUnit.deepStructureCorrect(tree);

				el = tree.pop();
				QUnit.ok(el.element === 4);
				QUnit.ok(el.children.length === 0);
				QUnit.ok(tree.length === 3);
				QUnit.ok(tree[0] === 1);
				QUnit.ok(tree[tree.length - 1] === 3);
				QUnit.deepStructureCorrect(tree);

				len = tree.unshift(5, 6);
				QUnit.ok(len === 5);
				QUnit.ok(tree[0] === 5);
				QUnit.ok(tree[tree.length - 1] === 3);
				QUnit.deepStructureCorrect(tree);

				el = tree.shift();
				QUnit.ok(el.element === 5);
				QUnit.ok(el.children.length === 0);
				QUnit.ok(tree.length === 4);
				QUnit.ok(tree[0] === 6);
				QUnit.ok(tree[tree.length - 1] === 3);
				QUnit.deepStructureCorrect(tree);
			});

			QUnit.test('nested modifications', function() {
				var tree = new Tree(), len, el;
				len = tree.push(5, 6, 4);
				QUnit.ok(len === 3);
				QUnit.deepStructureCorrect(tree);

				var childrenOf5 = tree.childrenOf(5);
				len = childrenOf5.push(2, 3);
				QUnit.ok(childrenOf5.length === 2);
				QUnit.ok(len === 2);
				QUnit.deepStructureCorrect(childrenOf5);

				el = childrenOf5.shift();
				QUnit.ok(el.element === 2);
				QUnit.ok(el.children.length === 0);
				QUnit.ok(childrenOf5.length === 1);

				var childrenOf5childrenOf3 = childrenOf5.childrenOf(3);
				QUnit.ok(childrenOf5childrenOf3.length == 0);
				QUnit.deepStructureCorrect(childrenOf5childrenOf3);
			});

			QUnit.test('flatten', function() {
				var tree = new Tree();
				tree.push(5, 7, 4, 6);
				tree.childrenOf(5).push(8, 9);
				tree.childrenOf(6).push(10, 11);
				QUnit.deepEqual(tree.flatten(), [5, 8, 9, 7, 4, 6, 10, 11]);

				var valueOrder = function(a, b) { return a - b; };
				tree.sort(valueOrder);
				QUnit.deepEqual(tree.flatten(), [4, 5, 8, 9, 6, 10, 11, 7]);

				tree.reverse();
				QUnit.deepEqual(tree.flatten(), [7, 6, 11, 10, 5, 9, 8, 4]);
			});

			QUnit.test('sort & reverse', function() {
				var tree = new Tree();
				tree.push(2, 4, 1, 3);
				tree.childrenOf(1).push(37, 65, 22, 9);
				tree.childrenOf(2).push(21, 8, 43, 72);
				tree.childrenOf(3).push(10, 51);

				var valueOrder = function(a, b) { return a-b; };
				tree.sort(valueOrder);
				QUnit.deepEqual(tree.nodes(), [1, 2, 3, 4]);
				QUnit.deepEqual(tree.childrenOf(1).nodes(), [9, 22, 37, 65]);
				QUnit.deepEqual(tree.childrenOf(2).nodes(), [8, 21, 43, 72]);
				QUnit.deepEqual(tree.childrenOf(3).nodes(), [10, 51]);
				QUnit.deepEqual(tree.childrenOf(4).nodes(), []);
				QUnit.deepEqual(tree.flatten(), [1, 9, 22, 37, 65, 2, 8, 21, 43, 72, 3, 10, 51, 4]);

				tree.reverse();
				QUnit.deepEqual(tree.nodes(), [4, 3, 2, 1]);
				QUnit.deepEqual(tree.childrenOf(1).nodes(), [65, 37, 22, 9]);
				QUnit.deepEqual(tree.childrenOf(2).nodes(), [72, 43, 21, 8]);
				QUnit.deepEqual(tree.childrenOf(3).nodes(), [51, 10]);
				QUnit.deepEqual(tree.childrenOf(4).nodes(), []);
				QUnit.deepEqual(tree.flatten(), [4, 3, 51, 10, 2, 72, 43, 21, 8, 1, 65, 37, 22, 9]);
			});
		}
	}
});
