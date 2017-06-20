/** @jsx dom */
import deepEqual from 'deep-equal';
import dom from 'magic-virtual-element';

const propTypes = {
	class: {
		type: 'string'
	},
	collapsed: {
		type: 'boolean'
	},
	items: {
		type: 'array'
	},
	multiple: {
		type: 'boolean'
	},
	onClick: {
		type: 'function'
	}
};

const initialState = () => ({
	active: []
});

const handleSetActive = (obj, {el, i}, onClick, setState) => {
	setState(obj);

	if (onClick) {
		onClick(obj.active, {...el, i, isOpen: obj.active.includes(i)});
	}
};

const setActive = (i, {el, multiple, onClick}, {active}, setState) => () => {
	const index = active.indexOf(i);

	if (!multiple) {
		if (index !== -1) {
			handleSetActive({active: []}, {el, i}, onClick, setState);
			return;
		}

		handleSetActive({active: [i]}, {el, i}, onClick, setState);
		return;
	}

	if (index !== -1) {
		active.splice(index, 1);
		handleSetActive({active}, {el, i}, onClick, setState);
		return;
	}

	active.push(i);
	handleSetActive({active}, {el, i}, onClick, setState);
};

const getElements = ({items, multiple, onClick}, {active}, setState) => items.map((x, i) => (
	<div key={i} class={['Accordion-element', {'Accordion-element--active': active.includes(i)}]}>
		<div class='Accordion-heading' onClick={setActive(i, {x, multiple, onClick}, {active}, setState)}>
			{x.heading}
		</div>
		<div class='Accordion-content'>
			{x.content}
		</div>
	</div>
));

const setItems = ({items, multiple}, setState) => {
	let active = [];

	for (const [x, i] of items.entries()) {
		if (!x.active) {
			continue;
		}

		if (!multiple) {
			active = [i];
			continue;
		}

		active.push(i);
	}

	setState({active});
};

const afterMount = ({props}, el, setState) => setItems(props, setState);
const afterUpdate = ({props}, prevProps, prevState, setState) => !deepEqual(props, prevProps) && setItems(props, setState);

const render = ({props, state}, setState) => (
	<div class={['Accordion', props.class]}>
		{getElements(props, state, setState)}
	</div>
);

export default {afterMount, afterUpdate, initialState, propTypes, render};
