import React, { Component } from 'react'
import { withTheme, Title, TextInput, Button, Text, Card } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import { sitename, ErrorInputText } from '../../defaults';
import Toast from 'react-native-root-toast';
import axios from 'axios';
import { ButtonComponent } from '../../components/button';

class RecoverPassword extends Component {

    state = {
        email:'',
        signin_error:'',
        signin_success:'',
        loading:false,
        reload:false
    }
    handleLogin = async () =>{
        this.setState({loading:true,signin_error:'',signin_success:''})
        const {email} = this.state;
        await axios.post('https://api.binaryeasytrade.com/auth/recover', 
        { 
            email:email
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
                this.setState({signin_success:response.data[1]})
                
            }
        }).catch(e => {
            this.setState({loading:false})
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

    displayButton = () => {
        if(this.state.loading == false) {
            return <ButtonComponent onPressVal={this.handleLogin.bind(this)}>
           Recover
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
        const {username,password} = this.state;
        return (
            <View style={{flex:1}}>
            <View style={{ marginTop:270, marginLeft:25,marginRight:25 }}>
                <Title style={{fontSize:29, marginLeft:50, marginRight:50, marginBottom:20}}>
                    Recover Password
                </Title>
                <View>
                    <TextInput label='Email linked to your account' style={{marginBottom:15}} value={username}
                    onChangeText={text => this.setState({email:text})} autoCapitalize = 'none'/>
                </View>
                <TouchableOpacity>
                    {this.displayButton()}
                </TouchableOpacity>
                {this.diaplaySignInSuccess()}
                {this.diaplaySignInError()}

                <TouchableOpacity onPress={()=> navigation.navigate('login')}>
                    <Text>
                    
                        <Text style = {{ paddingTop:-16, color:theme.colors.accent}}>Log in</Text>

                    </Text>
                 </TouchableOpacity>   
            </View>

            <Card style={{ position: 'absolute',  bottom:0,width:"100%" }}>
                <Card.Content>
                    <TouchableOpacity onPress={()=> navigation.navigate('register')}>
        
                        <Text style={{alignItems:'center',marginLeft:40}}>Don't have an account?  
                            <Text style = {{ paddingTop:-16, color:theme.colors.accent}}> Sign Up</Text>
                            
                            </Text>
                    </TouchableOpacity>
            
                </Card.Content>
           </Card>
        </View>
        )
    }
}


export default withTheme(RecoverPassword)
