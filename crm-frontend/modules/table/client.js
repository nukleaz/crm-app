import { clients, deleteClient } from '../api.js';
import {
	createDeleteWindow,
	createModalWindow,
	removeModalWindow,
} from '../modal-form/modal-windows.js';
import { contactsImg, svgFiles } from '../svg-storage.js';
import { formatDate, formatTime } from '../utils.js';

export function createClient(
	table,
	{ id, name, surname, lastName, createdAt, updatedAt, contacts }
) {
	const client = document.createElement('tr');
	const clientId = document.createElement('td');
	const clientFio = document.createElement('td');
	const clientDateCreate = document.createElement('td');
	const dateCreateSpan = document.createElement('span');
	const timeCreateSpan = document.createElement('span');
	const clientDateChanges = document.createElement('td');
	const dateChangesSpan = document.createElement('span');
	const timeChangesSpan = document.createElement('span');
	const clientContacts = document.createElement('td');
	const contactsList = document.createElement('ul');
	const clientActions = document.createElement('td');
	const btnsWrapper = document.createElement('div');
	const changeBtn = document.createElement('button');
	const deleteBtn = document.createElement('button');
	const changeSpan = document.createElement('span');
	const deleteSpan = document.createElement('span');

	client.classList.add('table__row');
	clientContacts.classList.add('contacts');
	contactsList.classList.add('contacts__list');
	btnsWrapper.classList.add('actions');
	changeBtn.classList.add('btn', 'actions__btn', 'change-btn');
	changeBtn.innerHTML = svgFiles.changeSvg;
	changeSpan.textContent = 'Изменить';
	deleteBtn.classList.add('btn', 'actions__btn', 'delete-btn');
	deleteBtn.innerHTML = svgFiles.deleteSvg;
	deleteSpan.textContent = 'Удалить';

	clientId.textContent = id;
	clientFio.textContent = `${surname} ${name} ${lastName}`;
	dateCreateSpan.textContent = formatDate(createdAt);
	timeCreateSpan.textContent = formatTime(createdAt);
	dateChangesSpan.textContent = formatDate(updatedAt);
	timeChangesSpan.textContent = formatTime(updatedAt);
	// clientContacts.innerHTML = contacts
	// 	.map(e => {
	// 		if (e.type === 'Телефон') return contactsImg.phone;
	// 		else if (e.type === 'Vk') return contactsImg.vk;
	// 		else if (e.type === 'Email') return contactsImg.Email;
	// 		else if (e.type === 'Facebook') return contactsImg.fc;
	// 		else {
	// 			return contactsImg.other;
	// 		}
	// 	})
	// 	.join(' ');

	contacts.forEach(element => {
		const contactItem = document.createElement('li');
		contactItem.classList.add('contacts__item');

		if (element.type === 'Телефон') contactItem.innerHTML = contactsImg.phone;
		else if (element.type === 'Vk') contactItem.innerHTML = contactsImg.vk;
		else if (element.type === 'Vk') contactItem.innerHTML = contactsImg.Email;
		else if (element.type === 'Vk') contactItem.innerHTML = contactsImg.fc;
		else contactItem.innerHTML = contactsImg.other;

		contactsList.append(contactItem);
	});

	clientDateCreate.append(dateCreateSpan, timeCreateSpan);
	clientDateChanges.append(dateChangesSpan, timeChangesSpan);
	changeBtn.append(changeSpan);
	deleteBtn.append(deleteSpan);
	btnsWrapper.append(changeBtn, deleteBtn);
	clientContacts.append(contactsList);

	if (contacts.length > 4) {
		const showContactsBtn = document.createElement('btn');
		showContactsBtn.classList.add('btn');
		showContactsBtn.textContent = `+${contacts.length - 4}`;
		clientContacts.append(showContactsBtn);

		showContactsBtn.addEventListener('click', () => {
			contactsList.classList.toggle('contacts__list_open');
			showContactsBtn.style.display = 'none';
		});
	}

	clientActions.append(btnsWrapper);
	client.append(
		clientId,
		clientFio,
		clientDateCreate,
		clientDateChanges,
		clientContacts,
		clientActions
	);

	table.append(client);

	table.querySelectorAll('td').forEach(element => {
		element.classList.add('table__cell');
	});

	deleteBtn.addEventListener('click', () => {
		createModalWindow(createDeleteWindow);
		document
			.querySelector('.modal__delete-btn')
			.addEventListener('click', async () => {
				await deleteClient(id);
				clients.splice(clients[id], 1);
				client.remove();
				removeModalWindow();
			});
	});

	changeBtn.addEventListener('click', () => {});

	return {
		name,
		surname,
		lastName,
		contacts,
	};
}
