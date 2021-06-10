import React, { useEffect, useState } from 'react'
import { Platform, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withTheme,Text, Avatar, Title, Card, ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { sitelink } from '../../defaults';
import Toast from 'react-native-root-toast';
import * as SecureStore from 'expo-secure-store';

 function Profile({user,theme,token,userLoggedIn_update,navigation}) {
     const [proofLoading,proofLoadingSet] = useState('');
     const {username,profilepic} = user;
     useEffect(() => {
            (async () => {
                if (Platform.OS != 'web') {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync;
                    if (status !== 'granted') {
                        alert('We need permision to upload image');
                    }
                }
            })
         return () => {
            user
         }
     }, [])

     async function pickImage() {
         let result = await ImagePicker.launchImageLibraryAsync({
             mediaTypes: ImagePicker.MediaTypeOptions.Images,
             allowsEditing:true,
             base64:true,
             quality:1
             
         }).then(result => {
            if (!result.cancelled) {
                postPicture(result);
              }
         })
     }

     const postPicture = (result) => {
         proofLoadingSet(true)
        const uri = result.uri;
        const uriParts = uri.split('.');
        const filetype = uriParts[uriParts.length - 1];        
        return axios.post(`https://api.${sitelink}/user/uploadprofilepicture`,
        {base:result.base64,
         filetype:filetype, 
         username:username
        },  
       {
           headers: {
               'Content-Type': 'application/json'
           }
       } ).then(res => {
         proofLoadingSet(false);
        }
            ).catch(e => {                
                Toast.show('network errorr.', {
                    duration: Toast.durations.LONG,
                })           
        });
        }
        const displayUploadMessage = () => {
            if (proofLoading) {
                return  <View style={{flexDirection:'row'}}>
                            <Text>Uploading </Text>

                            <ActivityIndicator size = 'small'  /> 
                        </View>
            }
        }
        const handleLogout = async () => {
            await SecureStore.deleteItemAsync('userLoggedIn').then(
                navigation.replace('welcome')
            )
        }
    return (
        <ScrollView style={{marginTop:50}}>
            <View style={{marginLeft:100,marginRight:100,marginTop:30}}>
            <Avatar.Image size={200} source={{uri:profilepic}} />
                <TouchableOpacity onPress={()=> pickImage() } style={{marginLeft:20}}>
                    <Text style={{color:theme.colors.info}}>
                        Change Profile Picture
                    </Text>
                    { 
                    displayUploadMessage()
                    
                    }
                </TouchableOpacity>
                <Title style={{marginLeft:12}}>
                    {user.name}
                </Title>
                <Text style={{marginLeft:60}}>
                    @{username}
                </Text>
            </View>

            <View style={{marginTop:10,borderTopWidth:2,borderTopColor:theme.colors.primary}}>
                <View style={{marginLeft:10,marginRight:10,marginTop:20}}>
                <Text>Personal</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('Manage_profile')}>
                    <Card>
                        <Card.Content style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Manage Profile</Text>
                            <FontAwesome5  name='arrow-right'size={15} color={theme.colors.text}/>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>

                <Text>Verification</Text>
                <Card>
                    <Card.Content style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>{user.levelDetails} - {user.activated == 1 ? 'Activated' : 'Pending Activation'}</Text>
                    </Card.Content>
                </Card>
            {/* <TouchableOpacity>
                <Card style={{marginTop:1}}>
                    <Card.Content style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>Kyc Documents</Text>
                        <FontAwesome5  name='arrow-right'size={15}color={theme.colors.text}/>
                    </Card.Content>
                </Card>
            </TouchableOpacity> */}

               <Text>Security</Text>
               <TouchableOpacity onPress={()=> navigation.navigate('change_password')}>
                    <Card style={{marginTop:1}}>
                        <Card.Content style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Change Password</Text>
                            <FontAwesome5  name='arrow-right'size={15} color={theme.colors.text}/>
                        </Card.Content>
                    </Card>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=> navigation.navigate('security')}>
                    <Card style={{marginTop:1}}>
                        <Card.Content style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Advanced Security</Text>
                            <FontAwesome5  name='arrow-right'size={15} color={theme.colors.text}/>
                        </Card.Content>
                    </Card>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=> navigation.navigate('activities')}>
                    <Card style={{marginTop:1}}>
                        <Card.Content style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Account Activities</Text>
                            <FontAwesome5  name='arrow-right'size={15} color={theme.colors.text}/>
                        </Card.Content>
                    </Card>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>handleLogout()}>
                    <Card style={{marginTop:20,marginBottom:10}}>
                        <Card.Content style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Logout</Text>
                            <FontAwesome5  name='power-off'size={15} color={theme.colors.text}/>
                        </Card.Content>
                    </Card>
               </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
const mapStateToProps =(state) => {
    const {user,token} =state.Users;
    return {
        user:user,
        token:token
    }
}
export default connect(mapStateToProps)(withTheme(Profile))