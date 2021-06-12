import React, { Component } from 'react'
import { withTheme, Title, TextInput, Button, Text, Card } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import { sitename, ErrorInputText, sitelink } from '../../defaults';
import Toast from 'react-native-root-toast';
import axios from 'axios';
import { ButtonComponent } from '../../components/button';
import { connect } from 'react-redux';
import { signup_success } from '../../actions/index';


class Login extends Component {
    state = {
        username:'',
        password:'',
        signin_error:'',
        loading:false,
        reload:false,
        twofa:false

    }

    setLogIn = (data) => {
        this.props.signup_success(data)
        this.setState({reload:true})
    }

    handleLogin = async () =>{
        this.setState({loading:true,signin_error:''})
        const {username,password,signin_error} = this.state;
        await axios.post(`https://api.${sitelink}/auth/signin`, 
        { 
            username:username,
            password:password,
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
            }
            else if (response.data[0] === 'fa'){
                const token = response.data[1];
                const token2 = response.data[2];
                this.setState({ twofa: {
                    username:username,
                    token:token,
                    token2:token2
                }  });
                
            }
            else {
                const token = response.data[1];
                const data ={username,token};                
               this.setLogIn(data);
                
            }
        }).catch(e => {
            this.setState({loading:false})
            Toast.show('network errorr.', {
                duration: Toast.durations.LONG,
              })
           console.log(e);
           
        }

        )

    }

     diaplaySignInError = () => {
        if (this.state.signin_error) {
            return <ErrorInputText error={this.state.signin_error}/>
        }
    }

    displayButton = () => {
        if(this.state.loading == false) {
            return <ButtonComponent onPressVal={this.handleLogin.bind(this)}>
           LOGIN
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
            navigation.replace('Home')
        }
        if (this.state.twofa) {
            this.props.navigation.navigate('twofasignin', 
               this.state.twofa
            )
        }
    }
    render() {        
        const {theme,navigation} =this.props;
        const {username,password} = this.state;              
        return (
            <View style={{flex:1}}>
            <View style={{ marginTop:270, marginLeft:25,marginRight:25 }}>
                <Title style={{fontSize:29, marginLeft:50, marginRight:50, marginBottom:20}}>
                    {sitename}
                </Title>

                <View>
                    <TextInput label='username' style={{marginBottom:15}} value={username}
                    onChangeText={text => this.setState({username:text})} autoCapitalize = 'none'/>
                    <TextInput label='password' style={{marginBottom:15}} value={password} secureTextEntry
                    onChangeText={text => this.setState({password:text})} autoCapitalize = 'none'/>
                                    
                </View>
                {this.diaplaySignInError()}

                <TouchableOpacity>
                    {this.displayButton()}
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> navigation.navigate('recover_password')}>
                    <Text>
                        Can't remember your login details?
                        <Text style = {{ paddingTop:-16, color:theme.colors.accent}}> Recover Here</Text>

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

const mapStateToProps = (state) => {
    const {signup_success} = state.Auth;
    return {
        signup_success
    }
}
export default connect(mapStateToProps,{signup_success})(withTheme(Login))
