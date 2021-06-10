import { Card, withTheme,Text, Caption } from 'react-native-paper';
import React from 'react';
import { View, Image, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const RenderNews = ({data}) => {    
    const {item} = data;    
    return(
        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                <Card style={{marginBottom:35}}>
                        
                            <View style={{marginLeft:3,marginRight:3}}>
                                <View>
                                    
                                
                                    <View style={{marginTop:20,marginLeft:4}}>
                                        <View>
                                            <Text>
                                                Title:{item.title}
                                                
                                            </Text>
                                           
                                            
                                        </View>
                                        
                                    </View>
                                   
                                </View>
                            </View>
                    <View style={{marginLeft:10,marginRight:10}}>
                    <Image source={{uri:item.urlToImage}} style={{width:null,height:400,flex:1}}/>
                    </View>
                    <View style={{marginLeft:10,marginRight:10,marginTop:30}}>
                                        <Caption>
                                            {item.publishedAt}
                                        </Caption>
                                        <Text>{item.content}</Text>
                     </View>
            </Card>
        </TouchableOpacity>
    )
};

export default withTheme(RenderNews);