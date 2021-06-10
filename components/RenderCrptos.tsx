import { Card, withTheme,Text } from 'react-native-paper';
import React from 'react';
import { View,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const RenderCrptos = ({data}) => {
    const {item} = data; 
    
    return(
        <TouchableOpacity>
                <Card style={{marginBottom:8}}>
                    <Card.Content>
                        
                            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                                <Image source={{uri:item.logo_url}} style={{width:65,height:65,borderRadius:100}}/>
                            
                                <View style={{flexDirection:'row',marginTop:20,marginLeft:10}}>
                                    <View>
                                        <Text>
                                            {item.type}
                                        </Text>
                                        
                                    </View>
                                    
                                </View>
                                <View style={{marginLeft:120,marginTop:30}}>
                                    <Text>{item.price}</Text>
                                </View>
                            </View>
                    </Card.Content>
            </Card>
        </TouchableOpacity>
    )
};

export default withTheme(RenderCrptos);