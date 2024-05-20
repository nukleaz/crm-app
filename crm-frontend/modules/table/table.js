import { svgFiles } from '../svg-storage.js';

export function createClientsTable() {
	const table = document.querySelector('table');
	const caption = document.createElement('caption');
	const thead = document.createElement('thead');
	const tr = document.createElement('tr');
	const idTh = document.createElement('th');
	const idBtn = document.createElement('button');
	const idSpan = document.createElement('span');
	const fioTh = document.createElement('th');
	const fioBtn = document.createElement('button');
	const fioSpan = document.createElement('span');
	const fioPurpleSpan = document.createElement('span');
	const dateOfCreateTh = document.createElement('th');
	const dateOfCreateBtn = document.createElement('button');
	const dateOfChangeTh = document.createElement('th');
	const dateOfChangeBtn = document.createElement('button');
	const contactsTh = document.createElement('th');
	const actionsTh = document.createElement('th');
	const tbody = document.createElement('tbody');

	table.innerHTML = '';
	caption.classList.add('table__caption');
	caption.textContent = 'Клиенты';
	thead.classList.add('table__titles');
	tbody.classList.add('table__list');

	idTh.innerHTML = svgFiles.arrowSvg;
	idTh.dataset.col = 'id';
	contactsTh.textContent = 'Контакты';
	actionsTh.textContent = 'Действия';

	idBtn.classList.add('btn', 'id-btn', 'th__btn');
	idBtn.textContent = 'ID';
	fioBtn.classList.add('btn', 'fio-btn', 'th__btn');
	fioBtn.innerHTML = svgFiles.arrowSvg;
	fioSpan.textContent = 'Фамилия Имя Отчество';
	fioPurpleSpan.classList.add('purple-span');
	fioPurpleSpan.textContent = 'А-Я';
	dateOfCreateBtn.classList.add('btn', 'date-of-create-btn', 'th__btn');
	dateOfCreateTh.innerHTML = svgFiles.arrowSvg;
	dateOfCreateBtn.textContent = 'Дата и время создания';
	dateOfChangeBtn.classList.add('btn', 'date-of-change-btn', 'th__btn');
	dateOfChangeBtn.textContent = 'Последние изменения';
	dateOfChangeTh.innerHTML = svgFiles.arrowSvg;

	idTh.append(idBtn);
	fioBtn.append(fioSpan, fioPurpleSpan);
	fioTh.append(fioBtn);
	dateOfCreateTh.append(dateOfCreateBtn);
	dateOfChangeTh.append(dateOfChangeBtn);
	tr.append(idTh, fioTh, dateOfCreateTh, dateOfChangeTh, contactsTh, actionsTh);
	thead.append(tr);
	table.append(caption, thead, tbody);

	thead.querySelectorAll('th').forEach(element => {
		element.classList.add('table__title', 'th');
	});
}
