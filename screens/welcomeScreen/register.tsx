import React, { Component } from 'react';
import { Text, withTheme, Title, TextInput, Button } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-root-toast';
import { text_update, country_update, check_username, check_email, signup } from '../../actions/index';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { ErrorInputText, sitelink } from '../../defaults';
import { ButtonComponent } from '../../components/button';

 class Register extends Component {
    state = {
        userLoggedIn: null,
        countries : []
    }
 
    async componentDidMount () {
        const data = await axios.get(`https://api.${sitelink}/auth/countries`,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(()=>Toast.show('network errorr.', {
            duration: Toast.durations.LONG,
          }));
        this.setState({countries:data.data})
    }
    updateRegions = (value) => {
        this.props.text_update({prop : 'selected_state',value:value}) ;

    }

    updateGender = (value) => {
        this.props.text_update({prop : 'selected_gender',value:value}) ;

    }
    displayUsernameError = () => {
        if (this.props.username_error) {
            return <ErrorInputText error={this.props.username_error_value}/>
            
        }
    }

    displayEmailError = () => {
        if (this.props.email_error) {
            return <ErrorInputText error={this.props.email_error_value}/>
            
        }
    }
    displaySigninError = () => {
        if (this.props.signin_error) {
            return <ErrorInputText error={this.props.signin_error_value}/>
            
        }
    }
    signuphandler =({})=> {
        const {full_name, 
             email,
             username,
             password,
             selected_gender,
           
             
             selected_country,
             selected_state,
             referredby,
             signup} = this.props;
             this.props.signup(
             full_name[0], 
             username,
             email,
             password[0],
             selected_country,
             selected_gender[0],
           
             
             selected_state[0],
             referredby[0]
        )
    }
    displayButton = () =>{
        if (this.props.loading ==false) {
            return <ButtonComponent onPressVal={this.signuphandler.bind(this)}>
                        Register Now
                     </ButtonComponent>
            
        }else{
            return     <ButtonComponent loading={true} disabled={true} >
                        Processing
                     </ButtonComponent>
        }
    }
   
   

    render() {
        const { theme,
            navigation,
             text_update, 
             check_username,
             check_email,
             country_update,
             full_name, 
             email,
             username,
             password,
             regions,
             selected_gender,
           
             
             selected_country,
             selected_state,
             referredby,reload } = this.props;
            const redirect= () => {
                if (reload) {
                    navigation.replace('Home')
                }
            }

        return (
            <KeyboardAwareScrollView style={ { flex:1, } }>
                {redirect()}
            <Title style={ {color:theme.colors.primary, marginTop:60, marginLeft:80,marginRight:80, fontSize:22
            } }> CREATE ACCOUNT</Title>

            <View style={{ marginTop:20, marginLeft:20, marginRight:20}}>
                <TextInput label='Enter your full name' mode='outlined' style={{marginBottom:15}} 
                    value = {full_name[0]}
                    onChangeText={text => text_update({prop : 'full_name',value:text})} />
                <TextInput label='email' style={{marginBottom:15}} value={email}
                onChangeText={email => check_email(email)} autoCapitalize = 'none'/>
                {this.displayEmailError()}
                <TextInput label='username' style={{marginBottom:15}} value={username}
                onChangeText={text => check_username(text)} autoCapitalize = 'none'/>
                {this.displayUsernameError()}
                <TextInput label='password' style={{marginBottom:15}} secureTextEntry
                value = {password[0]}
                 onChangeText={text => text_update({prop : 'password',value:text})}
                 autoCapitalize = 'none'/>
                 <Picker style={{backgroundColor:theme.colors.background,color:theme.colors.text}}
                onValueChange={this.updateGender.bind(this)} selectedValue={selected_gender[0]} itemStyle={{height:50}}>
                <Picker.Item label='select Gender' />
                <Picker.Item label='Male' value='male'/>
                <Picker.Item label='Female' value='female'/>

                   
                                    
                </Picker>

                <Picker style={{backgroundColor:theme.colors.background,color:theme.colors.text}}
                selectedValue={selected_country} onValueChange={country_update.bind(this)}  itemStyle={{height:50}}>
                <Picker.Item label='select country' />

                   
                        {this.state.countries?.map(({country,id}) => {


                            return (
                                <Picker.Item key={id} label={country} value={id}/>
                            )
                        }
                        
                        )}
                </Picker>
                <Text>
                    {/* {JSON.stringify(this.state.countries)} */}
                </Text>
                <Picker style={{backgroundColor:theme.colors.background,color:theme.colors.text}}
                onValueChange={this.updateRegions.bind(this)} selectedValue={selected_state[0]} itemStyle={{height:50}}>
                <Picker.Item label='select state/region' value='null'/>

                   
                                    {regions?.map(({region,id}) => {


                    return (
                        <Picker.Item key={id} label={region} value={id}/>
                    )
                    }

                    )}
                </Picker>
                <TextInput label='refered by? (leave empty if none)' style={{marginBottom:20}}
                value={referredby[0]}
                
                onChangeText={text => text_update({prop : 'referredby',value:text})} autoCapitalize = 'none'/>

                <TouchableOpacity>
                    {this.displayButton()}
                </TouchableOpacity>
                {this.displaySigninError()}
            </View>



            <View>
                <Text style={{ marginRight:25,
                                marginLeft:25,
                                marginBottom:10,
                                marginTop:10,
                                textAlign:'justify',}}>
                    By clicking submit you agree to our terms and conditions
                </Text>
                <TouchableOpacity  onPress={()=> navigation.navigate('login')}>
                    <Text style={ {marginRight:25,
                                marginLeft:25,} }>
                        Already have an account?

                         <Text style = {{ paddingTop:-16, color:theme.colors.accent}}> Login Here</Text>

                    </Text>
                </TouchableOpacity>   
            </View>
        </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps =  (state : any) => {
   const { full_name,email,username,password,selected_country,regions,selected_state,selected_gender,
    referredby,
    username_error,
    username_error_value,email_error,email_error_value,
    signin_error,
    signin_error_value,
    loading,
    reload } = state.Auth;

   return {
       full_name : full_name,
       email:email,
       username:username,
       password:password,
       selected_gender:selected_gender,
       selected_country:selected_country,
       selected_state:selected_state,
       referredby:referredby,
       regions:regions,
       username_error_value:username_error_value,
       email_error_value:email_error_value,
       username_error:username_error,
       email_error:email_error,
       signin_error:signin_error,
       signin_error_value:signin_error_value,
       loading:loading,
       reload:reload
   }
}
export default  connect(mapStateToProps,{text_update,country_update,check_username,check_email,signup}) (withTheme(Register))