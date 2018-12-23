import React, {Component} from 'react';
import { Image, View, StyleSheet, Dimensions, Text, Button, TouchableOpacity, TouchableHighlight} from 'react-native';
import { } from 'react-native-elements';
import { Thumbnail,Card, CardItem,Left,Body } from 'native-base';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import renderIf from '../../components/renderif';

let windowWidth = Dimensions.get('window');
export default class CardValue extends React.Component {
   constructor(props) {
       super(props)
       let data = this.props.name;
       this.state = { count: 0,
       allData: '', dp: null,
       name: '',
       verified: false,
       color: null,about:''}

     }


componentWillMount(){
    let { state } = this
        var user = 'users/' + this.props.name;
        firebase.storage().ref().child(`images/${user}`).getDownloadURL().then((url) => {
          if (url != null) {
            this.setState({
              dp: url,
            });
          }
          else {
    
          }
        }).catch(function (e) {
    
        })
        firebase.database().ref('users/').on('value', (data) => {
           
            user = this.props.name;
            var value = data.val();
            const name = value[user].name;
            this.setState({ name: name });
            this.setState({ about: value[user].about });
          })
          var user = 'users/' + this.props.name;
          user = user.replace(".", "_")
          firebase.database().ref(user).on('value', (data) => {
            var value = data.val();
            const status = value['Verification'].status;
            if (status == 'Not verified') {
              this.setState({ verified: false });
            } else if (status == 'Verified') {
              this.setState({ color: 'green' }),
                this.setState({ verified: true });
            }
          })
}
showData(email){
    const{navigate}= this.props.navigation;
    navigate('ProfileScreen')
}
render(){
   return (
    <View>
    <TouchableOpacity onPress={() => this.showData(this.props.name)}>
    <Card>
        <CardItem>
        <Left>
          {this.state.dp ? <Thumbnail
            source={{ uri: this.state.dp }}
          /> : <Thumbnail
              source={require('../../assets/unknown.png')}
            />}
         
          <Body style={{ justifyContent: 'space-between' }}>
            <Text style={{ borderBottomWidth: 2, borderBottomColor: this.state.verified === true ? 'green' : null }}>{this.state.name} {renderIf(this.state.verified,
              <Thumbnail style={style.thumbIcon} source={require('../../assets/verify.png')} />
            )}</Text>
            <Text note style={{ fontSize: 10 }}>{this.state.about}</Text>
          </Body>
        </Left>
        </CardItem>
    </Card>
    </TouchableOpacity>
    </View>
       );
   }
}

// Sample style sheet function
const styles = StyleSheet.create(
   {
   cardContainer:{
       borderRadius: 150,
       flexDirection: 'row',
       padding : 2,
       height: 60
   },
   cardstyles:{
       width:windowWidth.width,
       marginBottom: 20
   },
   imageAfterText:{
       padding: 10,
       fontWeight: 'bold',
       textAlign: 'left',
       fontWeight: '100',
       fontStyle:'italic'
   },
   questionStyle:{
       fontWeight: '600',
       fontSize: 18,
       marginBottom: 20
   },
   questionImageStyle:{
       alignItems:'flex-end'
   },
   likeOptionsStyle:{
       flexDirection:'row'
   },
   likeStatus:{
       flexDirection:'column'
   },
   buttonStyle:{
       width:10,
       borderRadius: 10,
       backgroundColor: 'red'
   },
   text: {
       borderWidth: 1,
       padding: 25,
       borderColor: 'black',
       backgroundColor: 'red'
    }

});


const style = {
    thumbIcon: {
      width: 40, height: 40,
      justifyContent: 'space-between'
    },
  
  }