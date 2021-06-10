import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
const LiveChat = () => {
    const smartsupp = `_smartsupp || {};
    _smartsupp.key = 'f2276a9eb4b4f4bca97c27ad4d1c6dfa6f0aa090';
    window.smartsupp||(function(d) {
      var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
      s=d.getElementsByTagName('script')[0];c=d.createElement('script');
      c.type='text/javascript';c.charset='utf-8';c.async=true;
      c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
    })(document)`
    return(
        <View style={{flex:1}}>
                <WebView 
                originWhitelist={['*']}
                    source={{html :'<h1>Here i am</h1>'}}
                    javaScriptEnabled={true}
                    injectedJavaScript={smartsupp}
                    injectedJavaScriptBeforeContentLoaded={smartsupp}
                    allowFileAccessFromFileURLs={true}
                    
                />
        </View>
);
}
export default LiveChat;