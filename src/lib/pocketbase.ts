import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export async function adminLogin(email: string, password: string) {
	try {
		const authData = await pb.admins.authWithPassword(email, password);
		return authData;
	} catch (error) {
		console.error('Admin login failed', error);
		return null;
	}
}

export default pb;