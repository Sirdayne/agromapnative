import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TextInput, Button, Alert, FlatList} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Hello World!',
      dataSource: []
    };
  }
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }
  componentDidMount(){
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataSource: responseJson })
      })
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text}
        </Text>
        <TextInput
          style={{height: 40, marginBottom: 20}}
          placeholder="Type here..."
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          onPress={this._onPressButton}
          title="Press"
        />
        <FlatList
          style={{marginTop: 20}}
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.body}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});
