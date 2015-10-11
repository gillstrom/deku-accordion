/** @jsx dom */
import dom from 'magic-virtual-element';

const propTypes = {
	active: {
		type: 'array'
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
		active: []
	};
}

function afterMount({props}, el, setState) {
	const {active} = props;

	if (Array.isArray(active)) {
		setState({active});
	}
}

function render({props, state}, setState) {
	const {items, multiple} = props;
	const {active} = state;

	function setActive(i) {
		const index = active.indexOf(i);

		if (!multiple) {
			setState({active: [i]});
			return;
		}

		if (index > -1) {
			active.splice(index, 1);
			setState({active});
			return;
		}

		active.push(i);
		setState({active});
	}

	function getElements() {
		return items.map((el, i) => {
			return (
				<div class={['Accordion-element', {'Accordion-element--active': active.indexOf(i) > -1}]}>
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
