import * as SecureStore from 'expo-secure-store';

async function checkIfExist(key:any) {

        const result = await SecureStore.getItemAsync(key);
        if (result == null) {
            console.log('sss');
            
        }

    console.log(result);
    
   
    
  }

  export default checkIfExist;