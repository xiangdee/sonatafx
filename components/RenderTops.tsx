import { Card, withTheme,Text } from 'react-native-paper';
import React from 'react';
import { View,Image } from 'react-native';
import {random} from './rand';
const RenderTops = ({data}) => {
    const {item} = data;
    
    return(
    <Card style={{marginBottom:8}}>
        <Card.Content>
            
                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                    <Image source={{uri:item.pictureM}} style={{width:65,height:65,borderRadius:100}}/>
                
                    <View style={{flexDirection:'row',marginTop:20,marginLeft:10}}>
                        <View>
                            <Text>
                                {item.name}
                            </Text>
                            <Text>
                                {item.country}
                            </Text>
                        </View>
                        
                    </View>
                    <View style={{marginLeft:120,marginTop:30}}>
                        <Text>${random()}</Text>
                    </View>
                </View>
        </Card.Content>
    </Card>
    )
};

export default RenderTops;