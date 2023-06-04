const getImageFromURL = async (url: string) => {
  let STRING_CHAR;
  let imageURL;

  await fetch("/api/get-img", {
    method: "POST",
    body: JSON.stringify(url),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(async (res) => {

    const json = await res.json();

    const img = new Uint8Array(json["image"]["data"]);

    STRING_CHAR = img.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, "");

    let base64String = btoa(STRING_CHAR);

    imageURL = `data:image/jpg;base64,` + base64String;
    // imageURL = res;
  });

  return imageURL;
};

export default getImageFromURL;
