import React, { Component } from 'react'
import { withTheme, Title, TextInput, Button, Text, Card, ActivityIndicator } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import { ErrorInputText, sitelink } from '../../defaults';
import Toast from 'react-native-root-toast';
import axios from 'axios';
import { ButtonComponent } from '../../components/button';
import { connect } from 'react-redux';
import { signup_success } from '../../actions/index';

class TwoFaSignIn extends Component {
    state = {
        signin_error:'',
        signin_success:'',
        loading:false,
        pin:'',
        resendLoadingText:'',
        reload:false
    }

    setLogIn = (data) => {
        this.props.signup_success(data)
        this.setState({reload:true})
    }
    handleLogin = async () =>{
        this.setState({loading:true,signin_error:'',signin_success:''})
        const {username,token2} = this.props.route.params;
        await axios.post(`https://api.${sitelink}/auth/twofa`, 
        { 
            username:username,
            token2:token2,
            pin:this.state.pin
          },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then(response => {
            this.setState({loading:false})
            if (response.data[0] === 'false') {
                this.setState({signin_error:response.data[1]})
            } else {
                const token=token2;
                const data ={username:username,token:token};                                
                this.setLogIn(data);
                
            }
        }).catch(e => {
            this.setState({loading:false})            
            Toast.show('network errorr.', {
                duration: Toast.durations.LONG,
              })
        }
        )
    }

    resendToken = async () =>{
        this.setState({resendLoading:true,resendLoadingText:'',signin_error:'',signin_success:''})
        const {username,token2} = this.props.route.params;
        await axios.post(`https://api.${sitelink}/auth/resendpin`, 
        { 
            username:username,
            token2:token2
          },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then(response => {
            this.setState({resendLoading:false})
            if (response.data[0] === 'false') {
                this.setState({resendLoadingText:response.data[1]})
            } else {
                
                this.setState({resendLoadingText:response.data[1]})
            }
        }).catch(e => {
            this.setState({resendLoading:false})
            Toast.show('network errorr.', {
                duration: Toast.durations.LONG,
              })
        }
        )
    }

    diaplaySignInError = () => {
        if (this.state.signin_error) {
            return <ErrorInputText error={this.state.signin_error}/>
        }
    }
    diaplaySignInSuccess = () => {
        if (this.state.signin_success) {
            return <Text style={{color:this.props.theme.colors.success}}>{this.state.signin_success}</Text>
        }
    }
    displayResendLoading = () => {
            if (this.state.resendLoading) {
                return <>
                <ActivityIndicator size='small' color='red' />
                </>
            }
    }

    

    displayButton = () => {
        if(this.state.loading == false) {
            return <ButtonComponent onPressVal={this.handleLogin.bind(this)}>
           Verify
         </ButtonComponent>
        }else{
            return     <ButtonComponent loading={true} disabled={true} >
                        Processing
                     </ButtonComponent>
        }
    }

    componentDidUpdate() {
        const {navigation} =this.props;
        const {reload} = this.state;
        if (reload) {
            navigation.navigate('Home')
        }
    }
    render() {
        
        const {theme,navigation} =this.props;
        const {pin} = this.state;
        const {username,token2} = this.props.route.params;

        return (
            <View style={{flex:1}}>
            <View style={{ marginTop:270, marginLeft:25,marginRight:25 }}>
                <Title style={{fontSize:29, marginLeft:50, marginRight:50, marginBottom:20}}>
                    Two factor code
                </Title>
                <View>
                    <TextInput label='Enter code sent to your email' style={{marginBottom:15}} value={pin}
                    onChangeText={text => this.setState({pin:text})} autoCapitalize = 'none' keyboardType='number-pad'
                    />
                </View>
                <TouchableOpacity>
                    {this.displayButton()}
                </TouchableOpacity>
                {this.diaplaySignInSuccess()}
                {this.diaplaySignInError()}

                <TouchableOpacity onPress={()=> navigation.navigate('login')} style={{marginTop:25}}>
                    <Text>
                    
                        <Text style = {{ paddingTop:-16, color:theme.colors.accent}}>Go back</Text>

                    </Text>
                 </TouchableOpacity>   
            </View>

            <Card style={{ position: 'absolute',  bottom:0,width:"100%" }}>
                <Card.Content>
                    <TouchableOpacity onPress={()=> this.resendToken()}>
        
                        <Text style={{alignItems:'center',marginLeft:40}}>Didn't receive code?  
                            <Text style = {{ paddingTop:-16, color:theme.colors.accent}}  >Resend !! {this.displayResendLoading()}{this.state.resendLoadingText}  
                            
                            </Text>
                            
                            </Text>
                    </TouchableOpacity>
            
                </Card.Content>
           </Card>
        </View>
        )
    }
}

const mapStateToProps = (state) => {
    const {signup_success} = state.Auth;
    return {
        signup_success
    }
}
export default connect(mapStateToProps,{signup_success})(withTheme(TwoFaSignIn));
