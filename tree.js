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

Tree.prototype.pop = function() {
	var element = Array.prototype.pop.call(this),
		children = this.children[element];
	delete this.children[element];
	return {
		element: element,
		children: children
	};
};

Tree.prototype.shift = function() {
	var element = Array.prototype.shift.call(this),
		children = this.children[element];
	delete this.children[element];
	return {
		element: element,
		children: children
	};
};

Tree.prototype.unshift = function() {
	Array.prototype.unshift.apply(this, arguments);
	var args = Array.prototype.slice.call(arguments);
	for (var i = 0; i < args.length; i++) {
		this.children[args[i]] = new Tree();
	}
	return this.length;
};

/**
 * This method can be chained, e.g.
 * tree.childrenOf(el1).childrenOf(el2) etc.
 */
Tree.prototype.childrenOf = function(element) {
	return this.children[element];
};

Tree.prototype.sort = function(compareFunction) {
	// first, sort myself
	if (this.length > 1)
		Array.prototype.sort.call(this, compareFunction);
	// then, recursively sort all children subtrees by accessing
	// this.children map where the key is the index of element in this array
	for (var i = 0; i < this.length; i++) {
		this.children[this[i]].sort(compareFunction);
	}
};

Tree.prototype.reverse = function() {
	// first, reverse myself
	if (this.length > 1)
		Array.prototype.reverse.call(this);
	// then, recursively reverse all children subtrees by accessing
	// this.children map where the key is the index of element in this array
	for (var i = 0; i < this.length; i++) {
		this.children[this[i]].reverse();
	}
};

/**
 * Returns flattened list join.
 * @param separator String
 * @return String
 */
/*
Tree.prototype.join = function(separator) {
	return Array.prototype.join.call(Tree.prototype.flatten.call(this), separator);
};
*/

/**
 * Dumps tree into a flat list, preserving all levels ordering.
 * This function is recursive and takes one argument. From the outside it
 * should be called without any parameters
 * @return Array
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

