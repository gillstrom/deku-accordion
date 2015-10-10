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
		heading: 'Heading 2'
	}, {
		content: <div>Content 3</div>,
		heading: 'Heading 3'
	}];

	return (
		<Accordion active={[0, 1]} items={items} multiple/>
	);
}
```


## Attributes

* `active` sets the initial active items
* `class` adds classes to the component
* `items` is the array of accordion elements
* `multiple` lets you have several items open at once

## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
