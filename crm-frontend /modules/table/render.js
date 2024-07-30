import {
	arrowIcons,
	idBtn,
	lettersIcon,
	tableList,
	thBtns,
	thSpans,
} from '../constants.js';
import { createTooltip, sortClients } from '../utils.js';
import { createClient } from './client.js';

let currentClients = [];

export function render(arr, sort = { prop: 'id', dir: 'asc' }) {
	tableList.innerHTML = '';

	const arrCopy = [...arr];
	if (currentClients !== arr) {
		resetArrowDirections();
	}
	currentClients = arrCopy;

	sortClients(arrCopy, sort.prop, sort.dir);
	arrCopy.forEach(obj => {
		if (!obj.hasOwnProperty('fullName')) {
			Object.defineProperty(obj, 'fullName', {
				get() {
					return `${obj.surname} ${obj.name} ${obj.lastName}`.trim();
				},
				enumerable: true,
			});
		}
		createClient(obj);
	});

	createTooltip(document.querySelectorAll('.icons__item'));
}

export function addThBtnsListeners() {
	thBtns.forEach(btn => {
		const thSpan = btn.querySelector('.th__span');
		const arrowIcon = btn.querySelector('.arrow-icon');

		btn.addEventListener('click', async () => {
			thSpans.forEach(span => {
				span.classList.remove('th__span_active');
			});
			arrowIcons.forEach(arrow => {
				arrow.classList.remove('arrow-icon_active');
			});
			lettersIcon.classList.remove('letters-icon_active');

			thSpan.classList.add('th__span_active');
			arrowIcon.classList.add('arrow-icon_active');
			if (btn.contains(lettersIcon)) {
				lettersIcon.classList.add('letters-icon_active');
			}

			const col = btn.getAttribute('data-col');
			const dir = btn.getAttribute('data-dir');
			const newDir = dir === 'asc' ? 'desc' : 'asc';
			btn.setAttribute('data-dir', newDir);
			render(currentClients, { prop: col, dir: newDir });
			if (newDir !== 'asc') {
				arrowIcon.classList.add('arrow-icon_rotate');
			} else {
				arrowIcon.classList.remove('arrow-icon_rotate');
			}
		});
	});
}

export function resetArrowDirections() {
	thBtns.forEach(btn => {
		const thSpan = btn.querySelector('.th__span');
		const arrowIcon = btn.querySelector('.arrow-icon');
		lettersIcon.classList.remove('letters-icon_active');
		if (btn === idBtn) {
			thSpan.classList.add('th__span_active');
			arrowIcon.classList.add('arrow-icon_active');
			arrowIcon.classList.remove('arrow-icon_rotate');
		} else {
			btn.setAttribute('data-dir', 'desc');
			thSpan.classList.remove('th__span_active');
			arrowIcon.classList.remove('arrow-icon_active');
			arrowIcon.classList.add('arrow-icon_rotate');
		}
	});
}
