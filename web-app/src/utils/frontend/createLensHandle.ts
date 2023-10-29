import { createUserClient } from './createClient';
import { userAddress } from '../../services/userAddress';
import createProfile from '../../graphql/createProfile';

const createLensHandle = async (handle: string) => {
	try {
		console.log('Create Lens Handle Called');
		const client = await createUserClient();
		let address;
		const unsubscribe = userAddress.subscribe((addr) => {
			address = addr;
		});
		unsubscribe();

		const request = {
			handle: handle,
			profilePictureUri: `https://cdn.stamp.fyi/avatar/eth:${address}?s=300`
		};
		const response = await client.mutation(createProfile, { request }).toPromise();

		console.log('Create Lens Handle Response: ', JSON.stringify(response));
		return response;
	} catch (err) {
		console.log('error creating lens handle...: ', err);
	}
};

export default createLensHandle;
