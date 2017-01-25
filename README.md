# file-line-parse [![Travis](https://img.shields.io/travis/brh55/file-line-parse.svg?style=flat-square)](https://travis-ci.org/brh55/file-line-parse) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)

> Parse a property delimited file, line-by-line, and return the line in a JavaScript array in object representation.
> 
> **fileLineParse(📄) => [ {}, {}, {} ]**

## Install

`$ npm install --save file-line-parse` **OR** `$ yarn add file-line-parse`

## Usage
```javascript
// CATS_DATA.csv:
// Bubbles,Persian,24,honey-brown
// Garfield,Tabby,33,orange with stripes
const fileLineParse = require('file-line-parse');
const input = './data/CATS_DATA.csv';
const keys = [ 'name', 'breed', 'age', 'color'];
fileLineParse(input, keys)
.then(cats => {
    console.log(cats[0])
    // { name: 'Bubbles', breed: 'Persian', age: '24', color: 'honey-brown' }

    console.log(cats[1])
    // { name: 'Garfield', breed: 'Tabby', age: '33', color: 'orange with stripes' }
});
```

## API
### fileLineParse(input, keys, [options])
Return a `set` of parsed objects dictacted by sequence of keys

#### input | [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
Path to file to be input.

#### keys | [`<array>[<string> | <int>]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Indexed_collections_Arrays_and_typed_Arrays)
An array of keys to serve as mapping for object creation.

#### options | [`<object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Normal_objects_and_functions)
##### options.delimiter | [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
Specify the delimiter to be used. `Default: ","`

## Related
:arrows_counterclockwise: [objects-to-file](https://github.com/brh55/objects-to-file) - Create a delimited value, output file from an array of objects.

## License
MIT
