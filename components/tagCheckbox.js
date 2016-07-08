import CheckBox from 'react-native-checkbox';
import React from 'react';
import {
  View 
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import TagItem from './tagItem.js';
module.exports = React.createClass({

  render: function() { 
    return (
    <View> 
      <Row> 
      {
        this.props.tags.map((Tag, index)=>{
          return(
            <Col>
          <TagItem 
          tag={Tag.tag} 
          checked={Tag.isChecked} 
          setCheck={this.props.setCheck}
          index={index}
          /></Col>
            );
        })
      }  
      </Row>
    </View>
    );
  }
});


