import { getClients } from '../api.js';
import { createModalWindow } from '../modal-form/modal-window.js';
import { filterClients } from '../utils.js';
import { createLoader, removeLoader } from './loader.js';
import { render } from './render.js';

async function displayOptions() {
	removeLoader();
	createLoader();
	try {
		const arr = await getClients();
		const filterArr = filterClients(arr, this.value);
		if (filterArr.length === 0) {
			const wrap = document.querySelector('.loader__wrap');
			const span = document.createElement('span');

			wrap.innerHTML = '';
			span.classList.add('loader__span');
			span.textContent = 'Совпадений не найдено...';

			wrap.append(span);
			return;
		}
		render(filterArr);
		removeLoader();
	} catch (error) {
		removeLoader();
		createModalWindow({ type: 'error', errorMessage: error.message });
	}
}

function debounce(func, delay) {
	let timeoutId;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};
}

export const debouncedDisplayOptions = debounce(displayOptions, 300);
