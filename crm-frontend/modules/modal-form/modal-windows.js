import { svgFiles } from '../svg-storage.js';
import { addBtn } from './forms.js';

const modalWrap = document.createElement('div');

function removeModalWindow() {
	modalWrap.remove();
	modalWrap.innerHTML = '';
	addBtn.disabled = false;
}

function createModalWindow(cb) {
	removeModalWindow();
	addBtn.disabled = true;
	const modalWindow = document.createElement('div');
	const closeBtn = document.createElement('button');
	const cancelBtn = document.createElement('button');

	modalWrap.classList.add('modal');
	modalWindow.classList.add('modal__window');
	cancelBtn.classList.add('btn', 'cancel-btn');
	cancelBtn.textContent = 'Отмена';
	closeBtn.classList.add('btn', 'modal__close-btn');
	closeBtn.innerHTML = svgFiles.closeSvg;

	modalWindow.append(closeBtn, cancelBtn);
	modalWrap.append(modalWindow);
	document.body.append(modalWrap);

	cb(modalWindow);

	closeBtn.addEventListener('click', () => {
		removeModalWindow();
	});

	cancelBtn.addEventListener('click', () => {
		removeModalWindow();
	});

	document.addEventListener('click', e => {
		if (e.target === modalWrap) {
			removeModalWindow();
		}
	});
}

function createDeleteWindow(div) {
	const title = document.createElement('h2');
	const span = document.createElement('span');
	const btn = document.createElement('button');

	title.classList.add('modal__title');
	title.textContent = 'Удалить клиента';
	span.classList.add('modal__span');
	span.innerHTML = 'Вы действительно хотите удалить <br> данного клиента?';
	btn.classList.add('btn', 'modal__btn', 'modal__delete-btn');
	btn.textContent = 'Удалить';

	div.prepend(title, span, btn);
}

export { createDeleteWindow, createModalWindow, removeModalWindow };
