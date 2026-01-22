import PocketBase from 'pocketbase';

// Admin client for server-side data fetching (maintains admin auth)
const adminPb = new PocketBase(import.meta.env.VITE_RAILWAY_API_APP_URL);

// User client for user authentication (can be cleared without affecting admin)
const userPb = new PocketBase(import.meta.env.VITE_RAILWAY_API_APP_URL);

export async function adminLogin(email: string, password: string) {
	try {
		// const authData = await adminPb.admins.authWithPassword(email, password); # local development
		const authData = await adminPb.collection('_superusers').authWithPassword(email, password);
		return authData;
	} catch (error) {
		console.error('Admin login failed', error);
		return null;
	}
}

// Default export for admin operations (server-side)
export default adminPb;

// Export user client for user authentication operations
export { userPb };
