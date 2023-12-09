import type { LoadEvent } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ params }: LoadEvent) => {
  const handleInfo: string | undefined = params.handleInfo;
  console.log("handleInfo", handleInfo);

  return {
    handleInfo: handleInfo
  };
}) satisfies PageLoad;
