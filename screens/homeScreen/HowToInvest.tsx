import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title,Text } from 'react-native-paper';
import { sitename } from '../../defaults';
const HowToInvest = () => {
    return(
    <ScrollView style={{marginTop:20}}>
            <Card >
                <Card.Content>
                    <View style={{alignItems:'center'}}>
                    <Title>How do I buy cryptocurrency?</Title>
                    </View>
                    <View style={{marginTop:20,borderTopWidth:2}}>
                        <View style={{marginTop:20,marginRight:4,marginLeft:4}}>
                            <Text>
                            While some cryptocurrencies, including Bitcoin, are available for purchase with U.S. 
                            dollars, others require that you pay with bitcoins or another cryptocurrency.
                            </Text>
                            <Text style={{marginTop:10}}>
                            To buy cryptocurrencies, you’ll need a “wallet,” an online app that can hold 
                            your currency. Generally, you create an account on an exchange, and then you can 
                            transfer real money to buy cryptocurrencies such as Bitcoin or Ethereum.
                            </Text>
                            <Text style={{marginTop:10}}>
                            While some cryptocurrencies, including Bitcoin, are available for purchase with U.S. dollars, others require that you pay with bitcoins or another cryptocurrency.

                            To buy cryptocurrencies, you’ll need a “wallet,” an online app that can hold your currency. Generally, you create an account on an exchange, and then you can 
                            transfer real money to buy 
                            cryptocurrencies such as Bitcoin or Ethereum. Here's more on how to invest in Bitcoin.

                            Coinbase is one popular cryptocurrency trading exchange where you can create both a wallet and buy and sell Bitcoin and other cryptocurrencies. 
                            Also, a growing number of online brokers offer cryptocurrencies, such as eToro, Tradestation and Sofi Active Investing. Robinhood offers free 
                            cryptocurrency trades (Robinhood Crypto is available in most, but not all, U.S. states).
                            </Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>

            <Card style={{marginTop:20}}>
                <Card.Content>
                    <View style={{alignItems:'center'}}>
                    <Title> invest in {sitename} with six steps</Title>
                    </View>
                    <View style={{marginTop:20,borderTopWidth:2}}>
                        <View style={{marginTop:20,marginRight:4,marginLeft:4}}>
                            <Text style={{marginTop:10}}>1. Decide how you want to invest in the {sitename} market.</Text>
                            <Text style={{marginTop:10}}>2. Choose an investing account.</Text>
                            <Text style={{marginTop:10}}>3. Learn the difference between investing in stocks and crptos.</Text>
                            <Text style={{marginTop:10}}>4. Set a budget for your stock investment.</Text>
                            <Text style={{marginTop:10}}>5. Focus on investing for the long-term.</Text>
                            <Text style={{marginTop:10}}>6. Manage your investment portfolio.</Text>
                           
                        </View>
                    </View>
                </Card.Content>
            </Card>
            <Card style={{marginTop:20}}>
                <Card.Content>
                    <View style={{alignItems:'center'}}>
                    <Title> Managing your Investment</Title>
                    </View>
                    <View style={{marginTop:20,borderTopWidth:2}}>
                        <View style={{marginTop:20,marginRight:4,marginLeft:4}}>
                            <Text style={{marginTop:10}}>one option is to invest with bitcoin now and 
                            then withdraw it if and when its your profit value moves higher. But if you see a future for yourself as a 
                            {sitename} investor, perhaps your investment plan is to buy and hold for the long haul.</Text>
                            
                           
                        </View>
                    </View>
                </Card.Content>
            </Card>

    </ScrollView>
);
}
export default HowToInvest;