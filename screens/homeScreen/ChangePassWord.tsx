import axios from 'axios';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Caption, TextInput, Text, withTheme } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { ButtonComponent } from '../../components/button';
import { ErrorInputText, sitelink } from '../../defaults';

const ChangePassWord = ({username,theme}) => {
    const [password,passwordSet] = useState('');
    const [password1,password1Set] = useState('');
    const [password2,password2Set] = useState('');
    const [loading,loadingSet] = useState(false);
    const [successMessage,successMessageSet] = useState(false);
    const [errorMessage,errorMessageSet] = useState('');
    
    const handleUpdate =  async ()  =>{
        loadingSet(true)
        successMessageSet(false) 
        await axios.post(`https://api.${sitelink}/user/changepassword`,
        {
         username:username,   
         password:""+password,  
         password1:""+password1,  
         password2:""+password2  
            
        },
        {
            headers:{
                'Content-type':'application/json'
            }
        }
        ).then(res => {
            loadingSet(false)              
            if (res.data[0] == "false") {
                errorMessageSet(res.data[1])
            }else{
                successMessageSet(true) 
            }
           
            
        }).catch(e => {
            loadingSet(false);            
            Toast.show('network errorr.', {
                duration: Toast.durations.LONG,
            })
        })
    }
    const  displayButton = () =>{
        if (loading ==false) {
            return <ButtonComponent onPressVal={handleUpdate.bind(this)}>
                         Save
                     </ButtonComponent>
            
        }else{
            return     <ButtonComponent loading={true} disabled={true} >
                        Processing
                     </ButtonComponent>
        }
    }

    const displaySuccessMessage = () =>  {
        if(successMessage) {
            return <Text style={{color:theme.colors.success}}>Successfull</Text>

        }
        if (errorMessage) {
            return <ErrorInputText error={errorMessage}/>
        }
    }
    return (
        <View style={{marginTop:50, marginLeft:20,marginRight:20}}>
            <View>
                <Caption>old password</Caption>
                <TextInput mode='outlined' value={password} onChangeText={text => passwordSet(text)}
                secureTextEntry
                autoCapitalize='none' />
            </View>
            <View>
                <Caption>new password</Caption>
                <TextInput mode='outlined' value={password1} onChangeText={text => password1Set(text)} 
                secureTextEntry
                autoCapitalize='none'/>
            </View>
            <View>
                <Caption>confirm new password</Caption>
                <TextInput mode='outlined' value={password2} onChangeText={text => password2Set(text)}
                secureTextEntry
                autoCapitalize='none'/>
            </View>
            <View style={{marginTop:20}}>
                {displayButton()}
                {displaySuccessMessage()}
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    const {user} = state.Users;
    return {
        username:user.username
    }
}
export default connect(mapStateToProps)(withTheme(ChangePassWord));


