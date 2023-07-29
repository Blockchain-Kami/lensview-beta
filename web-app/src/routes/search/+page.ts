import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		foundedMainPostPubId: [
			'0x7e11-0x0136',
			'0x7e11-0x0158',
			'0x7e11-0x015c',
			'0x7e11-0x0155',
			'0x7e11-0x0142',
			'0x7e11-0x0140'
		]
	};
}) satisfies PageLoad;
