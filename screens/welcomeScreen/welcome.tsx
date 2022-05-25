import React from 'react';

import { Text, Title, withTheme, Card, Paragraph, Avatar, Button } from 'react-native-paper';
import { sitename } from '../../defaults';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const LottieView = require("lottie-react-native");



function welcome(props) {
return (
    <View style={{flex:1}}>
        <Title style={style.titeText}>
            Welcome to {sitename}
        </Title>
        <Text style ={style.text}>
            At {sitename} we can handle your funds with ease.....
        </Text>

            <View style = { {height:350} }>
            <LottieView        
            source={require('../../assets/103957-trading-crypto.json')}
            autoPlay
            Loop
            />
            </View>
        <View style={{ marginLeft:25,flexDirection:'row',justifyContent:'space-around' }}>
            <Text style={{ marginTop:10,fontSize:25 }}>
                Create Account
            </Text>
            <Button mode="contained" style={{ marginLeft:25, marginRight:25,height:60,width:60,borderRadius: 100}} 
            labelStyle={{marginTop:10, color:"#fff"}}
            onPress={() => props.navigation.navigate('register')}>
                <FontAwesome5 name='angle-right' size={33} color={props.theme.colors.text} style={{marginLeft:10}}/>
            </Button>
        </View>    

        

        

        <Card style={{ position: 'absolute',  bottom:0,width:"100%",height:60 }}>
            <Card.Content>
                <TouchableOpacity onPress={()=> props.navigation.navigate('login')}>
    
                    <Text>Already have an account?  
                        <Text style = {{ paddingTop:-16, color:props.theme.colors.accent}}> Login Here</Text>
                        
                        </Text>
                </TouchableOpacity>
        
            </Card.Content>
        </Card>
        
    </View>
);
}

const style = StyleSheet.create({
titeText : {
    marginTop:200,
    marginBottom:10,
    textAlign:'center',
    fontSize:30
    
},
text : {
 
    textAlign:'center',
}
});
export default withTheme(welcome);