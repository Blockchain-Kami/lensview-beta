export interface ProfileManagedLensModel {
  account: {
    owner: string;
    address: string;
    username: {
      value: string;
      id: string;
    };
    metadata: {
      name: string;
      picture: string;
      id: string;
    };
  };
  __typename: "AccountManaged";
}
