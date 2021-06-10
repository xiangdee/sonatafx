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
import {user_withdrawals,userLoggedIn_update} from '../../actions/userActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
 function Withdraw(props) {
    const isFocused =useIsFocused;
    const {theme,withdrawals,user_withdrawals,navigation,token} = props;
    const { username,limit,activated,withdrawalRequest } = props.route.params;
    const [paymentMethod,paymentMethodSet] = useState('');
    const [withdrawValue,withdrawValueSet] = useState('');
    const [withdrawDestination,withdrawDestinationSet] = useState('');
    const [withdrawBank,withdrawBankSet] = useState('');
    const [isUserWithdraw,isUserWithdrawkSet] = useState(withdrawalRequest[0]);
    const [pinValue,pinValueSet] = useState('');
    const [pinValid,pinValidSet] = useState(false);

    const [withdrawError, withdrawErrorValue] = useState('');
    const [withdrawSuccess, withdrawSuccessValue] = useState('');
    const [loading,loadingSet] = useState(false);
    const timezone = Localization.timezone;

    const displayWithdrawError = () => {
        if (withdrawError) {
            return <ErrorInputText error={withdrawError}/>
        }
        if (withdrawSuccess) {
            return <Text style={{color:theme.colors.success}}>
                {withdrawSuccess}
            </Text>
        }
    }
    const RenderTransactions = (item) => {
        return <RenderTransaction data={item} username={username} navigation={navigation} renderType='withdraw'/>
    } 
    const displayUserWithdraws =  () =>  {
        if (withdrawals) {
            return (
                <><Title style={{ marginLeft:20, marginRight:20}}>Recent Withdrawals</Title>
                    <FlatList
                        data={withdrawals}
                        renderItem={RenderTransactions}
                        keyExtractor={item => item.id} /></>
            )
        }
             else {
            return( 
            <><Title style={{ marginLeft: 20, marginRight: 20 }}>Recent Withdrawals</Title>
                <Text style={{ marginLeft: 20, marginRight: 20 }}>
                    No withdrawals
                </Text></>
             )   
            }
        }
    useEffect(() => {
        user_withdrawals({username:username,timezone:timezone});
        return () => {
            withdrawals
        }
    }, [isFocused])
    const withdrawHandler = async () => {
        loadingSet(true);
        const req = await axios.post(`https://api.${sitelink}/user/withdrawrequest`,
                                     {username:username,
                                      method:paymentMethod,
                                      destination:withdrawDestination,
                                      value:withdrawValue,
                                 
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
                                            withdrawErrorValue(data[1]);                                            
                                        }else {
                                            loadingSet(false);
                                            withdrawErrorValue('');
                                            withdrawSuccessValue('successful');
                                            user_withdrawals({username:username,timezone:timezone});
                                            isUserWithdrawkSet('true');
                                        }
                                    }).catch(e => {
                                        loadingSet(false);
                                        Toast.show('network errorr.', {
                                            duration: Toast.durations.LONG,
                                          })
                                    });
    }

    const pinHandler = async () => {
        loadingSet(true);
        const req = await axios.post(`https://api.${sitelink}/user/withdraw`,
                                     {username:username,
                                     pin:pinValue,
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
                                            withdrawErrorValue(data[1]);                                            
                                        }else {
                                            loadingSet(false);
                                            withdrawErrorValue('');
                                            userLoggedIn_update({username:username,token:token});
                                            isUserWithdrawkSet('false');
                                            user_withdrawals({username:username,timezone:timezone});
                                        }
                                    }).catch(e => {
                                        loadingSet(false);
                                        Toast.show('network errorr.', {
                                            duration: Toast.durations.LONG,
                                          })
                                    });
    }

    const  displayButton = () =>{
       if (activated < 1) {
           return     <ButtonComponent loading={true} disabled={true} >
                Pending Activation
            </ButtonComponent>
       }else if (limit == false) {
        return     <ButtonComponent loading={true} disabled={true} >
                        Limit Exhausted
                    </ButtonComponent>
       }else {
        if (loading ==false) {
            return <ButtonComponent onPressVal={withdrawHandler.bind(this)}>
                        Withdraw Now
                     </ButtonComponent>
            
        }else{
            return     <ButtonComponent loading={true} disabled={true} >
                        Processing
                     </ButtonComponent>
        }
       }
    }

    const PaymentInput = () => {
        if (paymentMethod === "Bitcoin") {
            return  <TextInput mode='outlined' placeholder='Enter your Bitcoin Address' 
            onChangeText={text => withdrawDestinationSet(text)} value={withdrawDestination} /> 
        }
        if (paymentMethod === "Bank"  ) {
         return <><TextInput mode='outlined' placeholder='Enter your Bank Name'
                    onChangeText={text => withdrawBankSet(text)} value={withdrawBank} />
                    <TextInput mode='outlined' placeholder='Enter your Banking Number'
                    onChangeText={text => withdrawDestinationSet(text)} value={withdrawDestination} />
                </>   
        }
                   
                    
    }

    const handlePinInsert = (text) => {
        pinValueSet(text);
        if (text.length > 4 && text.length <= 6 ) {
            pinValidSet(true)   
        }else{
            pinValidSet(false)
        }
    } 

    const pinButton = ()=> {
        if (pinValid) {
            if (loading ==false) {
                return <ButtonComponent onPressVal={pinHandler.bind(this)}>
                            Withdraw Now
                         </ButtonComponent>
                
            }else{
                return     <ButtonComponent loading={true} disabled={true} >
                            Processing
                         </ButtonComponent>
            }
        }
        
    }

    return (
        <View>
            {isUserWithdraw === 'true' ? 
            <>
            <View style={{ marginTop: 5, marginLeft: 20, marginRight: 20 }} >
            <Text>
                you recently made a withdrawal request of {withdrawalRequest[1].value} USD,
                to {withdrawalRequest[1].method}-{withdrawalRequest[1].destination} a pin is required to authorize this transaction
            </Text>
            <TextInput placeholder='enter pin' autoCapitalize='none' keyboardType='number-pad' 
            onChangeText={text=> handlePinInsert(text)} value={pinValue}/>

            
                <TouchableOpacity>
                {pinButton()}
                </TouchableOpacity>
                {displayWithdrawError()}
            </View>
            </>

            :

            <><View style={{ marginTop: 5, marginLeft: 20, marginRight: 20 }}>
                    <Text style={{ alignItems: 'center' }}>Amount</Text>
                    <TextInput mode='outlined' placeholder='How much to Withdraw? USD'
                        onChangeText={text => withdrawValueSet(text)} value={withdrawValue} />
                </View><View style={{ marginTop: 5, marginLeft: 20, marginRight: 20 }}>

                        <Picker style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
                            onValueChange={value => paymentMethodSet(value)} selectedValue={paymentMethod}>
                            <Picker.Item label='select payment method' />
                            <Picker.Item label='Bitcoin Withdrawal' value='Bitcoin' />
                            <Picker.Item label='Bank/Western Union' value='Bank' />


                        </Picker>
                    </View><View style={{ marginTop: 5, marginLeft: 20, marginRight: 20 }}>
                        {PaymentInput()}
                    </View>
                    <View style={{ marginTop: 5, marginLeft: 20, marginRight: 20 }}>
                        <TouchableOpacity>
                            {displayButton()}
                        </TouchableOpacity>
                        {displayWithdrawError()}
                    </View></>
            }

               <SafeAreaView>
               {displayUserWithdraws()}
               </SafeAreaView>
        </View>
       
    )
}

const mapStateToProps = (state) => {
    const {withdrawals,token} = state.Users;
    return {
        withdrawals : withdrawals,
        token: token
    }
}
export default connect(mapStateToProps,{user_withdrawals,userLoggedIn_update})(withTheme(Withdraw))