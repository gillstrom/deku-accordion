/** @jsx dom */
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
	}
};

const initialState = () => {
	return {
		active: []
	};
};

const setActive = (i, multiple, active, setState) => () => {
	const index = active.indexOf(i);

	if (!multiple) {
		if (index !== -1) {
			setState({active: []});
			return;
		}

		setState({active: [i]});
		return;
	}

	if (index !== -1) {
		active.splice(index, 1);
		setState({active});
		return;
	}

	active.push(i);
	setState({active});
};

const getElements = (items, active, multiple, setState) => items.map((el, i) => (
	<div class={['Accordion-element', {'Accordion-element--active': active.indexOf(i) > -1}]}>
		<div class='Accordion-heading' onClick={setActive(i, multiple, active, setState)}>
			{el.heading}
		</div>
		<div class='Accordion-content'>
			{el.content}
		</div>
	</div>
));

const afterMount = ({props}, el, setState) => {
	const {items, multiple} = props;
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

const render = ({props, state}, setState) => {
	const {items, multiple} = props;
	const {active} = state;

	return (
		<div class={['Accordion', props.class]}>
			{getElements(items, active, multiple, setState)}
		</div>
	);
};

export default {afterMount, initialState, propTypes, render};
