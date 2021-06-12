import axios from 'axios';
import Toast from 'react-native-root-toast';
import { sitelink } from '../defaults';


export const logout = () => {
    return {
        type: 'logout'
    }
}
export const userLoggedIn_update = (value:{})=> {
   return (dispatch) => {
    axios.post(`https://api.${sitelink}/user`, 
    { username:value.username,
     token:value.token },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then(res => {        
        if (res.data[0] == false) {
            dispatch({
                type:'userverify_fail'
            }) 
        }else{
            dispatch({
                type:'userverify_success',
                payload:{data:res.data[1],token:value.token},
            })
        }

        
    }).catch(e => {
        Toast.show('network errorr.', {
            duration: Toast.durations.LONG,
          })
    })
    


    }
}

export const user_transactions = (payload) => {
    const {username,timezone} = payload;

    return (dispatch) => {
        axios.post(`https://api.${sitelink}/user/transactions`, 
    {username:username,
     timezone:timezone
    },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then(res => {                        
            dispatch({
                type:'set_transactions',
                payload:res.data,
            })
        

        
    }).catch(e => {
        Toast.show('network errorr.', {
            duration: Toast.durations.LONG,
          })
    })

    }
}

export const user_activities = (payload) => {
    const {username,timezone} = payload;

    return (dispatch) => {
        axios.post(`https://api.${sitelink}/user/activities`, 
    {username:username,
     timezone:timezone
    },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then(res => {                        
            dispatch({
                type:'set_activities',
                payload:res.data,
            })
        

        
    }).catch(e => {
        Toast.show('network errorr.', {
            duration: Toast.durations.LONG,
          })
    })

    }
}


export const user_referals = (payload) => {
    const {username} = payload;
    return (dispatch) => {
    axios.post(`https://api.${sitelink}/user/referals`, 
    {username:username
    },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then(res => {                        
            dispatch({
                type:'set_referals',
                payload:res.data,
            })       
    }).catch(e => {
        Toast.show('network errorr.', {
            duration: Toast.durations.LONG,
          })
    })

    }
}

export const user_deposits =  (payload) =>{
    const {username,timezone} = payload;

    return (dispatch) => {

        axios.post(`https://api.${sitelink}/user/userdeposit`, 
    {username:username,
     timezone:timezone
    },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then(res => {                
            dispatch({
                type:'set_deposits',
                payload:res.data,
            })
        

        
    }).catch(e => {
        Toast.show('network errorr.', {
            duration: Toast.durations.LONG,
          })
    })

    }
}

export const user_withdrawals =  (payload) =>{
    const {username,timezone} = payload;

    return (dispatch) => {

        axios.post(`https://api.${sitelink}/user/userwithrawals`, 
    {username:username,
     timezone:timezone
    },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then(res => {                        
            dispatch({
                type:'set_withdrawals',
                payload:res.data,
            })
        

        
    }).catch(e => {
        Toast.show('network errorr.', {
            duration: Toast.durations.LONG,
          })
    })

    }
}