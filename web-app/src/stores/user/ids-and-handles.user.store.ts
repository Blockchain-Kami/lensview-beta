import { writable } from "svelte/store";
import type { IdAndHandleModel } from "../../models/id-and-handle.model";

function manageUserIDs() {
  const IDsAndHandles = writable<IdAndHandleModel[]>([]);

  return {
    subscribe: IDsAndHandles.subscribe,
    setUserIDsAndHandles: (fetchedIDsAndHandles: IdAndHandleModel[]) => {
      IDsAndHandles.set(fetchedIDsAndHandles);
    }
  };
}

export const idsAndHandlesUserStore = manageUserIDs();
