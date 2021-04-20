import React from 'react';
import './App.css';
import axios from 'axios';

//const axios = require('axios');

/* CardList is function component holds List of retrieved users
* <Card /> component holds info of a queried user and input value accepted from a user */

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card userN={props.user} key={profile.id} {...profile} />)}
  </div>
);

/* Form is Class Component to Capture input from User and Retrieve User profile 
* with the help of Ajax calls (async and await calls) */


class Form extends React.Component{

  constructor(props){
    //Holds State of Form Component i.e Data 
    super(props);
    this.state= {
                userName : '',
               };
    this.handleSubmit=async (event) => {
      // Prevents refreshing page at every time user inputs
      event.preventDefault();
      const resp= await 
      axios.get(`https://api.github.com/users/${this.state.userName}`);
      this.props.onSubmit(resp.data);
      this.props.onChange(this.state.userName);
      this.setState({userName : ''});
    };
  }


  render(){

    return(
      <form onSubmit={this.handleSubmit} className="form"  >
        <input type="text" placeholder="Please enter a valid username"
         value={this.state.userName} className="input"
         onChange={ event => this.setState({userName : event.target.value})} 
         required
         />
        <button className="butn" >Search</button>
      </form>
    )
  }
}

//Card class component to hold Profile Details of a user

class Card extends React.Component{
    render(){
      const profile=this.props;
      const userVal= this.props;
      //console.log(userVal.userN);
      //const url=`${userVal.userN}`;
      
      return(
        <div className="github-profile">
          
          <div className="info">
            <div><img src={profile.avatar_url} className="image" alt="photo"/></div>
            <div className="name">{profile.name}</div>
            <div>{profile.company}</div>
            <div>Bio : {profile.bio}</div>
            <div>Followers : {profile.followers}</div>
            <div>Following : {profile.following}</div>
            <div>Public repos : {profile.public_repos}</div>
            <div>Public Gists : {profile.public_gists}</div>
            <div className="link"><a href={`${profile.html_url}`} target='_blank' className="url"> Go to Repository</a></div>

          </div>

        </div>
      )
    }
}

// App class component. It is a parent Component to all other components defined

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      profiles : [],
      userName : '',
    };

    this.onInputChange = value => {
      this.setState({
        userName: value
      });
      console.log("I am Parent component. I got", value, "from my child.");
    };
    this.addNewProfile=(profileData) =>{
      this.setState(prevState =>({
        
         profiles : [...prevState.profiles,profileData],
      }));
     
  };
}

  render(){
    console.log(this.state.userName);
  return (
    <div className="header">
         <h1> GitHub User</h1>
       <Form
        onSubmit={this.addNewProfile}
        onChange={this.onInputChange}
        />
       <CardList user={this.state.userName} profiles={this.state.profiles}/>
    </div>
  );
}
}

export default App;
