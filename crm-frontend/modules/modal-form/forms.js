import { renderTable } from '../../main.js';
import { addClient, clients } from '../api.js';
import { svgFiles } from '../svg-storage.js';
import { createClient } from '../table/client.js';

const addBtn = document.querySelector('.add-btn');

function createClientForm(div) {
	const form = document.createElement('form');
	const dataWrapper = document.createElement('div');
	const fieldset = document.createElement('fieldset');
	const legend = document.createElement('legend');
	const surnameInput = document.createElement('input');
	const nameInput = document.createElement('input');
	const lastNameInput = document.createElement('input');
	const addWrapper = document.createElement('div');
	const contacts = document.createElement('div');
	const addBtn = document.createElement('button');
	const addBtnSpan = document.createElement('span');
	const addSvg = svgFiles.addSvg;
	const submitBtn = document.createElement('button');

	surnameInput.placeholder = 'Фамилия';
	surnameInput.name = 'surname';
	surnameInput.classList.add('form__input');
	surnameInput.id = 'surname-input';
	nameInput.placeholder = 'Имя';
	nameInput.name = 'name';
	nameInput.classList.add('form__input');
	nameInput.id = 'name-input';
	lastNameInput.placeholder = 'Отчество';
	lastNameInput.name = 'lastName';
	lastNameInput.classList.add('form__input');
	lastNameInput.id = 'lastName-input';

	form.action = ' ';

	form.classList.add('form');
	dataWrapper.classList.add('form__data-wrapper');
	fieldset.classList.add('fieldset');
	legend.classList.add('legend', 'modal__title');
	legend.textContent = 'Новый клиент';
	addWrapper.classList.add('form__add-wrapper');
	addBtn.classList.add('btn', 'form__add-btn');
	addBtn.innerHTML = addSvg;
	addBtnSpan.textContent = 'Добавить контакт';
	submitBtn.classList.add('btn', 'form__submit-btn', 'modal__btn');
	submitBtn.setAttribute('type', 'submit');
	submitBtn.textContent = 'Сохранить';

	dataWrapper.append(legend, surnameInput, nameInput, lastNameInput);
	addBtn.append(addBtnSpan);
	addWrapper.append(contacts, addBtn);
	fieldset.append(dataWrapper, addWrapper, submitBtn);
	form.append(fieldset);
	div.prepend(form);

	form.querySelectorAll('.form__input').forEach(element => {
		element.type = 'text';
	});

	addBtn.addEventListener('click', e => {
		e.preventDefault();
		addWrapper.classList.add('form__add-wrapper_high');

		const contactWrapper = document.createElement('div');
		const dropdown = document.createElement('select');
		const dropdownPhone = document.createElement('option');
		const dropdownEmail = document.createElement('option');
		const dropdownVk = document.createElement('option');
		const dropdownFacebook = document.createElement('option');
		const dropdownOther = document.createElement('option');
		const contactInput = document.createElement('input');
		const deleteContact = document.createElement('button');

		contactWrapper.classList.add('contact-wrapper');
		dropdown.classList.add('js-choice');
		dropdown.name = 'dropdown';
		dropdownPhone.innerHTML = 'Телефон';
		dropdownEmail.innerHTML = 'Email';
		dropdownVk.innerHTML = 'Vk';
		dropdownFacebook.innerHTML = 'Facebook';
		dropdownOther.innerHTML = 'Другое';
		contactInput.classList.add('form__contact-input');
		contactInput.name = 'contact-input';
		contactInput.placeholder = 'Введите данные контакта';
		deleteContact.classList.add('btn', 'delete-contact-btn');
		deleteContact.innerHTML = svgFiles.deleteContact;

		dropdown.append(
			dropdownPhone,
			dropdownEmail,
			dropdownVk,
			dropdownFacebook,
			dropdownOther
		);

		contactWrapper.append(dropdown, contactInput, deleteContact);
		contacts.append(contactWrapper);

		const choices = new Choices(dropdown, {
			searchEnabled: false,
			itemSelectText: '',
			shouldSort: false,
		});
	});

	form.addEventListener('submit', async e => {
		e.preventDefault();

		const name = nameInput.value;
		const surname = surnameInput.value;
		const lastName = lastNameInput.value;
		const contactsArr = [];

		document.querySelectorAll('.contact-wrapper').forEach(element => {
			contactsArr.push({
				type: element.querySelector('select').value,
				value: element.querySelector('input').value,
			});
		});

		const client = await addClient(
			createClient(document.querySelector('.table__list'), {
				name: name,
				surname: surname,
				lastName: lastName,
				contacts: contactsArr,
			})
		);
		clients.push(client);
		renderTable(clients);
	});
}

export { addBtn, createClientForm };
