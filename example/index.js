/** @jsx dom */
import dom from 'magic-virtual-element';
import {render, tree} from 'deku';
import Accordion from '../';

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

const app = tree(
	<Accordion active={[1, 2]} class='TestClass' items={items}/>
);

render(app, document.body);
