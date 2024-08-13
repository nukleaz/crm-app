import { addClient, changeClientData, getClients } from '../api.js';
import { modalWrap } from '../constants.js';
import { svg } from '../svg-storage.js';
import {
	createLoader,
	createSmallLoader,
	removeLoader,
	removeSmallLoader,
} from '../table/loader.js';
import { render } from '../table/render.js';
import { createTooltip, editString, validateInputs } from '../utils.js';
import { createModalWindow, removeModalWindow } from './modal-window.js';

function hideAddBtn() {
	const btn = document.querySelector('.form__add-btn');
	const arr = document.querySelectorAll('.contact');
	if (arr.length > 9) {
		btn.classList.toggle('form__add-btn_hidden');
	}
}

export function createClientForm(client) {
	const form = document.createElement('form');
	const dataWrapper = document.createElement('div');
	const fieldset = document.createElement('fieldset');
	const legendWrapper = document.createElement('div');
	const legend = document.createElement('legend');
	const surnameGroup = document.createElement('div');
	const surnameInput = document.createElement('input');
	const surnameLabel = document.createElement('label');
	const nameGroup = document.createElement('div');
	const nameInput = document.createElement('input');
	const nameLabel = document.createElement('label');
	const lastNameGroup = document.createElement('div');
	const lastNameInput = document.createElement('input');
	const lastNameLabel = document.createElement('label');
	const contactsWrapper = document.createElement('div');
	const contactsList = document.createElement('div');
	const addBtn = document.createElement('button');
	const addBtnSpan = document.createElement('span');
	const submitBtn = document.createElement('button');
	const cancelBtn = modalWrap.querySelector('.cancel-btn');

	form.classList.add('form');
	dataWrapper.classList.add('form__data-wrapper');
	fieldset.classList.add('fieldset');

	legendWrapper.classList.add('legend-wrapper');
	legend.classList.add('legend', 'modal__title');
	legend.textContent = 'Новый клиент';
	surnameInput.placeholder = 'Фамилия';
	surnameInput.name = 'surname';
	surnameInput.classList.add('form__input');
	surnameInput.id = 'surname-input';
	surnameLabel.setAttribute('for', 'surname-input');
	surnameLabel.textContent = 'Фамилия';
	nameInput.placeholder = 'Имя';
	nameInput.name = 'name';
	nameInput.classList.add('form__input');
	nameInput.id = 'name-input';
	nameLabel.setAttribute('for', 'surname-input');
	nameLabel.textContent = 'Имя';
	lastNameInput.placeholder = 'Отчество';
	lastNameInput.name = 'lastName';
	lastNameInput.classList.add('form__input');
	lastNameInput.id = 'lastName-input';
	lastNameLabel.setAttribute('for', 'surname-input');
	lastNameLabel.textContent = 'Отчество';

	contactsWrapper.classList.add('contacts-wrapper');
	contactsList.classList.add('contacts');
	addBtn.classList.add('btn', 'form__add-btn');
	addBtn.type = 'button';
	addBtn.innerHTML = svg.plus;
	addBtnSpan.textContent = 'Добавить контакт';
	submitBtn.classList.add(
		'btn',
		'form__submit-btn',
		'modal__btn',
		'form__submit-btn_disabled'
	);
	submitBtn.setAttribute('type', 'submit');
	submitBtn.textContent = 'Сохранить';
	submitBtn.disabled = true;

	legendWrapper.append(legend);
	surnameGroup.append(surnameInput, surnameLabel);
	nameGroup.append(nameInput, nameLabel);
	lastNameGroup.append(lastNameInput, lastNameLabel);
	dataWrapper.append(legendWrapper, surnameGroup, nameGroup, lastNameGroup);
	addBtn.append(addBtnSpan);
	contactsWrapper.append(contactsList, addBtn);
	fieldset.append(dataWrapper, contactsWrapper, submitBtn);
	form.append(fieldset);

	const labelsArr = dataWrapper.querySelectorAll('label');
	labelsArr.forEach(label => {
		label.classList.add('form__label');
		label.parentNode.classList.add('form__group');
	});
	for (let i = 0; i < 2; i++) {
		const span = document.createElement('span');
		span.classList.add('label__span');
		span.textContent = '*';
		labelsArr[i].append(span);
	}

	function checkInputsValue() {
		if (surnameInput.value !== '' && nameInput.value !== '') {
			submitBtn.disabled = false;
			submitBtn.classList.remove('form__submit-btn_disabled');
		} else {
			submitBtn.disabled = true;
			submitBtn.classList.add('form__submit-btn_disabled');
		}
	}

	const requiredInputs = [surnameInput, nameInput];
	requiredInputs.forEach(input => {
		input.addEventListener('input', checkInputsValue);
	});

	document.querySelector('.modal__window').prepend(form);

	const validator = new JustValidate(form);
	validateInputs(validator, form);

	function createContactItem(type, value = '') {
		const contactItem = document.createElement('div');
		const dropdown = document.createElement('select');
		const inputWrap = document.createElement('div');
		let contactInput = document.createElement('input');
		const deleteContact = document.createElement('button');

		contactItem.classList.add('contacts__item', 'contact');
		dropdown.classList.add('js-choice');
		dropdown.name = 'dropdown';
		inputWrap.classList.add('form__group', 'form__group_contact');
		contactInput.classList.add('contact__input');
		contactInput.setAttribute('placeholder', 'Введите данные контакта');
		deleteContact.classList.add('btn', 'contact__delete-btn');
		deleteContact.type = 'button';
		deleteContact.innerHTML = svg.deleteContact;

		inputWrap.append(contactInput);
		contactItem.append(dropdown, inputWrap);

		function createDeleteButton() {
			contactInput.classList.add('contact__input_filled');
			contactItem.append(deleteContact);
			deleteContact.setAttribute('data-tippy-content', 'Удалить контакт');
			createTooltip(deleteContact);
		}

		const choices = new Choices(dropdown, {
			searchEnabled: false,
			itemSelectText: '',
			shouldSort: false,
			choices: [
				{ value: 'phone', label: 'Телефон' },
				{ value: 'email', label: 'Email' },
				{ value: 'vk', label: 'Vk' },
				{ value: 'fc', label: 'Facebook' },
				{ value: 'other', label: 'Другое' },
			],
		});

		function setChoiceByLabel(label) {
			const choice = choices.config.choices.find(a => a.label === label);
			if (choice) {
				choices.setChoiceByValue(choice.value);
			}
		}

		setChoiceByLabel(type);

		contactInput.maskRef = null;
		contactInput.name = dropdown.value;

		function changeMask(mask) {
			const maskOptions = {
				phone: { mask: '+{7} (000) 000-00-00' },
				email: { mask: /^[a-zA-Z0-9.,!@#$%^&*()_+-=<>?:"{}|[\]\\/'`~]*$/ },
				vk: { mask: /^[a-zA-Z0-9_.\/-]*$/ },
				fc: { mask: /^[a-zA-Z0-9_.\/-]*$/ },
				other: { mask: /.*/ },
			};
			if (contactInput.maskRef) {
				contactInput.maskRef.destroy();
			}
			contactInput.maskRef = IMask(contactInput, maskOptions[mask] || {});
		}

		function initializeMask() {
			changeMask(dropdown.value);
			contactInput.maskRef.updateValue();
		}

		initializeMask();

		changeMask(dropdown.value);

		dropdown.addEventListener('change', e => {
			validator.removeField(contactInput);
			contactInput.remove();

			contactInput = document.createElement('input');
			contactInput.classList.add('contact__input');
			contactInput.setAttribute('placeholder', 'Введите данные контакта');
			contactInput.name = e.target.value;

			if (contactItem.querySelector('.contact__delete-btn')) {
				contactItem.querySelector('.contact__delete-btn').remove();
			}

			if (contactItem.querySelector('.just-validate-error-label')) {
				contactItem.querySelector('.just-validate-error-label').remove();
			}

			inputWrap.append(contactInput);

			initializeMask();

			changeMask(e.target.value);

			validateInputs(validator, form);

			contactInput.addEventListener('input', createDeleteButton, {
				once: true,
			});
		});

		contactInput.addEventListener('input', createDeleteButton, { once: true });

		if (value !== '') {
			contactInput.value = value;
			initializeMask();
			createDeleteButton();
		}

		deleteContact.addEventListener('click', () => {
			validator.removeField(contactInput);
			hideAddBtn();
			contactItem.remove();
			if (document.querySelectorAll('.contact').length < 1) {
				document
					.querySelector('.contacts-wrapper')
					.classList.remove('contacts-wrapper_high');
			}
		});

		return contactItem;
	}

	if (client !== 'new') {
		const idSpan = document.createElement('span');
		idSpan.classList.add('form__id');
		idSpan.textContent = `ID: ${client.id}`;
		legendWrapper.append(idSpan);

		legend.textContent = 'Изменить данные';
		surnameInput.value = client.surname;
		nameInput.value = client.name;
		lastNameInput.value = client.lastName;
		checkInputsValue();

		const contactsArr = client.contacts;
		contactsArr.forEach(contact => {
			const contactItem = createContactItem(contact.type, contact.value);
			contactItem.classList.add('contacts__item_show');
			contactsList.append(contactItem);
			hideAddBtn();
		});
		validateInputs(validator, form);
	}

	const formInputs = form.querySelectorAll('.form__input');
	formInputs.forEach(input => {
		input.type = 'text';
	});

	addBtn.addEventListener('click', () => {
		contactsWrapper.classList.add('contacts-wrapper_high');
		const contactItem = createContactItem('Телефон');
		setTimeout(() => {
			contactItem.classList.add('contacts__item_show');
		}, 1);
		contactsList.append(contactItem);
		hideAddBtn();
		validateInputs(validator, form);
	});

	if (contactsList.querySelectorAll('.contact').length > 0) {
		contactsWrapper.classList.add('contacts-wrapper_high');
	}

	function createErrorMessage(error) {
		if (fieldset.querySelector('.error-span')) {
			fieldset.querySelector('.error-span').remove();
		}
		const errorSpan = document.createElement('span');
		errorSpan.classList.add('error-span');
		errorSpan.textContent = error;
		fieldset.insertBefore(errorSpan, submitBtn);
	}

	validator.onSuccess(async () => {
		submitBtn.classList.add('modal__btn_expanded');
		createSmallLoader(submitBtn);
		modalWrap.querySelectorAll('input, button').forEach(el => {
			el.disabled = true;
		});
		if (form.querySelector('.choices')) {
			form.querySelectorAll('.choices').forEach(el => {
				el.classList.add('choices_disabled');
			});
		}

		if (client === 'new') {
			const name = editString(nameInput.value);
			const surname = editString(surnameInput.value);
			const lastName = editString(lastNameInput.value);
			const contacts = [];

			contactsList.querySelectorAll('.contact').forEach(element => {
				contacts.push({
					type: element.querySelector('select').textContent,
					value: element.querySelector('input').value,
				});
			});

			const newClient = { name, surname, lastName, contacts };

			try {
				await addClient(newClient, createErrorMessage);
			} catch (error) {
				removeSmallLoader(submitBtn);
				createErrorMessage(error.message);
				contactsWrapper.classList.add('contacts-wrapper_error');
				modalWrap.querySelectorAll('input, button').forEach(el => {
					el.disabled = false;
				});
				if (form.querySelector('.choices')) {
					form.querySelectorAll('.choices').forEach(el => {
						el.classList.remove('choices_disabled');
					});
				}
				return;
			}
		} else {
			client.name = editString(nameInput.value);
			client.surname = editString(surnameInput.value);
			client.lastName = editString(lastNameInput.value);
			client.contacts.length = 0;

			contactsList.querySelectorAll('.contact').forEach(element => {
				client.contacts.push({
					type: element.querySelector('select').textContent,
					value: element.querySelector('input').value,
				});
			});

			try {
				await changeClientData(client);
			} catch (error) {
				removeSmallLoader(submitBtn);
				createErrorMessage(error.message);
				contactsWrapper.classList.add('contacts-wrapper_error');
				modalWrap.querySelectorAll('input, button').forEach(el => {
					el.disabled = false;
				});
				if (form.querySelector('.choices')) {
					form.querySelectorAll('.choices').forEach(el => {
						el.classList.remove('choices_disabled');
					});
				}
				return;
			}
		}

		removeModalWindow();

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

	form.addEventListener('submit', async e => {
		e.preventDefault();
		validator.validate();
	});

	return form;
}
