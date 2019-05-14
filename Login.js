/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { AsyncStorage,StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Image,ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {login} from './Action/ActionCreators';
import { connect } from 'react-redux';

class Login extends Component {
  /**
   *  Initialize state for component
   */
  constructor(props){
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.state={
      username:'',
      password:'',
      submitActivity:false,
      loginReponseData:''
    }
  }

  /**
   *  get updated data from props
   *  get compare data from previous state 
   */
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.loginReponse!==prevState.loginReponseData){
      return { loginReponse: nextProps.loginReponse};
   }
   else return null;
    //console.log(nextProps.loginReponse,prevState.loginReponse,'loginReponse');
  }
  componentDidMount(){
    {AsyncStorage.getItem("loginToken").then((value) => {
      if(value!==null){
        Actions.home();
      }
  }).done()}
  }
componentDidUpdate(prevProps, prevState) {
    if(prevProps.loginReponse!==this.props.loginReponse){
      //Perform some operation here
      AsyncStorage.setItem('loginToken',this.props.loginReponse.data.token);
      this.setState({loginReponseData: this.props.loginReponse.data.token});
      Actions.home();
    }
  }

  /**
   *  Update state for Username
   */
  userNameFunction = (text) =>{
    this.setState({username:text});
  }
  /**
   *  Update state for password
   */
  userPasswordFunction = (text) =>{
    this.setState({password:text});
  }
  /**
   *  Reset form 
   *  clear form to click on reset button
   */
  resetFunction =()=>{
    this.setState({username:'',password:''});
  }
/**
   *  Submit login form
   * validate form and show arror in alert 
   *  clear form to click on reset button
   */
  submitLogin = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.state.username.trim()=='' || this.state.password.trim()==''){
      alert('Input required');
      return false;
    }
    if (reg.test(this.state.username) === false) {
      this.emailRef.current.focus();
      alert('Email is Not Correct');
      return false;
    }else if(this.state.password.length<8){
      this.passwordRef.current.focus();
      alert('password should be more then 8 characters');
      return false;
    }else{
      let payload={username: this.state.username,password: this.state.password};
      this.props.login(payload);
      this.setState({submitActivity:true});
    }
  }
  
  /**
   *  Implement view
   */
  render() {

    return (
      <View style={styles.container}>
        <View>
          <TextInput value={this.state.username} ref={this.emailRef} onChangeText={this.userNameFunction} autoFocus={true} placeholder={'Username'} style={styles.inputSize}></TextInput>
          <TextInput value={this.state.password} ref={this.passwordRef} secureTextEntry={true} onChangeText={this.userPasswordFunction} placeholder={'Password'} style={styles.inputSize}></TextInput>
        </View>
        <View style={styles.buttonMargin}>
        {(this.state.submitActivity)?<ActivityIndicator></ActivityIndicator>:null}
          <TouchableOpacity style={styles.loginButton} onPress={this.submitLogin}>
            <Image style={{ width: 20, height: 20, marginLeft: 10, backgroundColor: 'white' }} source={require('./assets/login.png')} />
            <Text style={styles.loginButtonText}>{'Login'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.loginButton} onPress={this.resetFunction}>
            <Image style={{ width: 20, height: 20, marginLeft: 10, backgroundColor: 'white' }} source={require('./assets/reset.png')} />
            <Text style={styles.loginButtonText}>{'Reset'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'
  },
  buttonMargin: { marginTop: 20 },
  inputSize: { margin: 10, width: Dimensions.get('window').width * .8, height: 40, borderColor: '#D3D3D3', borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  loginButton: { borderRadius: 10, margin: 5, width: Dimensions.get('window').width * .8, height: 40, backgroundColor: '#ffffff', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderColor: '#D3D3D3', borderWidth: 1 },
  loginButtonText: { flex: .9, textAlign: 'center', color: 'gray', fontSize: 14, marginRight: 50 },
});

const mapStateToProps = ({homeReducer}) => {
  const {loginReponse}=homeReducer;
return {loginReponse:loginReponse}
}

module.exports = connect(mapStateToProps, {login})(Login);