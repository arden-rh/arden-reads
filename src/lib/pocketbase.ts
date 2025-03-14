import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_RAILWAY_API_APP_URL);

export async function adminLogin(email: string, password: string) {

	try {		
		// const authData = await pb.admins.authWithPassword(email, password); # local development
		const authData = await pb.collection("_superusers").authWithPassword(email, password);
		return authData;
	} catch (error) {
		console.error('Admin login failed', error);
		return null;
	}
};

export default pb;