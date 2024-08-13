import { getClients } from './modules/api.js';
import { addClientBtn, searchInput } from './modules/constants.js';
import { createModalWindow } from './modules/modal-form/modal-window.js';
import { createLoader, removeLoader } from './modules/table/loader.js';
import { addThBtnsListeners, render } from './modules/table/render.js';
import { debouncedDisplayOptions } from './modules/table/search.js';

start();

async function start() {
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
	addThBtnsListeners();
}

addClientBtn.addEventListener('click', () => {
	createModalWindow('add');
});

searchInput.addEventListener('input', debouncedDisplayOptions);
