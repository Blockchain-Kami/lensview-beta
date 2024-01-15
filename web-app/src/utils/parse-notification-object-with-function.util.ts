const parseNotificationObjectWithFunctionUtil = (objStr: string) => {
  // Parse the JSON string
  const parsedObj = JSON.parse(objStr);

  // Convert the function string back to a function
  if (parsedObj?.ctaFunctionString) {
    parsedObj.ctaFunction = eval("(" + parsedObj.ctaFunctionString + ")");
    delete parsedObj.ctaFunctionString;
  }

  return parsedObj;
};

export default parseNotificationObjectWithFunctionUtil;
