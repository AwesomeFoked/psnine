import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  ToastAndroid,
  BackAndroid,
  TouchableOpacity,
  Dimensions,
  TouchableNativeFeedback,
  RefreshControl,
  WebView,
} from 'react-native';

import { connect } from 'react-redux';
import reducer from '../reducers/rootReducer.js'
import { bindActionCreators } from 'redux';

let toolbarActions = [
  {title: '收藏', icon: require('image!ic_collect_white') ,show: 'always'},
  {title: '刷新', icon: require('image!ic_refresh_white'), show: 'always'},
  {title: '感谢', show: 'never'},
  {title: '分享', show: 'never' },
];
let title = "TOPIC";
let WEBVIEW_REF = `WEBVIEW_REF`;

class Deal extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLogIn: false,
      canGoBack: false,
    }
  }

  _onActionSelected = (index) => {
    switch(index){
      case 0 :
        return;
      case 1 :
        return this.refs[WEBVIEW_REF].reload();
      case 2 :
        return;
      case 3 :
        return;
    }
  }

  _pressButton = () => {
    if(this.state.canGoBack)
      this.refs[WEBVIEW_REF].goBack();
    else
      this.props.navigator.pop();
  }

  onNavigationStateChange = (navState) => {
    if(navState.url.indexOf(this.props.URL) !== -1 ){
      this.setState({
        canGoBack: navState.canGoBack,
      });
    }else{
      // let replyFloorURL = ``;
      // let replyMainURL = ``;
      // let emotionURL = ``;
      // console.log('Target URL:',navState);
      this.setState({
        canGoBack: navState.canGoBack,
      });
      this.refs[WEBVIEW_REF].stopLoading();
    }//return false;
  }

 onShouldStartLoadWithRequest = (event) => { 
    console.log(event);
    return true; 
  }

  render() {
    console.log('Deal.js rendered');
    return ( 
          <View style={{flex:1}}>
              <ToolbarAndroid
                navIcon={require('image!ic_back_white')}
                title={this.props.title}
                style={styles.toolbar}
                actions={toolbarActions}
                onIconClicked={this._pressButton}
                onActionSelected={this._onActionSelected}
              />
              <WebView
                  ref={WEBVIEW_REF}
                  source={{uri: this.props.URL}} 
                  style={{flex:3}}
                  scalesPageToFit={true}
                  domStorageEnabled={true}
                  onNavigationStateChange={this.onNavigationStateChange}
                  onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                  startInLoadingState={true}  
                  injectedJavaScript={`$('.header').hide()`}
              />
          </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    backgroundColor: '#00a2ed',
    height: 56,
  },
  selectedTitle:{
    //backgroundColor: '#00ffff'
    //fontSize: 20
  },
  avatar: {
    width: 50,
    height: 50,
  }
});


export default Deal