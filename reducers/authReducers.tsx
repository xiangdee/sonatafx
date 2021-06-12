const INITIAL_STATE = {
    full_name : '',
    email:'',
    username: '',
    password : '',
    selected_gender: '',
    selected_country: '',
    selected_state:'',
    referredby:'',
    username_error_value:'',
    email_error_value:'',
    username_error: false,
    email_error:false,
    signin_error:false,
    signin_error_value:true,
    loading:false,
    reload:false,
    isLogggedin:{},
    regions : []
}
export default (state = INITIAL_STATE , action : any) => {
    switch (action.type) {
        case 'text_update':       
        return {...state, [action.payload.prop] : [action.payload.value ]}
            break;
        case 'Register_States':
            return {...state, regions : action.payload.regions, selected_country : action.payload.selected_country}    
            break;
        case 'username_available':    
            return {...state, username:action.payload, username_error:false,}
             break;
        case 'username_available1':    
            return {...state, username_error:false,}    
            break;
        case 'username_unavailable':
            return {...state, username:action.payload.value, username_error_value:action.payload.error, username_error:true,}
            break;
        case 'email_available':    
            return {...state, email:action.payload, email_error:false,}
            break;
        case 'email_available1':    
            return {...state, email_error:false,}
            break;
        case 'email_unavailable':
            return {...state, email_error_value:action.payload.error, email_error:true,}
            break;
        case 'singin_loading':
            return {...state, loading:false }
            break;
        case 'signup_success':
            return {...state, ...INITIAL_STATE,reload:true,isLogggedin : action.payload }
        case 'signup_fail':
             return {...state, signin_error_value:action.payload, signin_error:true, loading:false}
            break;
        case 'logout': 
            return {...state,isLogggedin:null}
            break


        default:
            return state;
            break;
    }

}