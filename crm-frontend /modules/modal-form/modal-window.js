import { deleteClient, getClients } from '../api.js';
import { addClientBtn, modalWrap } from '../constants.js';
import { svg } from '../svg-storage.js';
import {
	createLoader,
	createSmallLoader,
	removeLoader,
} from '../table/loader.js';
import { render } from '../table/render.js';
import { trapFocus } from '../utils.js';
import { createClientForm } from './form.js';

export function removeModalWindow() {
	modalWrap.firstChild.classList.add('modal__window_close');
	setTimeout(() => {
		modalWrap.classList.remove('modal_active');
		addClientBtn.classList.remove('add-client-btn_disabled');
	}, 200);
	setTimeout(() => {
		modalWrap.classList.remove('modal_visible');
		addClientBtn.disabled = false;
		modalWrap.innerHTML = '';
	}, 500);
}

export function createModalWindow({ type, client = 'new', errorMessage = '' }) {
	modalWrap.innerHTML = '';
	addClientBtn.disabled = true;
	addClientBtn.classList.add('add-client-btn_disabled');

	const modalWindow = document.createElement('div');
	const closeBtn = document.createElement('button');
	const cancelbtn = document.createElement('button');

	modalWindow.classList.add('modal__window');
	modalWindow.setAttribute('tabindex', '0');
	cancelbtn.classList.add('btn', 'cancel-btn');
	cancelbtn.textContent = 'Отмена';
	closeBtn.classList.add('btn', 'modal__close-btn');
	closeBtn.innerHTML = svg.close;

	modalWindow.append(cancelbtn, closeBtn);
	modalWrap.append(modalWindow);

	modalWrap.classList.add('modal_visible');
	setTimeout(() => {
		modalWrap.classList.add('modal_active');
	}, 10);

	closeBtn.addEventListener('click', removeModalWindow);

	cancelbtn.addEventListener('click', removeModalWindow);

	if (type === 'delete' || type === 'error') {
		const textWrap = document.createElement('div');
		const title = document.createElement('h2');
		const span = document.createElement('span');

		textWrap.classList.add('modal__text-wrap');
		title.classList.add('modal__title');
		span.classList.add('modal__span');

		if (type === 'delete') {
			const deleteBtn = document.createElement('button');

			title.textContent = 'Удалить клиента';
			span.innerHTML = 'Вы действительно хотите удалить <br> данного клиента?';
			deleteBtn.classList.add('btn', 'modal__btn', 'modal__delete-btn');
			deleteBtn.textContent = 'Удалить';

			modalWindow.prepend(deleteBtn);

			deleteBtn.addEventListener('click', async () => {
				deleteBtn.classList.add('modal__btn_expanded');
				createSmallLoader(deleteBtn);
				try {
					await deleteClient(client);
					removeModalWindow();
				} catch (error) {
					createModalWindow({ type: 'error', errorMessage: error.message });
					return;
				}

				createLoader();
				try {
					const clients = await getClients();
					render(clients);
				} catch (error) {
					createModalWindow({ type: 'error', errorMessage: error.message });
					return;
				} finally {
					removeLoader();
				}
			});
		} else if (type === 'error') {
			closeBtn.remove();
			title.textContent = 'Ошибка';
			span.textContent = errorMessage;
			cancelbtn.textContent = 'Перезагрузить страницу';
			cancelbtn.addEventListener('click', () => {
				location.reload();
			});
		}
		textWrap.append(title, span);
		modalWindow.prepend(textWrap);
	} else {
		createClientForm(client);
		if (client !== 'new') {
			cancelbtn.textContent = 'Удалить';
			cancelbtn.removeEventListener('click', removeModalWindow);
			cancelbtn.addEventListener('click', () => {
				modalWindow.classList.add('modal__window_close');
				setTimeout(() => {
					createModalWindow({ type: 'delete', client: client.id });
				}, 300);
			});
		}
	}

	setTimeout(() => {
		if (type === 'error') {
			return;
		}
		function handleClick(e) {
			if (e.target === modalWrap) {
				removeModalWindow();
				document.removeEventListener('click', handleClick);
			}
		}

		document.addEventListener('click', handleClick);
	}, 500);

	setTimeout(() => {
		modalWindow.classList.add('modal__window_active');
	}, 10);

	trapFocus(modalWindow);
}
