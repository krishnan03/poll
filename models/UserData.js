import React, { Component, Keyboard } from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { StyleSheet, Text, View, BackHandler, Modal, Dimensions, Platform, Picker, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from '../firebase/firebase';
import input from '../components/input';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


export default class UserData extends React.Component {

  static navigationOptions = {
    title: 'My Details',
  };
  constructor(props) {
    super(props)
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.state =
      ({
        date: '',
        PickerValue: '',
        PickerValue1: '',
        name: '',
        country: '',
        about:'',
        PickerValue2: '',
        userData:''
      })

  }
  
  componentWillMount(){
    


  }
  clickme = () => {
    var data = this.state.PickerValue;
    if (data == "") {
      alert("Please Select a Option");
    } else {
      alert(data);
    }
  }
  userDetails(name, dob, gender, employment,country,about,relationship) {
    const { navigate } = this.props.navigation;
    var user = 'users/' + (firebase.auth().currentUser.email);
    user = user.replace(/\./g, "_")
    if (name != null) {
      firebase.database().ref(user).update(
        {
          name: name,
          dob: dob,
          gender: gender,
          employment: employment,
          country: country,
          about:about,
          userData: true,
          relationship:relationship
        }
      ).then(() => {
      }).catch((error) => {
        alert(error);
      });
      navigate('HomeScreen')
    }
    else {
      alert('Please fill mandatory fields');
    }
  }

  render() {
    let paramfromCategoryScreen = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Item>
          <Input
            label='Name'
            autoCapitalize="none"
            placeholder="Name"
            onChangeText={(name) => this.setState({ name })}
          />
        </Item>
        
        <Item>
          <Text style={{ alignSelf: 'flex-start' }}>Date of Birth:</Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="1950-05-01"
            maxDate="2010-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => { this.setState({ date: date }) }}
          /></Item>
        <Picker
          style={{ width: '80%' }}
          selectedValue={this.state.PickerValue}
          onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue })}
        >
          <Picker.Item label="Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        <Picker
          style={{ width: '80%' }}
          selectedValue={this.state.PickerValue}
          onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue2: itemValue })}
        >
          <Picker.Item label="Relationship" value="" />
          <Picker.Item label="Single" value="Single" />
          <Picker.Item label="InRelation" value="InRelation" />
          <Picker.Item label="Married" value="Married" />
        </Picker>
        <Picker
          style={{ width: '80%' }}
          selectedValue={this.state.PickerValue1}
          onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue1: itemValue })}
        >
          <Picker.Item label="Employment" value="" />
          <Picker.Item label="Government Employee" value="Government Employee" />
          <Picker.Item label="Private Employee" value="Private Employee" />
          <Picker.Item label="Other" value="Other" />
        </Picker>

        <Item>
        <Picker
          style={{ width: '80%' }}
          selectedValue={this.state.country}
          onValueChange={(itemValue, itemIndex) => this.setState({ country: itemValue })}
        >
          <Picker.Item label="Country" value="" />
          <Picker.Item label="Afghanistan"  value="Afghanistan" />
