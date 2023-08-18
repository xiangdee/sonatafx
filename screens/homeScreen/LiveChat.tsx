import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
const LiveChat = () => {
    const smartsupp = `<!-- Smartsupp Live Chat script -->
    <script type="text/javascript">
    var _smartsupp = _smartsupp || {};
    _smartsupp.key = '00ab963cb147182d5a91c68fc03ec44265a38fa0';
    window.smartsupp||(function(d) {
      var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
      s=d.getElementsByTagName('script')[0];c=d.createElement('script');
      c.type='text/javascript';c.charset='utf-8';c.async=true;
      c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
    })(document);
    </script>>`
    return(
        <View style={{flex:1}}>
                <WebView 
                originWhitelist={['*']}
                    source={{uri :'https://www.smartsupp.com/widget/00ab963cb147182d5a91c68fc03ec44265a38fa0'}}
                    javaScriptEnabled={true}
                    injectedJavaScript={smartsupp}
                    injectedJavaScriptBeforeContentLoaded={smartsupp}
                    allowFileAccessFromFileURLs={true}
                    
                />
        </View>
);
}
export default LiveChat;