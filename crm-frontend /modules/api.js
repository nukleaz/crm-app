const url = `http://localhost:3000`;

async function handleError(response) {
	if (!response.ok) {
		const errorData = await response.json();
		const errorMessages = errorData.errors.map(err => err.message).join(', ');
		throw new Error(errorMessages || 'Что-то пошло не так...');
	}
}

export async function getClients() {
	try {
		const response = await fetch(`${url}/api/clients`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});

		await handleError(response);

		return await response.json();
	} catch (error) {
		if (error.message === 'Failed to fetch') {
			throw new Error('Сервер не доступен');
		} else {
			throw new Error(error.message);
		}
	}
}

export async function addClient(client) {
	try {
		const response = await fetch(`${url}/api/clients`, {
			method: 'POST',
			body: JSON.stringify(client),
			headers: { 'Content-Type': 'application/json' },
		});

		await handleError(response);

		return await response.json();
	} catch (error) {
		if (error.message === 'Failed to fetch') {
			throw new Error('Сервер не доступен');
		} else {
			throw new Error(error.message);
		}
	}
}

export async function deleteClient(id) {
	try {
		const response = await fetch(`${url}/api/clients/${id}`, {
			method: 'DELETE',
		});

		await handleError(response);

		return await response.json();
	} catch (error) {
		if (error.message === 'Failed to fetch') {
			throw new Error('Сервер не доступен');
		} else {
			throw new Error(error.message);
		}
	}
}

export async function changeClientData(client) {
	try {
		const response = await fetch(`${url}/api/clients/${client.id}`, {
			method: 'PATCH',
			body: JSON.stringify(client),
			headers: { 'Content-Type': 'application/json' },
		});

		await handleError(response);

		return await response.json();
	} catch (error) {
		if (error.message === 'Failed to fetch') {
			throw new Error('Сервер не доступен');
		} else {
			throw new Error(error.message);
		}
	}
}
