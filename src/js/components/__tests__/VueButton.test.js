'use strict';

import { shallowMount, mount } from '@vue/test-utils';
import VueButton from '../VueButton.vue';


/* Helper function that mounts and returns the rendered component */
function getMountedComponent(Component, propsData) {
	return shallowMount(Component, { propsData });
}




describe('Render', () => {

	test('can be a button', (done) => {
		expect(mount(VueButton, {
			propsData: {
				href: null
			}
		}).element.tagName).toBe('BUTTON');

		done();
	});

	test('can be a anchor tag', (done) => {
		expect(mount(VueButton, {
			propsData: {
				href: 'link'
			}
		}).element.tagName).toBe('A');

		done();
	});
});

describe('Props', () => {

	let props = {
			id: 'test-button',
			label: 'button',
			buttonClasses: ['a', 'b', 'c'],
			iconClasses: ['d', 'e', 'f'],
			error: true, success: true, warning: true,
			block: true, flat: true, round: true, shadow: true,
		},
		comp = getMountedComponent(VueButton, props);

	test('should have correct id', (done) => {
		expect(comp.element.id).toBe(props.id);
		done();
	});

	test('should have correct label', (done) => {
		expect(comp.text()).toBe(props.label);
		done();
	});

	test('should have correct classes', (done) => {
		props.buttonClasses.forEach((cls) => {
			expect(comp.classes()).toContain(cls);
		});
		props.iconClasses.forEach((cls) => {
			expect(comp.find('i').classes()).toContain(cls);
		});
		done();
	});

	test('should have correct attributes', (done) => {
		expect(comp.element.id).toBe(props.id);
		[
			'error', 'success', 'warning',
			'block', 'flat', 'semi-round', 'shadow',
			'medium',
		].forEach((cls) => {
			expect(comp.classes()).toContain('vue-button--' + cls);
		});
		done();
	});
});

describe('Events', () => {

	let onClick = jest.fn(),
		props = {
			onClick: onClick,
			emitOnClick: true,
		},
		comp = mount(VueButton, { propsData: props });

	comp.trigger('click');

	test('should have on click listener', (done) => {
		expect(onClick).toHaveBeenCalled();
		done();
	});

	test('should emit event on click', (done) => {
		expect(comp.emitted().onClick).toBeTruthy();
		done();
	});


	const reset = (el) => {
		el.mock.calls = [];
	};

	test('should not trigger on click when disabled', (done) => {
		reset(onClick);
		comp.setProps({ loading: false, disabled: true, submitOnError: false, error: false, href: null });
		comp.trigger('click');

		expect(onClick).not.toHaveBeenCalled();
		done();
	});

	test('should not trigger on click when loading', (done) => {
		reset(onClick);
		comp.setProps({ loading: true, disabled: false, submitOnError: false, error: false, href: null });
		comp.trigger('click');

		expect(onClick).not.toHaveBeenCalled();
		done();
	});

	test('should not trigger on click on error state', (done) => {
		reset(onClick);
		comp.setProps({ loading: false, disabled: false, submitOnError: false, error: true, href: null });
		comp.trigger('click');

		expect(onClick).not.toHaveBeenCalled();
		done();
	});

	test('should not trigger on click on anchor type', (done) => {
		reset(onClick);
		comp.setProps({ loading: false, disabled: false, submitOnError: false, error: false, href: 'link' });
		comp.trigger('click');

		expect(onClick).not.toHaveBeenCalled();
		done();
	});
});