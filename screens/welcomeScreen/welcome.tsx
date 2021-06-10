import React from 'react';

import { Text, Title, withTheme, Card, Paragraph, Avatar, Button } from 'react-native-paper';
import { sitename } from '../../defaults';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            source={require('../../assets/62075-teen-walking.json')}
            autoPlay
            Loop
            />
            </View>

        <Button mode="contained" style={{roundness:7, marginLeft:25, marginRight:25,height:50}} 
        labelStyle={{marginTop:15, color:"#fff"}}
        onPress={() => props.navigation.navigate('register')}>Create Account</Button>

        

        <Card style={{ position: 'absolute',  bottom:0,width:"100%" }}>
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
    marginBottom:30,
    marginLeft: 50,
    marginRight: 50,
    
},
text : {
    marginRight:25,
    marginLeft:25,
    marginBottom:10,
    textAlign:'justify',
}
});
export default withTheme(welcome);