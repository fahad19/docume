# DocuMe

[![Build Status](https://secure.travis-ci.org/fahad19/docume.png?branch=master)](http://travis-ci.org/fahad19/docume)

Generate documentation in README from source files.

## Install

```
$ npm install -g docume
```

(The usage documentation below is generated via DocuMe itself. See the source of `bin/docume` file.)

<!--docume:bin/docume-->
# Usage

Put some placeholders in your README file first:

```
# My README

Some line here...

<!--docume:path/to/source.js-->
<!--/docume:path/to/source.js-->

Author Name
```

It is expected that your source file would have Markdown formatted documentation as single-line comments:

```js
/* path/to/source.js */

// this is a line that will be copied to README
var str = 'Hello World';
```

Now run the command:

```
$ docume README.md
```
<!--/docume:bin/docume-->

# License

MIT © [Fahad Ibnay Heylaal](http://fahad19.com)
