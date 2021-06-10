import React, { useState } from 'react';
import { Platform, useColorScheme, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Title, Text, withTheme, Caption, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ButtonComponent } from '../../components/button';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { sitelink } from '../../defaults';
import Toast from 'react-native-root-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {userLoggedIn_update} from '../../actions/userActions'

const ManageProfile = ({user,token,theme,userLoggedIn_update}) => {
  const colorScheme = useColorScheme();

    const[editable, editableSet] = useState(false);
    const[userFulName, userFulNameSet] = useState('');
    const[email, emailSet] = useState('');
    const[phone, phoneSet] = useState('');
    const[address, addressSet] = useState('');
    const [loading,loadingSet] = useState(false);
    const [successMessage,successMessageSet] = useState(false);
    const [date, setDate] = useState(new Date(user.date));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const handleUpdate =  async ()  =>{
        loadingSet(true)
        await axios.post(`https://api.${sitelink}/user/editprofile`,
        {
         username:user.username,   
         name : userFulName || user.name,
         email: email || user.email,
         phone: phone || user.phone,
         date: date || user.date,
         address: address || user.address  
            
        },
        {
            headers:{
                'Content-type':'application/json'
            }
        }
        ).then(res => {
            userLoggedIn_update({
                username:user.username,
                token:token
            });
            successMessageSet(true)
            
            loadingSet(false)  
        }).catch(e => {
            loadingSet(false);            
            Toast.show('network errorr.', {
                duration: Toast.durations.LONG,
            })
        })
    }
    const  displayButton = () =>{
        if (loading ==false) {
            return <ButtonComponent onPressVal={handleUpdate.bind(this)}>
                         Save
                     </ButtonComponent>
            
        }else{
            return     <ButtonComponent loading={true} disabled={true} >
                        Processing
                     </ButtonComponent>
        }
    }

    const displaySuccessMessage = () =>  {
        if(successMessage) {
            return <Text style={{color:theme.colors.success}}>Successfull</Text>
        }
    }
    

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
      const showMode = (currentMode: React.SetStateAction<string>) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    return (
        <KeyboardAwareScrollView style={ { flex:1, marginTop:50, marginLeft:20,marginRight:20}}>
            {editable == true ? 
            
                <>
                <View>
                    <TouchableOpacity onPress={()=>editableSet(false)}>
                        <Caption>
                        <FontAwesome5 name='caret-left' size={12}/>   Back
                        </Caption>
                    </TouchableOpacity>

                    <View>
                         <Title style={{ marginTop: 30, fontSize: 30,fontWeight:'bold' }}>
                            Edit Profile
                        </Title>
                    </View>
                    <View style={{ marginTop: 30, borderTopWidth: 1, borderTopColor: '#eee' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Title>
                                                        Personal Information
                                </Title>
                               
                            </View>
                    </View>                     
                    <View style={{ marginTop: 25 }}>
                        <Caption>Full Name</Caption>
                        <TextInput mode='outlined' value={userFulName || user.name} defaultValue={user.name}
                        onChangeText={text => userFulNameSet(text)} autoCapitalize='none'
                        />
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Caption>Email</Caption>
                        <TextInput mode='outlined'value={email || user.email} defaultValue={user.email}
                        onChangeText={text => emailSet(text)} autoCapitalize='none'/>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Caption>Phone Number</Caption>
                        <TextInput mode='outlined' value={phone || user.phone} defaultValue={user.phone}
                        onChangeText={text => phoneSet(text)} autoCapitalize='none'/>
                    </View>
                    <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between'  }}>
                        <Caption>Date of Birth - {user.date}</Caption>
                       <TouchableOpacity onPress={showDatepicker}>
                       <Caption style={{color:theme.colors.info}}>
                            Change
                        </Caption>
                       </TouchableOpacity>
                    </View>
                    <View>
                   { show && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="calendar"
                            onChange={onChange}
                            themeVariant={colorScheme}
                            />
                        )
                   }   
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Caption>Address</Caption>
                        <TextInput mode='outlined' value={address || user.address} defaultValue={user.address}
                        onChangeText={text => addressSet(text)}  autoCapitalize='none'/>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        {displayButton()}
                        {displaySuccessMessage()}
                    </View>

                </View>

                </>
            :

            <><View>
                    <Title>
                        User Information
                    </Title>
                    <Text style={{ marginTop: 10 }}>
                        From Here You can see Basic Information about your account
                    </Text>
                </View>
                <View style={{ borderTopWidth: 1, borderTopColor: '#eee' }}>
                        <Title style={{ marginTop: 20, fontSize: 30 }}>
                            {user.name}
                        </Title>
                        <Text>
                            {user.email}
                        </Text>
                    </View><View style={{ marginTop: 30, borderTopWidth: 1, borderTopColor: '#eee' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Title>
                                                      Personal Information
                            </Title>
                            <TouchableOpacity onPress={() => editableSet(true)}>
                                <Title style={{ color: theme.colors.info }}>
                                                        Edit Profile
                                </Title>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 25 }}>
                        <Caption>
                            Full Name
                        </Caption>
                        <Title>
                            {user.name}
                        </Title>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Caption>
                                                Email
                        </Caption>
                        <Title>
                            {user.email}
                        </Title>

                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Caption>
                            Phone Number
                        </Caption>
                        <Title>
                            {user.phone}
                        </Title>

                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Caption>
                            Date of Birth
                        </Caption>
                        <Title>
                            {user.date}
                        </Title>

                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Caption>
                            Address
                        </Caption>
                        <Title>
                            {user.address}
                        </Title>

                    </View></>
            }
        </KeyboardAwareScrollView>
    )
}
const mapStateToProps = (state) => {
    const {user,token} = state.Users;
    return {
        user:user,
        token:token
    }
}
export default connect(mapStateToProps,{userLoggedIn_update})(withTheme(ManageProfile));