import { writable } from 'svelte/store';

/**
 * The address of the currently selected account
 * @type {writable<string>}
 */
const address = writable();

const userAddress = {
  subscribe: address.subscribe,
  set: (fetchedAddress: string) =>  {
    userAddress.set(fetchedAddress)
  },
}

export default userAddress;
