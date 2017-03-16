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

const initialState = () => {
	return {
		active: []
	};
};

const handleSetActive = (obj, onClick, setState) => {
	setState(obj);

	if (onClick) {
		onClick(obj.active);
	}
};

const setActive = (i, {multiple, onClick}, {active}, setState) => () => {
	const index = active.indexOf(i);

	if (!multiple) {
		if (index !== -1) {
			handleSetActive({active: []}, onClick, setState);
			return;
		}

		handleSetActive({active: [i]}, onClick, setState);
		return;
	}

	if (index !== -1) {
		active.splice(index, 1);
		handleSetActive({active}, onClick, setState);
		return;
	}

	active.push(i);
	handleSetActive({active}, onClick, setState);
};

const getElements = ({items, multiple, onClick}, {active}, setState) => items.map((el, i) => (
	<div class={['Accordion-element', {'Accordion-element--active': active.indexOf(i) > -1}]}>
		<div class='Accordion-heading' onClick={setActive(i, {multiple, onClick}, {active}, setState)}>
			{el.heading}
		</div>
		<div class='Accordion-content'>
			{el.content}
		</div>
	</div>
));

const setItems = ({items, multiple}, setState) => {
	let active = [];

	items.forEach((el, i) => {
		if (!el.active) {
			return;
		}

		if (!multiple) {
			active = [i];
			return;
		}

		active.push(i);
	});

	setState({active});
};

const afterMount = ({props}, el, setState) => setItems(props, setState);
const afterUpdate = ({props}, prevProps, prevState, setState) => !deepEqual(props, prevProps) && setItems(props, setState);

const render = ({props, state}, setState) => {
	return (
		<div class={['Accordion', props.class]}>
			{getElements(props, state, setState)}
		</div>
	);
};

export default {afterMount, afterUpdate, initialState, propTypes, render};
