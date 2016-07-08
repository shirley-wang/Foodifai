import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  WebView,
  Alert,
  TouchableOpacity
} from 'react-native';
import ImagePicker  from 'react-native-image-picker';
import Clarifai from 'clarifai';
import Credential from '../configs/keys.js';
import {
  Container, 
  Content, 
  Button,
  Header,
  Title
} from 'native-base';

import TagCheckbox from './tagCheckbox.js';
import { Col, Row, Grid } from 'react-native-easy-grid';
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

var tagArr = [];

module.exports = React.createClass({
  getInitialState: function() {
    return {
      imgSource: '',
      url: '',
      tags: [],
      showOptions: false,
      isChecked: false
    };
  },
  componentWillMount: function(){
    Clarifai.initialize(Credential.clarifai);
  },
  onGallery: function() {
    var options = {
      title: 'Choose from',
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
          let arr = [];
          let tags = res.results[0].result.tag.classes;
          for(let i = 0; i < tags.length; i++){
            let obj = {};
            obj.tag = tags[i];
            obj.isChecked=false;
            tagArr[i] = obj;
          };

          this.setState({tags:arr});
          this.setState({url:tags[0].tag});
          this.setState({showOptions: true});
        },
        function(error) {
          console.error(error);
        }
      );

      }
    });
  },
  onPinterest: function() {
    this.props.setWebLink('https://www.pinterest.com/search/pins/?q='+this.state.url);
    this.props.setWebView(true);
  },
  onAllrecipes: function() {
    this.props.setWebLink('http://allrecipes.com/search/results/?wt='+this.state.url);
    this.props.setWebView(true);
  },
  onYummly: function() {
    this.props.setWebLink('http://www.yummly.com/recipes?q='+this.state.url);
    this.props.setWebView(true);
  },
  setCheck: function(index) {
    tagArr[index].isChecked = !tagArr[index].isChecked;
    Alert.alert(tagArr[index].isChecked.toString());
  },
 
  render: function(){
    return (
      <Container>
        <Header><Title>Foodifai</Title></Header>
        <Content>
          <Grid>
            <Row  style={{backgroundColor:'red'}}>
              <Col size={25}></Col>
              <Col size={50}>
                <Button block primary onPress={this.onGallery}>
                Select a picture
                </Button>
                <Image 
                source={{uri: this.state.imgSource}}
                style={styles.logo}
                 /> 
              </Col>
              <Col size={25}></Col>
            </Row>
            <Row>
              {
              this.state.showOptions === true ?
             
              <TagCheckbox tags={tagArr} setCheck={this.setCheck}
              /> : null
              }
              
             
            </Row>
            <Row  style={{backgroundColor:'yellow'}}>
            {
              this.state.showOptions === true ?
              <Button block success onPress={this.onPinterest}>
              Get Recipes!
              </Button> : null
            }   
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
});