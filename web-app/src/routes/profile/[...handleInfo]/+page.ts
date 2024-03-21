import type { PageLoad } from "./$types";
import { error, type LoadEvent } from "@sveltejs/kit";
import getProfileIdUsingHandleLensService from "../../../services/lens/get-profile-id-using-handle.lens.service";

export const load = (async ({ params }: LoadEvent) => {
  const handle = params.handleInfo;

  if (!handle)
    throw error(404, {
      message: "Not Found",
      hint: "Please provide a valid handle"
    });

  try {
    const response = await getProfileIdUsingHandleLensService(handle);

    if (response?.data?.profile?.id) {
      return {
        profileId: response.data.profile.id
      };
    } else {
      throw error(404, {
        message: "Not Found",
        hint: "Please provide a valid handle"
      });
    }
  } catch (_error) {
    throw error(404, {
      message: "Not Found",
      hint: "Please provide a valid handle"
    });
  }
}) satisfies PageLoad;
