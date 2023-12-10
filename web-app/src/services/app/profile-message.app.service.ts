import clientAxiosUtil from "../../utils/axios/client.axios.util";

const profileMessageAppService = async (message: string) => {
  try {
    return await clientAxiosUtil
      .post("profile/message", {
        message: message
      })
      .then((): void => {
        return;
      });
  } catch (err) {
    // TODO: Handle error as mentioned in this article
    // https://www.builder.io/blog/safe-data-fetching
    console.log("profileMessageAppService err:", err);
    throw err;
  }
};

export default profileMessageAppService;
