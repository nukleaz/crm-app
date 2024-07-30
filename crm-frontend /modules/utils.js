export function formatDate(date) {
	return new Date(date).toLocaleDateString('en-GB').replace(/\//g, '.');
}

export function formatTime(date) {
	return new Date(date).toLocaleTimeString('en-GB', {
		hour: 'numeric',
		minute: 'numeric',
		hourCycle: 'h23',
	});
}

export function editString(string) {
	return (
		string.trim().charAt(0).toUpperCase() + string.trim().toLowerCase().slice(1)
	);
}

export function filterClients(arr, value) {
	const searchValue = value.replace(/[ ,\(\)]/g, '').toLowerCase();

	return arr.filter(obj => {
		const fullName = (obj.surname + obj.name + obj.lastName).toLowerCase();
		const contacts = obj.contacts.map(contact =>
			contact.value.replace(/[ ,\(\)]/g, '').toLowerCase()
		);

		return (
			fullName.includes(searchValue) || contacts.join('').includes(searchValue)
		);
	});
}

export function validateInputs(validator, form) {
	const surnameInput = document.getElementById('surname-input');
	const nameInput = document.getElementById('name-input');
	const lastNameInput = document.getElementById('lastName-input');
	const phoneInputs = form.querySelectorAll('[name="phone"]');
	const emailInputs = form.querySelectorAll('[name="email"]');
	const vkInputs = form.querySelectorAll('[name="vk"]');
	const fcInputs = form.querySelectorAll('[name="fc"]');
	const otherInputs = form.querySelectorAll('[name="other"]');

	validator
		.addField(surnameInput, [
			{
				rule: 'required',
				errorMessage: 'Обязательное поле',
			},
			{
				rule: 'customRegexp',
				value: /^[А-Яа-яЁё\s]+$/,
				errorMessage: 'Введите корректную фамилию',
			},
		])
		.addField(nameInput, [
			{
				rule: 'required',
				errorMessage: 'Обязательное поле',
			},
			{
				rule: 'customRegexp',
				value: /^[А-Яа-яЁё\s]+$/,
				errorMessage: 'Введите корректное имя',
			},
		])
		.addField(lastNameInput, [
			{
				rule: 'customRegexp',
				value: /^[А-Яа-яЁё\s]*$/,
				errorMessage: 'Введите корректное отчество',
			},
		]);

	if (phoneInputs.length > 0) {
		phoneInputs.forEach(input => {
			validator.addField(input, [
				{
					rule: 'required',
					errorMessage: 'Заполните поле',
				},
				{
					validator: phoneNumber => {
						return phoneNumber.replace(/\D/g, '').length >= 11;
					},
					errorMessage: 'Введите номер до конца',
				},
			]);
		});
	}

	if (emailInputs.length > 0) {
		emailInputs.forEach(input => {
			validator.addField(input, [
				{
					rule: 'required',
					errorMessage: 'Заполните поле',
				},
				{
					rule: 'email',
					errorMessage: 'Введите корректный email',
				},
			]);
		});
	}

	if (vkInputs.length > 0) {
		vkInputs.forEach(input => {
			validator.addField(input, [
				{
					rule: 'required',
					errorMessage: 'Заполните поле',
				},
				{
					rule: 'custom',
					validator: value => {
						const regex = /^((https?:\/\/)?(www\.)?vk\.com\/.+)/i;
						return regex.test(value);
					},
					errorMessage: 'Введите корректный URL vk.com',
				},
			]);
		});
	}

	if (fcInputs.length > 0) {
		fcInputs.forEach(input => {
			validator.addField(input, [
				{
					rule: 'required',
					errorMessage: 'Заполните поле',
				},
				{
					rule: 'custom',
					validator: value => {
						const regex = /^((https?:\/\/)?(www\.)?facebook\.com\/.+)/i;
						return regex.test(value);
					},
					errorMessage: 'Введите корректный URL facebook.com',
				},
			]);
		});
	}

	if (otherInputs.length > 0) {
		otherInputs.forEach(input => {
			validator.addField(input, [
				{
					rule: 'required',
					errorMessage: 'Заполните поле',
				},
			]);
		});
	}

	return validator;
}

export function sortClients(arr, prop, dir = 'asc') {
	return arr.sort((a, b) => {
		if (dir === 'asc') {
			return a[prop] > b[prop] ? 1 : -1;
		} else {
			return a[prop] < b[prop] ? 1 : -1;
		}
	});
}

export function createTooltip(elements) {
	tippy(elements, {
		animation: 'scale',
		interactive: true,
		trigger: 'mouseenter focusin',
		touch: ['hold', 400],
	});
}

export function trapFocus(element) {
	element.focus();
	const focusableEls = element.querySelectorAll(
		'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
	);
	const firstFocusableEl = focusableEls[0];
	const lastFocusableEl = focusableEls[focusableEls.length - 1];
	let keyCodeTab = 9;

	element.addEventListener('keydown', function (e) {
		const isTabPressed = e.key === 'Tab' || e.keyCode === keyCodeTab;

		if (!isTabPressed) {
			return;
		}

		if (e.shiftKey) {
			if (document.activeElement === firstFocusableEl) {
				lastFocusableEl.focus();
				e.preventDefault();
			}
		} else {
			if (document.activeElement === lastFocusableEl) {
				firstFocusableEl.focus();
				e.preventDefault();
			}
		}
	});
}
