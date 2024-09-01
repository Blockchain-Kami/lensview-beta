export interface ProfileManagedLensModel {
  id: string;
  handle: {
    fullHandle: string;
  };
  ownedBy: {
    address: string;
  };
  metadata: {
    displayName: string;
    picture: {
      __typename: "ImageSet";
      optimized: {
        uri: string;
      };
    };
  };
}
