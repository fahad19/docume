'use strict';

var fs = require('fs');
var updateSection = require('update-section');

module.exports = {
	process: function (file) {
		var content = fs.readFileSync(file, {
			encoding: 'utf-8'
		});

		var lines = content.split('\n');
		var self = this;

		var sources = [];
		lines.forEach(function (line) {
			if (line.indexOf('<!--docume:') === 0) {
				var sourceFile = self.getSourceFromComment(line);
				if (!fs.existsSync(sourceFile)) {
					return true;
				}

				sources.push(sourceFile);
			}

			return true;
		});

		var updated = content;
		sources.forEach(function (source) {
			var sourceDoc = self.getSourceDoc(source);
			var start = '<!--docume:' + source + '-->';
			var end = '<!--/docume:' + source + '-->';
			updated = updateSection(updated, [
				start,
				sourceDoc,
				end
			].join('\n'), function (line) {
				return line.indexOf(start) === 0;
			}, function (line) {
				return line.indexOf(end) === 0;
			});
			return updated;
		});

		return fs.writeFileSync(file, updated);
	},

	getSourceFromComment: function (comment) {
		return comment.split('docume:')[1].split('-->')[0];
	},

	getSourceDoc: function (source) {
		var content = fs.readFileSync(source, {
			encoding: 'utf-8'
		});
		var lines = [];
		content.split('\n').forEach(function (line) {
			if (line.indexOf('//') === 0) {
				var doc = line.substr(2);
				lines.push(doc.trim());
			}
		});

		return lines.join('\n');
	}
};
