import React from 'react';
import './App.css';
import axios from 'axios';

//const axios = require('axios');


const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card userN={props.user} key={profile.id} {...profile} />)}
  </div>
);


class Form extends React.Component{

  constructor(props){
    super(props);
    this.state= {
                userName : '',
               };
    this.handleSubmit=async (event) => {
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
        <input type="text" placeholder="GitHub User"
         value={this.state.userName} 
         onChange={ event => this.setState({userName : event.target.value})} 
         required
         />
        <button className="butn"  style={{color : 'blue'}}>Add</button>
      </form>
    )
  }
}

class Card extends React.Component{
    render(){
      const profile=this.props;
      const userVal= this.props;
      console.log(userVal.userN);
      //const url=`${userVal.userN}`;
      
      return(
        <div className="github-profile">
          <img src={profile.avatar_url} alt="photo"/>
          <div className="info">
            <div className="name">{profile.name}</div>
            <div>{profile.company}</div>
            <div>Bio : {profile.bio}</div>
            <div>Followers : {profile.followers}</div>
            <div>Following : {profile.following}</div>
            <div><a href={`https://github.com/${userVal.userN}`} className="link">Go to GitHub Repo </a></div>

          </div>

        </div>
      )
    }
}


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
