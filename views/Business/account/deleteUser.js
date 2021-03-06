
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  AlertIOS,
  AsyncStorage,
} from 'react-native';

var Util = require('../../CommonComponent/util');
var Service = require('../../service/service');

export default class DeleteUser extends Component{

  constructor(props) {
    super(props);
    this.state =  {
      tel: ''
    }
  }

  render(){
    return (
      <ScrollView>

        <View style={{height:35, marginTop:30,}}>
          <TextInput style={styles.input}  placeholder="请输入用户的手机号" onChangeText={this._getTel.bind(this)}/>
        </View>

        <View>
          <TouchableOpacity onPress={this._deleteUser.bind(this)}>
            <View style={styles.btn}>
              <Text style={{color:'#FFF'}}>删除用户</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  _getTel(val){
    this.setState({
      tel: val
    });
  }

  _deleteUser(){
    var that = this;
    this.state.tel == '' ?
      AlertIOS.alert('提示', '请输入要删除的用户手机号') :
      AlertIOS.alert('提示', '确认删除该用户？', [
        {
          text: '删除',
          onPress: ()=> {
            var path = Service.host + Service.deleteUser;
            AsyncStorage.getItem('token', function(err, data){
              if(!err){
                Util.post(path,{
                  token: data,
                  tel: that.state.tel
                }, function(data){
                  if(data.status){
                    AlertIOS.alert('成功', '删除成功');
                  }else{
                    AlertIOS.alert('失败', '删除失败');
                  }
                });
              }else{
                AlertIOS.alert('提示', '没有权限');
              }
            });
          }
        },
        {text: '取消', onPress: ()=>null},
      ]);
  }
}

var styles = StyleSheet.create({
  input:{
    flex:1,
    marginLeft:20,
    marginRight:20,
    height:35,
    borderWidth:1,
    borderColor:'#ddd',
    borderRadius:4,
    paddingLeft:5,
    fontSize:13,
  },
  btn:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    backgroundColor:'#1DB8FF',
    height:38,
    marginLeft:20,
    marginRight:20,
    borderRadius:4,
  }
});
