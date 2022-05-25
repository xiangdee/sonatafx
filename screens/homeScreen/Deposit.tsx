import React, {useState,useEffect} from 'react'
import * as Localization from 'expo-localization';
import { Text, TextInput, Button, withTheme, Card, Title } from 'react-native-paper';
import { View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { ButtonComponent } from '../../components/button';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { ErrorInputText, sitelink } from '../../defaults';
import RenderTransaction from '../../components/RenderTransaction';
import { connect } from 'react-redux';
import {user_deposits} from '../../actions/userActions';
import { SafeAreaView } from 'react-native-safe-area-context';
 function Deposit(props) {
    const {theme,deposits,user_deposits,navigation} = props;
    const { username } = props.route.params;
    const [paymentMethod,paymentMethodSet] = useState('');
    const [depositValue,depositValueSet] = useState('');

    const [depositError, depositErrorValue] = useState('');
    const [loading,loadingSet] = useState(false);
    const timezone = Localization.timezone;

    const displayDepositError = () => {
        if (depositError) {
            return <ErrorInputText error={depositError}/>
        }
    }
    const RenderTransactions = (item) => {
        return <RenderTransaction data={item} username={username} navigation={navigation} />
    } 
    const displayUserDeposits =  () =>  {
        if (deposits) {
            return (
                <><Title style={{ marginLeft:20, marginRight:20}}>Recent Deposits</Title>
                    <FlatList
                        data={deposits}
                        renderItem={RenderTransactions}
                        keyExtractor={item => item.id} /></>
            )
        }
             else {
            return( 
            <><Title style={{ marginLeft: 20, marginRight: 20 }}>Recent Deposits</Title>
                <Text style={{ marginLeft: 20, marginRight: 20 }}>
                    No deposit
                </Text></>
             )   
            }
        }
    useEffect(() => {
        user_deposits({username:username,timezone:timezone});
        return () => {
            deposits
        }
    }, [])
    const depositHandler = async () => {
        loadingSet(true);
        const req = await axios.post(`https://api.${sitelink}/user/depositrequest`,
                                     {username:username,
                                      method:paymentMethod,
                                      value:depositValue,
                                 
                                      timezone:timezone},
                                      
                                    {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    }   )
                                    .then(response => {
                                        const data = response.data;

                                        if (data[0] == 'false') {
                                            loadingSet(false);
                                            depositErrorValue(data[1]);                                            
                                        }else {
                                            loadingSet(false);
                                            depositErrorValue('');
                                            user_deposits({username:username,timezone:timezone});
                                            navigation.navigate('verify_deposit',
                                                                    {
                                                                
                                                                        username:username,
                                                                        ref_id:data[1]
                                                                    }
                                                                    )
                                        }
                                    }).catch(e => {
                                        loadingSet(false);
                                        Toast.show('network errorr.', {
                                            duration: Toast.durations.LONG,
                                          })
                                    });
    }

    const  displayButton = () =>{
        if (loading ==false) {
            return <ButtonComponent onPressVal={depositHandler.bind(this)}>
                        Deposit Now
                     </ButtonComponent>
            
        }else{
            return     <ButtonComponent loading={true} disabled={true} >
                        Processing
                     </ButtonComponent>
        }
    }

    return (
        <View>
            <View style={{marginTop:5, marginLeft:20, marginRight:20}}>
                <Text style={{alignItems:'center'}}>Amount</Text>
                <TextInput mode='outlined' placeholder='How mcuh to invest? USD'
                onChangeText={text => depositValueSet(text)} value={depositValue}/>
            </View>
            <View style={{marginTop:5, marginLeft:20, marginRight:20}}>

                <Picker style={{backgroundColor:theme.colors.background,color:theme.colors.text}}
                    onValueChange={value => paymentMethodSet(value)} selectedValue={paymentMethod}>
                    <Picker.Item label='select payment method' />
                    <Picker.Item label='Bitcoin' value='Bitcoin' />
                    <Picker.Item label='Paypal' value='Paypal'/>
                    <Picker.Item label='Cashapp' value='Cashapp'/>

                </Picker>
            </View>
            <View style={{marginTop:5, marginLeft:20, marginRight:20}}>
                <TouchableOpacity>
                {displayButton()}
                </TouchableOpacity>
                {displayDepositError()}
            </View>

               <SafeAreaView>
               {displayUserDeposits()}
               </SafeAreaView>
        </View>
       
    )
}

const mapStateToProps = (state) => {
    const {deposits} = state.Users;
    return {
        deposits : deposits
    }
}
export default connect(mapStateToProps,{user_deposits})(withTheme(Deposit))