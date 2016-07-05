import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  WebView,
  Alert
} from 'react-native';
import ImagePicker  from 'react-native-image-picker';
import Clarifai from 'clarifai';
import Credential from '../configs/keys.js';

var styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  logo: {
    width: 200,
    height:200 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});


module.exports = React.createClass({
  getInitialState: function() {
    return {
      imgSource: '',
      url: '',
      tags: []
    };
  },
  componentWillMount: function(){
    Clarifai.initialize(Credential.clarifai);
  },
  onGallery: function() {
    var options = {
      title: 'Choose from',
      customButtons: {
        'Choose Photo from Facebook': 'fb',
      },
      storageOptions: { 
        skipBackup: true, 
        path: 'images'
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options), 
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
       this.setState({imgSource: response.uri});
        Clarifai.getTagsByImageBytes(response.data, {'model': 'food-items-v0.1'}).then(
        (res) => {

          let tags = res.results[0].result.tag.classes;
          
          
          // Alert.alert(this.state.url);
          this.props.setWebLink('https://www.pinterest.com/search/pins/?q='+tags[0]);
          this.props.setWebView(true);

        },
        function(error) {
          console.error(error);
        }
      );

      }
    });
  },
  render: function(){
    return (
      <View style={styles.container}>
        <Text style={styles.titleText} onPress={this.onGallery}>
          Select a picture
        </Text>
        <Image 
        source={{uri: this.state.imgSource}}
        style={styles.logo}
         /> 
      </View>
    );
  }
});