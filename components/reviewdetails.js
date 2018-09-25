import React from 'react';
import { View, Alert, StyleSheet, Button } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import * as data from  '../containers/firebase';

export default class ReviewDetails extends React.Component {
  static navigationOptions = {
    title: 'Review Details',
  };

  constructor(props) {
    super(props);
    this.state = {
      post: {},
      text: '',
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const post = navigation.getParam('post', {});
    console.log(post);
    if (!post.review) post.review = {positive: true, text: ''};
    this.setState({post:post});
  }

  _saveReview = async () => {
    const post = this.state.post;
    data.db.ref('/posts/'+post.id).set(post);
    Alert.alert('Review saved!');
    this.props.navigation.goBack();
  }

  checkReview = () => {
    this.setState(prevState=>({post: {...prevState.post,review:{...prevState.post.review,positive:true}}}));
  }

  uncheckReview = () => {
    this.setState(prevState=>({post: {...prevState.post,review:{...prevState.post.review,positive:false}}}));
  }


  render(){    
    let reviewButton = this.state.post.review && this.state.post.review.positive ?
    <Button color='#42b97c' title="Positive Feedback. Click to change" onPress={this.uncheckReview}/> : 
    <Button color='red' title="Negative Feedback. Click to change" onPress={this.checkReview}/>;
    let reviewValue = this.state.post && this.state.post.review && this.state.post.review.text ?
      this.state.post.review.text : this.state.text;
    return (
      <View style={styles.container}>
        <FormLabel>Review</FormLabel>
        <FormInput value={reviewValue} 
          onChangeText={(text)=> this.setState(prevState=>({post: {...prevState.post,review:{...prevState.post.review,text:text}}}))}/>
        {reviewButton}
        <Button color='#42b97c' title="Save Review" onPress={this._saveReview}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9f1e4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});