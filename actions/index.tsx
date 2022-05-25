import axios from "axios"
import Toast from 'react-native-root-toast';
import { sitelink } from "../defaults";

export const logout = () => {
    return {
        type: 'logout'
    }
}
export const text_update = ({prop,value}) => {
    return {
        type : 'text_update',
        payload : {prop,value}
    }
}

export const signup_success = (data) => {    
    return {
        type : 'signup_success',
        payload:data
    }
}

export const country_update = (id) => {
   return (dispatch) => { 
        axios.post(`https://api.${sitelink}/auth/states`, 
        { value:id },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        ).then(regions => {

            dispatch({
                type:'Register_States',
                payload:{regions:regions.data,selected_country:id}
            })
        }).catch(
            regions =>{
            Toast.show('network errorr.', {
            duration: Toast.durations.LONG,
          })
          dispatch({
            type:'Register_States',
            payload:{regions:regions.data,selected_country:id}
        })
          
          
          }); 
   }
}

export const  check_username = (value) => {
    return async (dispatch) => {     
        dispatch({
            type:'username_available',
            payload:value
        })  
       await axios.post(`https://api.${sitelink}/auth/checkusername`, 
        { value:value },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        ).then(username => {            
            if (username.data[0] === false) {
                dispatch({
                    type:'username_unavailable',
                    payload:{value:value,error:username.data[1]}
    
                })
                
            } else {
                dispatch({
                    type:'username_available1',
                    payload:value
                })  
            }
        }).catch(e => {
            dispatch({
                type:'username_unavailable',
                payload:{value:value,error:'network error'}

            })
        }

        )
    }
}

export const  check_email = (value) => {
    return async (dispatch) => {     
        dispatch({
            type:'email_available',
            payload:value
        }) 
       await axios.post(`https://api.${sitelink}/auth/checkemail`, 
        { value:value },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        ).then(email => {
            if (email.data[0] === false) {
                dispatch({
                    type:'email_unavailable',
                    payload:{value:value,error:email.data[1]}
    
                })
                
            } else {
                dispatch({
                    type:'email_available1',
                    payload:value
                })  
            }
        }).catch(e => {

            dispatch({
                type:'email_unavailable',
                payload:{value:value,error:'network error'}

            })
        }

        )
    }
}

export const  signup = (name,username,email,password,gender,country,state,referal) => {
    
    return async (dispatch) => {   
        dispatch({
            type:'singin_loading'
        });   
       await axios.post(`https://api.${sitelink}/auth/signup`, 
        { 
            name:name,
            username:username,
            email: email,
            password:password,
            gender:gender,
            country:country,
            state:state,
            referal:referal
         },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        ).then(response => {
            if (response.data[0] === 'false') {
                dispatch({
                    type:'signup_fail',
                    payload:response.data[1]
    
                })
                
            } else {
                const token = response.data[1];
                const data ={username,token};                
                dispatch({
                    type:'signup_success',
                    payload:data
                })  
            }
        }).catch(e => {
            Toast.show('network errorr.', {
                duration: Toast.durations.LONG,
              })
           
        }

        )
    }
}