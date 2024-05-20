import { clients } from './modules/api.js';
import { addBtn, createClientForm } from './modules/modal-form/forms.js';
import { createModalWindow } from './modules/modal-form/modal-windows.js';
import { createClient } from './modules/table/client.js';
import { createClientsTable } from './modules/table/table.js';

renderTable(clients);

export function renderTable(arr) {
	createClientsTable();

	arr.forEach(obj => {
		createClient(document.querySelector('tbody'), obj);
	});

	addBtn.addEventListener('click', () => {
		createModalWindow(createClientForm);
	});
}

console.log(clients);
