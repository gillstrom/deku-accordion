/** @jsx dom */
import dom from 'magic-virtual-element';

const propTypes = {
	active: {
		type: 'number'
	},
	class: {
		type: 'string'
	},
	collapsed: {
		type: 'boolean'
	},
	items: {
		type: 'array'
	}
};

function initialState() {
	return {
		active: -1
	};
}

function afterMount({props}, el, setState) {
	const {active, collapsed} = props;

	if (typeof active === 'number' && !collapsed) {
		setState({active});
		return;
	}

	if (!collapsed) {
		setState({active: 0});
	}
}

function render({props, state}, setState) {
	const {items} = props;
	const {active} = state;

	function setActive(i) {
		setState({active: active === i ? -1 : i});
	}

	function getElements() {
		return items.map((el, i) => {
			return (
				<div class={['Accordion-element', {'Accordion-element--active': active === i}]}>
					<div class='Accordion-heading' onClick={() => setActive(i)}>
						{el.heading}
					</div>
					<div class='Accordion-content'>
						{el.content}
					</div>
				</div>
			);
		});
	}

	return (
		<div class={['Accordion', props.class]}>
			{getElements()}
		</div>
	);
}

export default {afterMount, initialState, propTypes, render};
