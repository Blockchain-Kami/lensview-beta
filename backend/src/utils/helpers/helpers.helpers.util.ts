import omitDeep from "omit-deep";

/**
 * Logs a pretty-printed JSON object to the console with a message.
 *
 * @param {string} message - The message to be logged.
 * @param {unknown} obj - The JSON object to be pretty-printed and logged.
 */
export const prettyJSON = (message: string, obj: unknown) => {
  console.log(message, JSON.stringify(obj, null, 2));
};

/**
 * Sleeps for the specified number of milliseconds.
 *
 * @param {number} milliseconds - The number of milliseconds to sleep.
 * @return {Promise<void>} - A promise that resolves after the specified number of milliseconds.
 */
export const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/**
 * Omit the specified property from the given object.
 *
 * @param {any} object - The object to omit the property from.
 * @param {string} name - The name of the property to omit.
 * @return {any} The object with the property omitted.
 */
export const omit = (object: any, name: string) => {
  return omitDeep(object, [name]);
};

/**
 * Generates an array of tags based on a given array of strings and a query object.
 *
 * @param {Array<string>} tags - The array of tags to be modified and updated.
 * @param {any} query - The query object containing key-value pairs.
 * @return {Array<string>} - The updated array of tags.
 */
export const createTags = (tags: Array<string>, query: any): Array<string> => {
  const keys = Array.from(query.keys());
  console.log("keys", keys);
  for (let i = 0; i < keys.length; i++) {
    if (query.get(keys[i]).length < 50) {
      tags.push(keys[i] + "=" + query.get(keys[i]));
    }
  }
  return tags;
};
