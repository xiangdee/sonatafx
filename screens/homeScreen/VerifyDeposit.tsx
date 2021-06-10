import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View,Image, ActivityIndicator, Linking, ScrollView, Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Card, Title,Text, withTheme, TextInput, Button } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { sitelink, sitename } from '../../defaults';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

function VerifyDeposit({route,prop,theme}) {
   const {ref_id,username}=route.params;
   const [deposit,setDeposit] = useState('');
   const [proofLoading,proofLoadingSet] = useState(false);
   const [image, setImage] = useState(null);
      useEffect( () => {
        (async () => {
            if (Platform.OS !== 'web') {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
              }
            }
          })
          
        axios.post(`https://api.${sitelink}/user/verifydeposit`, 
            {username:username,
            id:ref_id
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then(res => {                
                setDeposit(res.data);             
            }).catch(e => {           
                Toast.show('network errorr.', {
                    duration: Toast.durations.LONG,
                })
            })
        return () => {
            deposit;
        }
    }, [ref_id])
    const copyToClipboard = () => {
        Clipboard.setString(deposit.depowallet)
      }

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          base64:true,
          quality: 1,
        }).then(result => {
            if (!result.cancelled) {
                setImage(result.uri);

                postPicture(result);
              }
        })
        
    }
    const postPicture = (result) => {
        proofLoadingSet(true);
        const uri = result.uri;
        const uriParts = uri.split('.');
        const filetype = uriParts[uriParts.length - 1];
     
        
        return axios.post(`https://api.${sitelink}/user/uploadproof`,
        {base:result.base64,
         filetype:filetype, 
         username:username,
         ref_id:ref_id  
        },
         
       {
           headers: {
               'Content-Type': 'application/json'
           }
       } ).then(res => {
        proofLoadingSet(false)
            // console.log(res.data);
        }
            ).catch(e => {
                Toast.show('network errorr.', {
                    duration: Toast.durations.LONG,
                })
            
        });
          }
  const displayContent = () => {
    if (deposit) {
        return (
            <>
            <ScrollView style={{marginTop:20,marginLeft:10,marginRight:10}}>
           <Card>
                <Card.Content style={{ height: 200 }}>
                    <View style={{ alignItems: 'center', borderBottomWidth: 15, borderBottomColor: theme.colors.primary }}>
                        <Image
                            style={{ width: 150, height: 70 }}
                            source={{ uri: `https://${sitelink}/img/site_logo.png` }} />
                        <Title>
                            {sitename}
                        </Title>
                    </View>
                </Card.Content><Card.Content style={{ marginTop: -60 }}>
                        <Title>
                                                Deposit Reciept
                        </Title>
                    <View style={{justifyContent:'flex-start', marginTop:30}}>
                        <Text style={{fontSize:16,marginBottom:10}}>Account Name: {deposit.name}</Text>
                        <Text style={{fontSize:16,marginBottom:10}}>Transaction Method: {deposit.method}</Text>
                        <Text style={{fontSize:16,marginBottom:10}}>Transaction Amount: {deposit.value} ({deposit.btcValue})</Text>
                        <Text style={{fontSize:16,marginBottom:10}}>Reference id: {deposit.ref_id}</Text>
                        <Text style={{fontSize:16,marginBottom:10}}>Status: {deposit.status}</Text>

                    </View>

                    </Card.Content>
                    <Card.Content style={{backgroundColor:theme.colors.primary}}>
                        <View style={{alignItems:'center'}}>
                            {deposit.status === 'pending' ? 
                            <Text>
                                Thank you for your business!
												Payment is expected within 31 days; please process this invoice within that time.
												There will be a 5% interest charge per month on late invoices.
                            </Text>
                            :
                            <Text>
                            Rate Your Experince
                            </Text>    
                        }
                           
                        </View>
                    </Card.Content>
            </Card>

             <Card style={{marginTop:15}}>
                <Card.Content style={{alignItems: 'center'}}>
                     <Title>
                        Payment
                    </Title>
                     <Text>
                        Please Send an equivalent of {deposit.value} to {deposit.depowalletT}
                    </Text>
                    <View style={{alignItems: 'flex-start',flexDirection:'row'}}>
                     <TextInput label={deposit.depowallet} value={deposit.depowallet} style={{width:300}}/>
                     <TouchableOpacity>
                        <Button onPress={()=>copyToClipboard.bind(this)}>
                            Copy
                        </Button>
                     </TouchableOpacity>
                    </View>
                    <Title>
                        {deposit.cc}
                    </Title>
                    <TouchableOpacity>
                        <Button onPress={()=> Linking.openURL(deposit.cclink)}>
                            Pay Now
                        </Button>
                    </TouchableOpacity>
                    <Text style={{marginTop:20}}>
                        Note:Note: It may take 24 hours for your transaction to be confirmed
                    </Text>
                    { deposit.status != 'successful' 
                    ?<Button onPress={pickImage}>
                    Pick image
                </Button> :
                <Text style={{color:'green'}}>
                    Successfully Verified
                </Text>
                    }
                    
                    {
                    proofLoading === false ?
                    image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                        : <ActivityIndicator size='small' color='blue'/>
                }

                </Card.Content>     
                 
                 
            </Card>   
           
        </ScrollView>
               
                
                </>)
        
    }else{
        return <ActivityIndicator size="large" color='red'/>
    }
  } 
    return (
        (displayContent())
        
    )
}
export default  withTheme(VerifyDeposit)