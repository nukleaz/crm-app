import { tableList } from '../constants.js';
import { createModalWindow } from '../modal-form/modal-window.js';
import { contactsSvg, svg } from '../svg-storage.js';
import { formatDate, formatTime } from '../utils.js';
import { createSmallLoader, removeSmallLoader } from './loader.js';

export function createClient({
	id,
	name,
	surname,
	lastName,
	createdAt,
	updatedAt,
	contacts,
}) {
	const clientItem = document.createElement('tr');
	const clientId = document.createElement('td');
	const idSpan = document.createElement('span');
	const clientFio = document.createElement('td');
	const fullNameSpan = document.createElement('span');
	const clientDateCreate = document.createElement('td');
	const dateCreateWrap = document.createElement('div');
	const dateCreateSpan = document.createElement('span');
	const timeCreateSpan = document.createElement('span');
	const dateChangesWrap = document.createElement('div');
	const clientDateChanges = document.createElement('td');
	const dateChangesSpan = document.createElement('span');
	const timeChangesSpan = document.createElement('span');
	const clientContacts = document.createElement('td');
	const contactsList = document.createElement('ul');
	const clientActions = document.createElement('td');
	const btnsWrapper = document.createElement('div');
	const changeBtn = document.createElement('button');
	const changeSvgWrap = document.createElement('div');
	const changeSpan = document.createElement('span');
	const deleteBtn = document.createElement('button');
	const deleteSvgWrap = document.createElement('div');
	const deleteSpan = document.createElement('span');

	clientItem.classList.add('table__row', 'row');
	clientItem.id = id;
	clientContacts.classList.add('table__contacts');
	contactsList.classList.add('table__contacts-icons', 'icons');
	btnsWrapper.classList.add('actions');
	changeBtn.classList.add('btn', 'actions__btn', 'change-btn');
	changeSvgWrap.classList.add('actions__svg-wrap');
	changeSvgWrap.innerHTML = svg.change;
	changeSpan.textContent = 'Изменить';
	deleteBtn.classList.add('btn', 'actions__btn', 'delete-btn');
	deleteSvgWrap.classList.add('actions__svg-wrap');
	deleteSvgWrap.innerHTML = svg.delete;
	deleteSpan.textContent = 'Удалить';

	idSpan.classList.add('cell__span_light', 'cell__span_id');
	idSpan.textContent = id;
	fullNameSpan.textContent = `${surname} ${name} ${lastName}`.trim();
	dateCreateWrap.classList.add('date-wrap');
	dateChangesWrap.classList.add('date-wrap');
	dateCreateSpan.textContent = formatDate(createdAt);
	timeCreateSpan.classList.add('cell__span', 'cell__span_light');
	timeCreateSpan.textContent = formatTime(createdAt);

	dateChangesSpan.textContent = formatDate(updatedAt);
	timeChangesSpan.classList.add('cell__span', 'cell__span_light');
	timeChangesSpan.textContent = formatTime(updatedAt);

	if (contacts.length > 0) {
		contacts.forEach(contact => {
			const contactItem = document.createElement('li');
			const contactLink = document.createElement('a');
			contactItem.classList.add('icons__item');
			contactLink.classList.add('icons__link');

			contactItem.setAttribute(
				'data-tippy-content',
				`${contact.type}: ${contact.value}`
			);

			if (contact.type === 'Телефон') {
				contactLink.setAttribute('href', `tel:${contact.value}`);
				contactLink.innerHTML = contactsSvg.phone;
			} else if (contact.type === 'Vk') {
				contactLink.setAttribute('href', `https://${contact.value}`);
				contactLink.innerHTML = contactsSvg.vk;
			} else if (contact.type === 'Email') {
				contactLink.setAttribute('href', `mailto:${contact.value}`);
				contactLink.innerHTML = contactsSvg.email;
			} else if (contact.type === 'Facebook') {
				contactLink.setAttribute('href', `https://${contact.value}`);
				contactLink.innerHTML = contactsSvg.fc;
			} else {
				contactLink.setAttribute('href', '#');
				contactLink.innerHTML = contactsSvg.other;
			}
			contactItem.append(contactLink);
			contactsList.append(contactItem);
		});
	}

	clientId.append(idSpan);
	clientFio.append(fullNameSpan);
	dateCreateWrap.append(dateCreateSpan, timeCreateSpan);
	clientDateCreate.append(dateCreateWrap);
	dateChangesWrap.append(dateChangesSpan, timeChangesSpan);
	clientDateChanges.append(dateChangesWrap);
	changeBtn.append(changeSvgWrap, changeSpan);
	deleteBtn.append(deleteSvgWrap, deleteSpan);
	btnsWrapper.append(changeBtn, deleteBtn);
	clientContacts.append(contactsList);

	if (contacts.length > 4) {
		const showContactsBtn = document.createElement('btn');
		showContactsBtn.classList.add('btn', 'show-contacts-btn');
		showContactsBtn.textContent = `+${contacts.length - 4}`;

		contactsList.append(showContactsBtn);

		showContactsBtn.setAttribute('tabindex', 0);
		showContactsBtn.addEventListener('click', () => {
			contactsList.classList.add('icons_visability');
			setTimeout(() => {
				contactsList.classList.add('icons_open');
			}, 10);
			showContactsBtn.style.display = 'none';
		});
	}

	clientActions.append(btnsWrapper);
	clientItem.append(
		clientId,
		clientFio,
		clientDateCreate,
		clientDateChanges,
		clientContacts,
		clientActions
	);

	tableList.append(clientItem);

	clientItem.querySelectorAll('span').forEach(span => {
		span.classList.add('cell__span');
	});

	tableList.querySelectorAll('td').forEach(td => {
		td.classList.add('table__cell', 'cell');
	});

	deleteBtn.addEventListener('click', () => {
		deleteSvgWrap.remove();
		createSmallLoader(deleteBtn);
		deleteBtn.firstChild.classList.add('small-loader-wrap_delete');
		setTimeout(() => {
			removeSmallLoader(deleteBtn);
			deleteSvgWrap.classList.remove('small-loader-wrap_delete');
			deleteBtn.prepend(deleteSvgWrap);
		}, 500);
		createModalWindow({ type: 'delete', client: id });
	});

	changeBtn.addEventListener('click', () => {
		changeSvgWrap.remove();
		createSmallLoader(changeBtn);
		setTimeout(() => {
			removeSmallLoader(changeBtn);
			changeBtn.prepend(changeSvgWrap);
		}, 500);
		createModalWindow({
			type: 'change',
			client: {
				id,
				name,
				surname,
				lastName,
				contacts,
			},
		});
	});

	return {
		id,
		name,
		surname,
		lastName,
		createdAt,
		updatedAt,
		contacts,
	};
}
