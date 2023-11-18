import type { CustomNotificationModel } from "../models/custom-notification.model";

const stringifyNotificationObjectWithFunctionUtil = (
  obj: CustomNotificationModel
) => {
  // Convert the function to a string
  if (obj?.ctaFunction) {
    obj.ctaFunctionString = obj.ctaFunction.toString();
    delete obj.ctaFunction;
  }

  // Convert the object to a JSON string
  return JSON.stringify(obj);
};

export default stringifyNotificationObjectWithFunctionUtil;
