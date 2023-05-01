import { createUserClient } from "./createClient";
import getDefaultProfile from "../../graphql/getDefaultProfile";
import { userAddress } from "../../services/userAddress";

const getUserProfile = async () => {
  try {
    console.log("Get User Profile Called");
    const client = await createUserClient();
    let address;
    const unsubscribe = userAddress.subscribe((addr) => {
        address = addr;
      }
    );
    unsubscribe();
    const response = await client.query(getDefaultProfile, {
      address
    }).toPromise();
    return response.data.defaultProfile;
  } catch (err) {
    console.log("error fetching user profile...: ", err);
  }
};

export default getUserProfile;
