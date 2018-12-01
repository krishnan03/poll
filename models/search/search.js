import React from 'react';
import { Text, View, ScrollView, Thumbnail, Image, ImageBackground, TextInput, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CardView, Card, CardItem, Left } from 'react-native-elements';
import { Container, Content } from 'native-base';


export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="search" size={20} color={tintColor} />
    )
  }
  render() {
    return (
      <Container style={style.container}>
        <Content>
          <View>
            <View style={style.containerStyle}>
              <TextInput
                placeholder="Search"
                style={style.searchTextStyle}
              />
              <Icon style={style.buttonStyle} name="search" size={20}
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

