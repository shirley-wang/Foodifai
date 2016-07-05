import React from 'react';
import Uploader from './uploader.js';
import WebView from './webView.js';
import {
  View 
} from 'react-native';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      isWebView: false,
      webLink: '',
    };
  },
  setWebView: function(webViewState){
    this.setState({isWebView: webViewState});
  },
  setWebLink: function(webLinkToView) {
    this.setState({webLink: webLinkToView});
  },
  render: function() {

    let appContent;

    if(this.state.isWebView === true){
      appContent = <WebView webLink={this.state.webLink}/>
    }
    else{
      appContent = <Uploader 
      setWebView={this.setWebView}
      setWebLink={this.setWebLink}
      />
    }
    console.log(appContent);
    return (
      <View>
        {appContent}
      </View>
    );
  }
});