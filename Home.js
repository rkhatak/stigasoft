/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,FlatList,Dimensions,TextInput} from 'react-native';
import { Actions, Router, Reducer, Scene,Stack} from 'react-native-router-flux';
import { connect } from 'react-redux';
import {addToDo} from './HomeAction';

var increment=0;
var data=[];

class Home extends Component {

  /**
   *  Initialize state for component
   */
  constructor(props){
    super(props);
    this.state={
      todo:'',
      openToAddTodo:false,
      toDoListData:[]
    }
  }
  addTodo =() =>{
   this.setState({openToAddTodo:!this.state.openToAddTodo});
  } 

  addTodoList= () =>{
    if(this.state.todo!=''){
      increment+=1;
      var payload={id:increment,name:this.state.todo};
      this.props.addToDo(payload);
    }
  }
  updateTodo(value,pid) {
    return value != pid;
  }
  deleteToDo(pId){
    let updateObj=this.state.toDoListData;
    let newData=updateObj.filter(function(el) {
      return el.id !== pId;
  });
  this.setState({toDoListData:newData});
  }
  updateTodo = (text) =>{
    this.setState({todo:text});
  }

  /**
   *  get updated data from props
   *  get compare data from previous state 
   */
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.toDoList!==prevState.toDoList){
      return { toDoList: nextProps.toDoList};
   }
   else return null;
    //console.log(nextProps.loginReponse,prevState.loginReponse,'loginReponse');
  }
componentDidUpdate(prevProps, prevState) {
    if(prevProps.toDoList!==this.props.toDoList){
      var newdata=this.props.toDoList;
      var oldD=this.state.toDoListData;
      oldD.push(newdata);
      this.setState({toDoListData:oldD,openToAddTodo:false,todo:''});
    }
  }

  renderHeader = ()=>{
    return(<View style={{flex:.2}}>
      <TouchableOpacity onPress={this.addTodo}><Text style={styles.welcome}>Add</Text></TouchableOpacity>
      {(this.state.openToAddTodo)?<View>
      <TextInput value={this.state.todo}  onChangeText={this.updateTodo} autoFocus={true} placeholder={'Enter'} style={styles.inputSize}></TextInput>
      <TouchableOpacity style={styles.loginButton} onPress={this.addTodoList}>
          <Text style={styles.loginButtonText}>{'Submit'}</Text>
        </TouchableOpacity>
      </View>:null}
      </View>)
  }

  renderToDoList = (item) =>{
    let pId=item.item.id;
    return (<View key={item.item.id}>
    <View style={{flex:1,flexDirection:'row',margin:10,borderBottomWidth:1,borderBottomColor:'gray',justifyContent:'space-between',alignItems:'center'}}>
    <Text style={{flex:.8,color:'gray',fontSize:14,marginTop:10,textAlign:'center'}}>{item.item.name}</Text>
    <TouchableOpacity style={styles.loginButton} onPress={()=>this.deleteToDo(pId)}>
          <Text style={styles.loginButtonText}>{'Delete'}</Text>
    </TouchableOpacity>
    </View>
    
    
    </View>)
  }

  emptyContainer = () =>{
    return (<View style={styles.emptyContainer}><Text>{'There is no ToDo'}</Text></View>)
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
        style={{ width: '100%', top: 15 }}
        data={this.state.toDoListData}
        keyExtractor={item => item.id}
        renderItem={this.renderToDoList}
        ListHeaderComponent={this.renderHeader}
        ListEmptyComponent={this.emptyContainer}

      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection:'column'
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  welcome: {
    fontSize: 14,
    textAlign: 'right',
    margin: 10,
    color:'black',
    right:10,
    flexDirection:'row',
    justifyContent:'flex-end',
    marginTop:50,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonMargin: { marginTop: 20 },
  inputSize: { margin: 10, width: Dimensions.get('window').width * .8, height: 40, borderColor: '#D3D3D3', borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  loginButton: { borderRadius: 10, margin: 5, width: Dimensions.get('window').width * .3, height: 40, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderColor: '#D3D3D3', borderWidth: 1 },
  loginButtonText: {textAlign: 'center', color: 'gray', fontSize: 14},
});

const mapStateToProps = ({homeReducer}) => {
  const {toDoList}=homeReducer;
return {toDoList:toDoList}
}

module.exports = connect(mapStateToProps, {addToDo})(Home);