<Picker.Item label="Albania"  value="Albania" />
<Picker.Item label="Algeria"  value="Algeria" />
<Picker.Item label="Andorra"  value="Andorra" />
<Picker.Item label="Angola"  value="Angola" />
<Picker.Item label="Anguilla"  value="Anguilla" />
<Picker.Item label="Antigua & Barbuda"  value="Antigua & Barbuda" />
<Picker.Item label="Argentina"  value="Argentina" />
<Picker.Item label="Armenia"  value="Armenia" />
<Picker.Item label="Australia"  value="Australia" />
<Picker.Item label="Austria"  value="Austria" />
<Picker.Item label="Azerbaijan"  value="Azerbaijan" />
<Picker.Item label="Bahamas"  value="Bahamas" />
<Picker.Item label="Bahrain"  value="Bahrain" />
<Picker.Item label="Bangladesh"  value="Bangladesh" />
<Picker.Item label="Barbados"  value="Barbados" />
<Picker.Item label="Belarus"  value="Belarus" />
<Picker.Item label="Belgium"  value="Belgium" />
<Picker.Item label="Belize"  value="Belize" />
<Picker.Item label="Benin"  value="Benin" />
<Picker.Item label="Bermuda"  value="Bermuda" />
<Picker.Item label="Bhutan"  value="Bhutan" />
<Picker.Item label="Bolivia"  value="Bolivia" />
<Picker.Item label="Bosnia & Herzegovina"  value="Bosnia & Herzegovina" />
<Picker.Item label="Botswana"  value="Botswana" />
<Picker.Item label="Brazil"  value="Brazil" />
<Picker.Item label="Brunei Darussalam"  value="Brunei Darussalam" />
<Picker.Item label="Bulgaria"  value="Bulgaria" />
<Picker.Item label="Burkina Faso"  value="Burkina Faso" />
<Picker.Item label="Burundi"  value="Burundi" />
<Picker.Item label="Cambodia"  value="Cambodia" />
<Picker.Item label="Cameroon"  value="Cameroon" />
<Picker.Item label="Canada"  value="Canada" />
<Picker.Item label="Cape Verde"  value="Cape Verde" />
<Picker.Item label="Cayman Islands"  value="Cayman Islands" />
<Picker.Item label="Central African Republic"  value="Central African Republic" />
<Picker.Item label="Chad"  value="Chad" />
<Picker.Item label="Chile"  value="Chile" />
<Picker.Item label="China"  value="China" />
<Picker.Item label="China - Hong Kong / Macau"  value="China - Hong Kong / Macau" />
<Picker.Item label="Colombia"  value="Colombia" />
<Picker.Item label="Comoros"  value="Comoros" />
<Picker.Item label="Congo"  value="Congo" />
<Picker.Item label="Congo, Democratic Republic of (DRC)"  value="Congo, Democratic Republic of (DRC)" />
<Picker.Item label="Costa Rica"  value="Costa Rica" />
<Picker.Item label="Croatia"  value="Croatia" />
<Picker.Item label="Cuba"  value="Cuba" />
<Picker.Item label="Cyprus"  value="Cyprus" />
<Picker.Item label="Czech Republic"  value="Czech Republic" />
<Picker.Item label="Denmark"  value="Denmark" />
<Picker.Item label="Djibouti"  value="Djibouti" />
<Picker.Item label="Dominica"  value="Dominica" />
<Picker.Item label="Dominican Republic"  value="Dominican Republic" />
<Picker.Item label="Ecuador"  value="Ecuador" />
<Picker.Item label="Egypt"  value="Egypt" />
<Picker.Item label="El Salvador"  value="El Salvador" />
<Picker.Item label="Equatorial Guinea"  value="Equatorial Guinea" />
<Picker.Item label="Eritrea"  value="Eritrea" />
<Picker.Item label="Estonia"  value="Estonia" />
<Picker.Item label="Ethiopia"  value="Ethiopia" />
<Picker.Item label="Fiji"  value="Fiji" />
<Picker.Item label="Finland"  value="Finland" />
<Picker.Item label="France"  value="France" />
<Picker.Item label="French Guiana"  value="French Guiana" />
<Picker.Item label="Gabon"  value="Gabon" />
<Picker.Item label="Gambia"  value="Gambia" />
<Picker.Item label="Georgia"  value="Georgia" />
<Picker.Item label="Germany"  value="Germany" />
<Picker.Item label="Ghana"  value="Ghana" />
<Picker.Item label="Great Britain"  value="Great Britain" />
<Picker.Item label="Greece"  value="Greece" />
<Picker.Item label="Grenada"  value="Grenada" />
<Picker.Item label="Guadeloupe"  value="Guadeloupe" />
<Picker.Item label="Guatemala"  value="Guatemala" />
<Picker.Item label="Guinea"  value="Guinea" />
<Picker.Item label="Guinea-Bissau"  value="Guinea-Bissau" />
<Picker.Item label="Guyana"  value="Guyana" />
<Picker.Item label="Haiti"  value="Haiti" />
<Picker.Item label="Honduras"  value="Honduras" />
<Picker.Item label="Hungary"  value="Hungary" />
<Picker.Item label="Iceland"  value="Iceland" />
<Picker.Item label="India"  value="India" />
<Picker.Item label="Indonesia"  value="Indonesia" />
<Picker.Item label="Iran"  value="Iran" />
<Picker.Item label="Iraq"  value="Iraq" />
<Picker.Item label="Israel and the Occupied Territories"  value="Israel and the Occupied Territories" />
<Picker.Item label="Italy"  value="Italy" />
<Picker.Item label="Ivory Coast (Cote d'Ivoire)"  value="Ivory Coast (Cote d'Ivoire)" />
<Picker.Item label="Jamaica"  value="Jamaica" />
<Picker.Item label="Japan"  value="Japan" />
<Picker.Item label="Jordan"  value="Jordan" />
<Picker.Item label="Kazakhstan"  value="Kazakhstan" />
<Picker.Item label="Kenya"  value="Kenya" />
<Picker.Item label="Korea, Democratic Republic of (North Korea)"  value="Korea, Democratic Republic of (North Korea)" />
<Picker.Item label="Korea, Republic of (South Korea)"  value="Korea, Republic of (South Korea)" />
<Picker.Item label="Kosovo"  value="Kosovo" />
<Picker.Item label="Kuwait"  value="Kuwait" />
<Picker.Item label="Kyrgyz Republic (Kyrgyzstan)"  value="Kyrgyz Republic (Kyrgyzstan)" />
<Picker.Item label="Laos"  value="Laos" />
<Picker.Item label="Latvia"  value="Latvia" />
<Picker.Item label="Lebanon"  value="Lebanon" />
<Picker.Item label="Lesotho"  value="Lesotho" />
<Picker.Item label="Liberia"  value="Liberia" />
<Picker.Item label="Libya"  value="Libya" />
<Picker.Item label="Liechtenstein"  value="Liechtenstein" />
<Picker.Item label="Lithuania"  value="Lithuania" />
<Picker.Item label="Luxembourg"  value="Luxembourg" />
<Picker.Item label="Macedonia, Republic of"  value="Macedonia, Republic of" />
<Picker.Item label="Madagascar"  value="Madagascar" />
<Picker.Item label="Malawi"  value="Malawi" />
<Picker.Item label="Malaysia"  value="Malaysia" />
<Picker.Item label="Maldives"  value="Maldives" />
<Picker.Item label="Mali"  value="Mali" />
<Picker.Item label="Malta"  value="Malta" />
<Picker.Item label="Martinique"  value="Martinique" />
<Picker.Item label="Mauritania"  value="Mauritania" />
<Picker.Item label="Mauritius"  value="Mauritius" />
<Picker.Item label="Mayotte"  value="Mayotte" />
<Picker.Item label="Mexico"  value="Mexico" />
<Picker.Item label="Moldova, Republic of"  value="Moldova, Republic of" />
<Picker.Item label="Monaco"  value="Monaco" />
<Picker.Item label="Mongolia"  value="Mongolia" />
<Picker.Item label="Montenegro"  value="Montenegro" />
<Picker.Item label="Montserrat"  value="Montserrat" />
<Picker.Item label="Morocco"  value="Morocco" />
<Picker.Item label="Mozambique"  value="Mozambique" />
<Picker.Item label="Myanmar/Burma"  value="Myanmar/Burma" />
<Picker.Item label="Namibia"  value="Namibia" />
<Picker.Item label="Nepal"  value="Nepal" />
<Picker.Item label="New Zealand"  value="New Zealand" />
<Picker.Item label="Nicaragua"  value="Nicaragua" />
<Picker.Item label="Niger"  value="Niger" />
<Picker.Item label="Nigeria"  value="Nigeria" />
<Picker.Item label="Norway"  value="Norway" />
<Picker.Item label="Oman"  value="Oman" />
<Picker.Item label="Pacific Islands"  value="Pacific Islands" />
<Picker.Item label="Pakistan"  value="Pakistan" />
<Picker.Item label="Panama"  value="Panama" />
<Picker.Item label="Papua New Guinea"  value="Papua New Guinea" />
<Picker.Item label="Paraguay"  value="Paraguay" />
<Picker.Item label="Peru"  value="Peru" />
<Picker.Item label="Philippines"  value="Philippines" />
<Picker.Item label="Poland"  value="Poland" />
<Picker.Item label="Portugal"  value="Portugal" />
<Picker.Item label="Puerto Rico"  value="Puerto Rico" />
<Picker.Item label="Qatar"  value="Qatar" />
<Picker.Item label="Reunion"  value="Reunion" />
<Picker.Item label="Romania"  value="Romania" />
<Picker.Item label="Russian Federation"  value="Russian Federation" />
<Picker.Item label="Rwanda"  value="Rwanda" />
<Picker.Item label="Saint Kitts and Nevis"  value="Saint Kitts and Nevis" />
<Picker.Item label="Saint Lucia"  value="Saint Lucia" />
<Picker.Item label="Saint Vincent and the Grenadines"  value="Saint Vincent and the Grenadines" />
<Picker.Item label="Samoa"  value="Samoa" />
<Picker.Item label="Sao Tome and Principe"  value="Sao Tome and Principe" />
<Picker.Item label="Saudi Arabia"  value="Saudi Arabia" />
<Picker.Item label="Senegal"  value="Senegal" />
<Picker.Item label="Serbia"  value="Serbia" />
<Picker.Item label="Seychelles"  value="Seychelles" />
<Picker.Item label="Sierra Leone"  value="Sierra Leone" />
<Picker.Item label="Singapore"  value="Singapore" />
<Picker.Item label="Slovak Republic (Slovakia)"  value="Slovak Republic (Slovakia)" />
<Picker.Item label="Slovenia"  value="Slovenia" />
<Picker.Item label="Solomon Islands"  value="Solomon Islands" />
<Picker.Item label="Somalia"  value="Somalia" />
<Picker.Item label="South Africa"  value="South Africa" />
<Picker.Item label="South Sudan"  value="South Sudan" />
<Picker.Item label="Spain"  value="Spain" />
<Picker.Item label="Sri Lanka"  value="Sri Lanka" />
<Picker.Item label="Sudan"  value="Sudan" />
<Picker.Item label="Suriname"  value="Suriname" />
<Picker.Item label="Swaziland"  value="Swaziland" />
<Picker.Item label="Sweden"  value="Sweden" />
<Picker.Item label="Switzerland"  value="Switzerland" />
<Picker.Item label="Syria"  value="Syria" />
<Picker.Item label="Tajikistan"  value="Tajikistan" />
<Picker.Item label="Tanzania"  value="Tanzania" />
<Picker.Item label="Thailand"  value="Thailand" />
<Picker.Item label="Netherlands"  value="Netherlands" />
<Picker.Item label="Timor Leste"  value="Timor Leste" />
<Picker.Item label="Togo"  value="Togo" />
<Picker.Item label="Trinidad & Tobago"  value="Trinidad & Tobago" />
<Picker.Item label="Tunisia"  value="Tunisia" />
<Picker.Item label="Turkey"  value="Turkey" />
<Picker.Item label="Turkmenistan"  value="Turkmenistan" />
<Picker.Item label="Turks & Caicos Islands"  value="Turks & Caicos Islands" />
<Picker.Item label="Uganda"  value="Uganda" />
<Picker.Item label="Ukraine"  value="Ukraine" />
<Picker.Item label="United Arab Emirates"  value="United Arab Emirates" />
<Picker.Item label="United States of America (USA)"  value="United States of America (USA)" />
<Picker.Item label="Uruguay"  value="Uruguay" />
<Picker.Item label="Uzbekistan"  value="Uzbekistan" />
<Picker.Item label="Venezuela"  value="Venezuela" />
<Picker.Item label="Vietnam"  value="Vietnam" />
<Picker.Item label="Virgin Islands (UK)"  value="Virgin Islands (UK)" />
<Picker.Item label="Virgin Islands (US)"  value="Virgin Islands (US)" />
<Picker.Item label="Yemen"  value="Yemen" />
<Picker.Item label="Zambia"  value="Zambia" />
<Picker.Item label="Zimbabwe"  value="Zimbabwe" />
        </Picker>
         </Item>

        <Button style={{ marginTop: 10, width: 80, justifyContent: 'center', alignSelf: 'center' }}
          rounded
          primary
          center
          onPress={() => this.userDetails(this.state.name, this.state.date, this.state.PickerValue, this.state.PickerValue1,this.state.country,this.state.about,this.state.PickerValue2)}>
          <Text>Save</Text>
        </Button>
      </View>


    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});