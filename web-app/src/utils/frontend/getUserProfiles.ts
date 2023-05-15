import { createUserClient } from "./createClient";
import { userAddress } from "../../services/userAddress";
import profiles from "../../graphql/profiles";

const getUserProfiles = async () => {
  try {
    console.log("Get User Profiles Called");
    const client = await createUserClient();
    let address;
    const unsubscribe = userAddress.subscribe((addr) => {
        address = addr;
      }
    );
    unsubscribe();
    const response = await client.query(profiles, {
      "request": {
        "ownedBy": address,
        "limit": 10
      }
    }).toPromise();
    return response.data.profiles.items;
  } catch (err) {
    console.log("error fetching user profile...: ", err);
  }
};

export default getUserProfiles;
