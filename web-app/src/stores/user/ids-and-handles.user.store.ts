import { writable } from "svelte/store";
import type { IdAndHandleModel } from "../../models/id-and-handle.model";

function manageUserIDs() {
  /** Added default initial value so that we don't see
   * no handle found prompt for user having handle while
   * they are logging in.
   * Its value is set to empty when we get data after calling
   * api if no handle is found
   */
  const IDsAndHandles = writable<IdAndHandleModel[]>([
    { id: "0", handle: "0" }
  ]);

  return {
    subscribe: IDsAndHandles.subscribe,
    setUserIDsAndHandles: (fetchedIDsAndHandles: IdAndHandleModel[]) => {
      IDsAndHandles.set(fetchedIDsAndHandles);
    }
  };
}

export const idsAndHandlesUserStore = manageUserIDs();
