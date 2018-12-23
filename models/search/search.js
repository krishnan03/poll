import React from 'react';
import { Text, View, ScrollView, Thumbnail, Image, ImageBackground, TextInput, StatusBar, Platform, Picker, TouchableHighlight,navigation} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CardView, Card, CardItem, Left, ThemeProvider } from 'react-native-elements';
import { Container, Content } from 'native-base';
import firebase from '../../firebase/firebase';
import SearchItems from './searchOutput';
import {StackNavigator} from 'react-navigation';
import ProfileScreen from '../profile/profile';


 class SearchScreen extends React.Component {
  static navigationOptions = {
    title: null,
    header:null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="search" size={20} color={tintColor} />
    )
  }
  constructor(props) {
    super(props);
    this.state = {
      checked: 0,
      check: false, PickerValue: '',value:'',
      queryOutput:[], data:'',loadValue:true
    }
  }
  componentWillMount() {
 

}

async componentDidMount() {
 
}
  fetchDataFromFirebase(value) {
    
    const{navigate}=this.props.navigation;

    if(this.state.PickerValue == 'profile'){
    var ref = firebase.database().ref("users/");
    ref.orderByChild("name").startAt(value).endAt(value+'\uf8ff').on("child_added", function (snapshot) {
      if(snapshot.key!=null){
     this.setState({
       queryOutput: this.state.queryOutput.concat(snapshot.key),
      })
    }}
    .bind(this));
  
  console.log(this.state.queryOutput);

let unique = [...new Set(this.state.queryOutput)];
 if(this.state.queryOutput[0]!=null){
  let category={
    output: unique
    };
   navigate('SeachOutput',category)
  this.setState({
    loadValue:true
  })}
}if(this.state.PickerValue == 'poll'){
  var ref = firebase.database().ref("users/");
    //ref=ref.child("Poll/");

    ref=ref.orderByChild("Poll").on("child_added", function (snapshot) {
    
      if(snapshot.val!=null){
        console.log(snapshot.val())
     this.setState({
       queryOutput: this.state.queryOutput.concat(snapshot.key),
      })
    }}
    .bind(this));
  
  console.log(this.state.queryOutput);

let unique = [...new Set(this.state.queryOutput)];
 if(this.state.queryOutput[0]!=null){
  let category={
    output: unique
    };
   navigate('SeachOutput',category)
  this.setState({
    loadValue:true
  })}
}
  }

  render() {
    const{navigate}=this.props.navigation;
    return (
      
      <Container style={style.container}>
        <Content>
          <View>
            <View style={style.containerStyle}>
              <TextInput
                placeholder="Search"
                style={style.searchTextStyle}
                onChangeText={(value) => this.setState({ value })} 
              />
              <Picker
                style={{ width: '5%' }}
                selectedValue={this.state.PickerValue}
                onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue })}
                mode={'dropdown'}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="Search in Poll" value="poll" />
                <Picker.Item label="Search in Label" value="label" />
                <Picker.Item label="Seach in Profile" value="profile" />
              </Picker>

              <Icon style={style.buttonStyle} name="search" size={20} onPress={() => this.fetchDataFromFirebase(this.state.value)}
              />
            </View>
            <View style={style.navBar}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                overScrollMode={"always"}
                contentContainerStyle={{
                  //alignItems: 'center',
                  paddingStart: 5,
                  paddingEnd: 5,

                }}
              >
                <View>
                  <Image
                    style={style.ImageScrollerStyle}
                    source={require('../../assets/animals.jpg')} />
                  <Text style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Animals</Text>
                </View>
                <View>
                  <Image
                    style={style.ImageScrollerStyle}
                    source={require('../../assets/art.jpg')} />
                  <Text style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Art</Text>
                </View>
                <View>
                  <Image
                    style={style.ImageScrollerStyle}
                    source={require('../../assets/comics.jpg')} />
                  <Text style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Comics</Text>
                </View>
                <View>
                  <Image
                    style={style.ImageScrollerStyle}
                    source={require('../../assets/dance.jpg')} />
                  <Text style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Dance</Text>
                </View>
                <View>
                  <Image
                    style={style.ImageScrollerStyle}
                    source={require('../../assets/fitness.jpg')} />
                  <Text style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Fitness</Text>
                </View>
                <View>
                  <Image
                    style={style.ImageScrollerStyle}
                    source={require('../../assets/food.jpg')} />
                  <Text style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Food</Text>
                </View>
                <View>
                  <Image
                    style={style.ImageScrollerStyle}
                    source={require('../../assets/humor.jpg')} />
                  <Text style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Humor</Text>
                </View>
                <View>
                  <Image
                    style={style.ImageScrollerStyle}
                    source={require('../../assets/Movie.jpg')} />
                  <Text style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>TV & Movie</Text>
                </View>
                <View>
                  <Image
                    style={style.ImageScrollerStyle}
                    source={require('../../assets/music.jpg')} />
                  <Text style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Music</Text>
                </View>
                <View>
                  <Image
                    style={style.ImageScrollerStyle}
                    source={require('../../assets/Politics.jpg')} />
                  <Text style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Politics</Text>
                </View>
                <View>
                  <Image
                    style={style.ImageScrollerStyle}
                    source={require('../../assets/science_tech.jpg')} />
                  <Text style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Science & Tech</Text>
                </View>
                <View>
                  <Image
                    style={style.ImageScrollerStyle}
                    source={require('../../assets/sports.jpg')} />
                  <Text style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Sports</Text>
                </View>


                <View>
                  <Image
                    style={style.ImageScrollerStyle}
                    source={require('../../assets/travel.jpeg')} />
                  <Text style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Travel</Text>
                </View>

              </ScrollView>
            </View>
          </View>
          

        </Content>
      </Container >
    );
  }
}

const NavigationSearch= StackNavigator({
  SearchMain:{screen: SearchScreen},
  SeachOutput:{screen: SearchItems},
  ShowProfile:{screen: ProfileScreen}
});

export default NavigationSearch;

const style = {
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  ImageScrollerStyle: {
    marginHorizontal: 5, borderColor: 'black', borderWidth: 2, width: 120, height: 80, borderRadius: 10
  },
  containerStyle: {

    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 10,
    marginLeft: 10,
    marginRight: 10
  },
  buttonStyle: {
    height: 30,
    marginBottom: 8
  },
  searchTextStyle: {
    flex: 1
  },
  navBar: {
    flex: 3,
    elevation: 3,
    padding: 5,
    backgroundColor: 'white',
  }
}
