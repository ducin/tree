/**
 * This list represents single level list of elements.
 * Each of elements has a children list (which is one level below).
 */
function Tree() {
	this.children = {};
}

Tree.prototype = [];

Tree.prototype.push = function() {
	Array.prototype.push.apply(this, arguments);
	var args = Array.prototype.slice.call(arguments);
	for (var i = 0; i < args.length; i++) {
		this.children[args[i]] = new Tree();
	}
	return this.length;
};

/**
 * Arguments are not important.
 */
Tree.prototype.pop = function() {
	var element = Array.prototype.pop.call(this),
		children = this.children[element];
	return {
		element: element,
		children: children
	};
};

Tree.prototype.getChildren = function(element) {
	return this.children[element];
};

Tree.prototype.sort = function() {
	// first, sort myself
	if (this.length > 1)
		Array.prototype.sort.call(this);
	// then, recursively sort all children subtrees by accessing
	// this.children map where the key is the index of element in this array
	for (var i = 0; i < this.length; i++) {
		this.children[this[i]].sort();
	}
};

Tree.prototype.push = function(node) {
	if (typeof node !== 'object')
		throw new Error('Only objects can be elements of this list');
	Array.prototype.push.call(this, node);
}

/**
 * Dumps tree into a flat list, preserving all levels ordering.
 * This function is recursive and takes one argument. From the outside it
 * should be called without any parameters
 */
Tree.prototype.flatten = function() {
	var resultList = [], self = this;
	return (function flattenRecursive(returnList) {
		console.log(self);
		for (var i = 0; i < self.length; i++) {
			resultList.push(self[i]);
			flattenRecursive(childList);
		}
		return resultList;
	}());
}

