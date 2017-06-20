import assertElement from 'assert-element';
import componentMock from 'component-mock';
import test from 'ava';
import m from '.';

const items = [{
	content: 'Content 1',
	heading: 'Heading 1'
}, {
	content: 'Content 2',
	heading: 'Heading 2'
}, {
	content: 'Content 3',
	heading: 'Heading 3'
}];

test(() => {
	const mock = componentMock(m);
	const el = mock.render({props: {items}});

	assertElement.isNode(el, 'div');
	assertElement.hasClass(el, 'Accordion');
	assertElement.hasChildren(el, 3);
	assertElement.hasChildren(el, child => {
		assertElement.isNode(child, 'div');
		assertElement.hasChildren(child);
	});
});
