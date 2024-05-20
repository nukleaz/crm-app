const url = `http://localhost:3000`;

export async function getClient() {
	const response = await fetch(`${url}/api/clients`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});
	return await response.json();
}

export async function addClient(client) {
	const response = await fetch(`${url}/api/clients`, {
		method: 'POST',
		body: JSON.stringify(client),
		headers: { 'Content-Type': 'application/json' },
	});
	return await response.json();
}

export async function deleteClient(id) {
	const response = await fetch(`${url}/api/clients/${id}`, {
		method: 'DELETE',
	});
	return await response.json();
}

export const clients = await getClient();
