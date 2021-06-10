import * as SecureStore from 'expo-secure-store';
import checkIfExist from './checkIfExist'


  //check if userKey exist

  async function checkUserStore() {
      let result =  await checkIfExist("userkey");
      if (result) {
          return "true";
      }else {
          return "false";
      }

  }

  export default checkUserStore;