const getPictureURLUtil = (fetchedLensURL: string, ownedByAddress: string) => {
  if (fetchedLensURL === undefined) {
    return `https://cdn.stamp.fyi/avatar/eth:${ownedByAddress}?s=300`;
  }

  if (fetchedLensURL.substring(0, 4) === "ipfs") {
    return `https://ipfs.io/ipfs${fetchedLensURL.substring(6)}`;
  } else {
    return fetchedLensURL;
  }
};

export default getPictureURLUtil;
