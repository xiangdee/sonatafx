import React, { useEffect } from 'react'
import * as SecureStore from 'expo-secure-store';
import { withTheme,Text,Card, Title, Button, Caption } from 'react-native-paper';
import { connect } from 'react-redux';
import { userLoggedIn_update } from '../../actions/userActions'  
import { View, ScrollView, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused  } from '@react-navigation/native'
import { sitelink, sitename } from '../../defaults';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = (props)=>  {
 const isFocused= useIsFocused();
 const store = async ()=> {   
   if (!props.isLogggedin) {
     props.navigation.replace('Welcome')
   }else {
    props.userLoggedIn_update(props.isLogggedin)
   }
  }

     const displayMainContent = () => { 
      store() ;     

    if ( props.userverify == false) {
        return props.navigation.replace('Welcome')
    }  
    
    }
    useEffect(() => {
      displayMainContent();
      return () => {
        props.user;
      }
    },  [isFocused])
    

  
      const {theme,navigation,username,user,token} = props;
      return (
        <ScrollView style={{marginTop:30}}>
            <Card style={{backgroundColor:theme.colors.primary}}>
              <Card.Content style={{alignItems:'center'}}>
                <Title style={{color:'white'}}>Total Balance</Title>
                <Text style={{color:'white',marginTop:5}}>
                  {user.balance || parseFloat('0.00')}
                </Text>
              </Card.Content>
              <Card.Content style={{alignItems:'center',marginTop:10}}>
                <View  style={{flexDirection:'row'}}>
                  <TouchableOpacity>
                    <Button style={{opacity:0.9,backgroundColor:"#150d0d",
                      borderBottomLeftRadius:8,borderTopLeftRadius:8,
                      borderBottomRightRadius:0,borderTopRightRadius:0,marginRight:2,width:150}}
                      onPress={()=> navigation.navigate('Deposit', {
                        username:user.username,
                        userid:user.id
                        
                      })}
                      >
                        <Text style={{color:'white'}}>DEPOSIT</Text>
                    </Button>
                  </TouchableOpacity>
                   <TouchableOpacity>
                    <Button style={{opacity:0.9,backgroundColor:"#150d0d",
                    borderBottomLeftRadius:0,borderTopLeftRadius:0,
                    borderBottomRightRadius:8,borderTopRightRadius:8,width:150}}
                    onPress={()=> navigation.navigate('Withdraw', {
                      username:user.username,
                      userid:user.id,
                      "activated":user.activated,
                      "limit":user.limit,
                      withdrawalRequest:user.withdrawalRequest
                      
                    })}
                    >
                        <Text style={{color:'white'}}>WITHDRAW</Text>
                    </Button>
                   </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
            <View style={{marginLeft:10,marginRight:10,marginTop:20}}>
            <Card>
                      <View style={{marginLeft:10,marginRight:10,marginTop:25}}>
                        <Title style={{fontWeight:'bold'}}>Investment Analysis</Title>
                        <Caption>
                          Get satistics concerning investment with {sitename}
                        </Caption>
                      </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:10,marginBottom:20}}>
                            <TouchableOpacity onPress={()=> navigation.navigate('TopEarners')}>
                                <Card style={{backgroundColor:theme.colors.background,width:120,height:110}}>
                                  <Card.Content>
                                    
                                        <MaterialCommunityIcons name='account-group' size={41} color={theme.colors.text} style={{marginLeft:10}}/>
                                      <Text style={{marginLeft:10}}>Top Earners</Text>
                                  </Card.Content>
                              </Card>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> navigation.navigate('TopDeposit')}>
                              <Card style={{backgroundColor:theme.colors.background,width:120,height:110}}>
                                <Card.Content>
                                    <MaterialCommunityIcons name='currency-usd-circle' size={41} color={theme.colors.text} style={{marginLeft:10}}/> 
                                    <Text style={{marginLeft:10}}>Recent Deposits</Text>
                                </Card.Content>
                              </Card>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> navigation.navigate('InvestmentStatistics')}>
                              <Card style={{backgroundColor:theme.colors.background,width:120,height:110}}>
                                <Card.Content>
                                  <MaterialCommunityIcons name='hammer-wrench' size={33} color={theme.colors.text} style={{marginLeft:10}}/>
                                    <Text>Investment Statistics</Text>
                                </Card.Content>
                              </Card>
                            </TouchableOpacity>
                        </View>
                    </Card>
                    <Card style={{marginTop:20}}>
                      <View style={{marginLeft:10,marginRight:10,marginTop:25}}>
                        <Title style={{fontWeight:'bold'}}>Market Analysis</Title>
                        <Caption>
                          Stay up to date with the latest market trends
                        </Caption>
                      </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:10,marginBottom:20}}>
                            <TouchableOpacity  onPress={()=> navigation.navigate('Cryptos', {
                              username:username
                            })}>
                                <Card style={{backgroundColor:theme.colors.background,width:120,height:110}}>
                                  <Card.Content>
                                    
                                        <MaterialCommunityIcons name='chart-line-variant' size={41} color={theme.colors.text} style={{marginLeft:10}}/>
                                      <Text style={{marginLeft:10}}>Crypto Trends</Text>
                                  </Card.Content>
                              </Card>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>navigation.navigate('HowToInvest')}>
                              <Card style={{backgroundColor:theme.colors.background,width:120,height:110}}>
                                <Card.Content>
                                    <MaterialCommunityIcons name='lightbulb-outline' size={41} color={theme.colors.text} style={{marginLeft:10}}/> 
                                    <Text style={{marginLeft:10}}>How to Invest</Text>
                                </Card.Content>
                              </Card>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> navigation.navigate('News', {
                              username:username
                            })}>
                              <Card style={{backgroundColor:theme.colors.background,width:120,height:110}}>
                                <Card.Content>
                                  <FontAwesome5 name='business-time' size={33} color={theme.colors.text} style={{marginLeft:10}}/>
                                    <Text>latest news</Text>
                                </Card.Content>
                              </Card>
                            </TouchableOpacity>
                        </View>
                    </Card>
                    <Card style={{marginTop:20}}>
                      <View style={{marginLeft:10,marginRight:10,marginTop:25}}>
                        <Title style={{fontWeight:'bold'}}>Help Center</Title>
                        <Caption>
                          Get Answers to your questions concerning investment with {sitename}
                        </Caption>
                      </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:10,marginBottom:20}}>
                            <TouchableOpacity onPress={()=> Linking.openURL(`https://${sitelink}/blog-list`)}>
                                <Card style={{backgroundColor:theme.colors.background,width:120,height:110}}>
                                  <Card.Content>
                                    
                                        <MaterialCommunityIcons name='desktop-tower-monitor' size={41} color={theme.colors.text} style={{marginLeft:10}}/>
                                      <Text>Our Blog</Text>
                                  </Card.Content>
                              </Card>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=> Linking.openURL(`https://${sitelink}/help-center`)}>
                              <Card style={{backgroundColor:theme.colors.background,width:120,height:110}}>
                                <Card.Content>
                                    <FontAwesome5 name='book-reader' size={33} color={theme.colors.text} style={{marginLeft:20}}/>
                                    <Text>Knwoledge Center</Text>
                                </Card.Content>
                              </Card>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={()=> navigation.navigate('LiveChat')}>
                              <Card style={{backgroundColor:theme.colors.background,width:120,height:110}}>
                                <Card.Content>
                                  <MaterialCommunityIcons name='chat' size={33} color={theme.colors.text} style={{marginLeft:10}}/>
                                    <Text>live chat</Text>
                                </Card.Content>
                              </Card>
                            </TouchableOpacity> */}
                        </View>
                    </Card>
                    
            </View>
            <StatusBar style="auto" backgroundColor={theme.colors.primary} />
        </ScrollView>
      )
    }
  
  const mapStateToProps =  (state) => {
    const {userverify,username,user,token} = state.Users;
    const {isLogggedin} = state.Auth;

    return {userverify:userverify,
           username:username,
           user:user,
           token:token,
           isLogggedin:isLogggedin
          };

  }

export default connect(mapStateToProps,{userLoggedIn_update})(withTheme(Home));


