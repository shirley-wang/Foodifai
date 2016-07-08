import CheckBox from 'react-native-checkbox';
import React from 'react';
import {
  View, 
  Alert
} from 'react-native';

module.exports = React.createClass({
  onChange: function() {
    // Alert.alert(this.props.index.toString());
    this.props.setCheck(this.props.index);

  },
  render: function(){
    return (
      <CheckBox
        label={this.props.tag}
        checked={this.props.isChecked}
        onChange={(checked)=>this.onChange}
      />

    );
  }
});