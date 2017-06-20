# deku-accordion [![Build Status](https://travis-ci.org/gillstrom/deku-accordion.svg?branch=master)](https://travis-ci.org/gillstrom/deku-accordion)

> Accordion component for deku


## Install

```
$ npm install --save deku-accordion
```


## Usage

```js
import Accordion from 'deku-accordion';

export function render() {
	const items = [{
		content: <div>Content 1</div>,
		heading: 'Heading 1'
	}, {
		content: <div>Content 2</div>,
		heading: 'Heading 2',
		active: true
	}, {
		content: <div>Content 3</div>,
		heading: 'Heading 3',
		active: true
	}];

	return (
		<Accordion items={items} multiple/>
	);
}
```


## Attributes

* `class` adds classes to the component
* `items` is the array of accordion elements
* `multiple` lets you have several items open at once
* `onClick` returns currently active indexes and clicked item

## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
