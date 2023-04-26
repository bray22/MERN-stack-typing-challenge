import React, { Component } from "react";
import axios from 'axios';

import style from '../css/challenge.css';
import UserService from "../services/UserServices";
import SubmissionServices from "../services/SubmissionServices";
import Clock from "../utils/Clock";


class Challenge extends Component {
    constructor(props){ 
        super(props) 

        this.timeInterval = new Function;
            
        // Set initial state 
        this.state = {
            level : 1,
            challenge_text: "",
            challenge_id: "",
            challenge_entry: "",
            clock: 0,
            mins: 0,
            secs: 0,
            totalSecs: 0,
            wordlength: 0,
            disableTextArea: true,
            users: [],
            correctwords: 0,
            accuracy: 0,
            userId: '644407495e26676bd7e524aa',
            submitted: false
        } 
      } 

  componentDidMount() {
    const getRandomChallenge = async () => {
        const data = await SubmissionServices.getRandomChallenge(this.state.level);
        const getUsers = async () => {
          const users = await UserService.getUsers();

          return users;
        };

        const users = await getUsers();
    
        this.setState( {
          challenge_text: data.challenge_text,
          wordlength: data.wordlength,
          challenge_id: data._id,
          users: users
        });
    };
   
    getRandomChallenge();
  }

  setTime() {
     if (this.state.clock == 59) {
         this.setState({
             mins: this.state.mins+1
         });
     }

     this.setState({
         clock: this.state.clock < 59 ? this.state.clock+1 : 0,
         totalSecs: this.state.totalSecs+1
     });
  }


  componentDidCatch(error, info) {
    console.log(`Error log from componentDidCatch: ${error}`);
    console.log(info);
  }

  updateChallengeEntry(event) {
    this.setState({
       challenge_entry: event.target.value
    });
  }

  updateLevel(event) {
    this.setState( {
        level: event.target.value
    });

    const getRandomChallenge = async () => {
      const data = await SubmissionServices.getRandomChallenge(event.target.value);
      
      this.setState( {
          challenge_text: data.challenge_text,
          challenge_id: data._id
      });
    };
   
    getRandomChallenge();
  }

  saveSubmisson(state) {
    const changeTextArray = state.challenge_text.split(" ");
    const changeEntryArray = state.challenge_entry.split(" ");
    const correctwords = changeTextArray.filter(item => changeEntryArray.includes(item)).length;
    console.log(correctwords);
    console.log(state.wordlength);
    const accuracy = Math.round(( correctwords / state.wordlength) * 100);

    this.setState( {
      accuracy: accuracy,
      correctwords: correctwords,
      secs: state.totalSecs
    });

    this.resetClock();
  
    const params = {
      challengeId: state.challenge_id,
      seconds: state.totalSecs,
      accuracy: accuracy,
      words: correctwords,
      userId: state.userId
    }
   
    const saveSubmission = SubmissionServices.postSubmission(params);

      this.setState({
        submitted: true,
      });
  }

  startClock() {
    this.setState({
       disableTextArea: false,
       submitted: false
    });
    this.timeInterval = setInterval(()=>this.setTime(), 1000);
  }

  resetClock() {
    
    clearInterval(this.timeInterval);
   
      this.setState({
          mins: 0,
          totalSecs: 0,
          clock: 0,
          challenge_entry: "",
          disableTextArea: true,
          submitted: false
      });
  };

  updateUser(event) {
    this.setState({
      userId: event.target.value
    });
  }

  pauseClock() {
    clearInterval(this.timeInterval);
    this.setState({
        disableTextArea: true
     });
  };

  render() {

    return(
        <>
        <section>
            <div id="new-challenge-header">
            <div>User:</div>
               <div>
                 <select onChange={this.updateUser.bind(this)} name="cars" id="cars" >
                    { this.state.users.map((user, i) => (
                      <option key={i} value={user._id}>{user.fullname}</option>   
                    )) }
                  </select>
               </div>
              
               <div>Difficulty:</div>
               <div>
                 <select onChange={this.updateLevel.bind(this)} name="cars" id="cars" value={this.state.level}>
                    <option value="1">Easy</option>
                    <option value="2">Medium</option>
                    <option value="3">Hard</option>
                  </select>
               </div>
               <div className="start-button" >
                    <button className="btn btn-success mb-2" onClick={this.startClock.bind(this)}>Start</button>
               </div>
            </div>

            <div id="new-challenge">
                <div className="challenge-text">
                    {this.state.challenge_text}
                </div>
                <div className="challenge-solution">
                    {this.state.disableTextArea ? 
                      ( <textarea id="challenge_text" value={this.state.challenge_entry} disabled></textarea>) :
                      ( <textarea id="challenge_text" onChange={this.updateChallengeEntry.bind(this)} 
                      value={this.state.challenge_entry}></textarea>)}
                </div>
            </div>

            <div id="new-challenge-footer">
               <div className="clock">
                <Clock mins = {this.state.mins} clock={this.state.clock} />
               </div>
               <div className="submit-button">
                  <button onClick={this.resetClock.bind(this)} className="btn btn-secondary mb-2" >Reset</button>
                  <button className="btn btn btn-warning mb-2" onClick={this.pauseClock.bind(this)}>Pause</button>
                  {this.state.challenge_entry ? 
                    ( <button onClick={()=>this.saveSubmisson(this.state)} className="btn btn-primary mb-2">Submit Challenge</button>) :
                    ( <button disabled className="btn btn-secondary mb-2">Submit Challenge</button>)
                  }
               </div>
            </div>

            <div id="new-challenge-results" className={this.state.submitted ? "submitted": ""}>
                <div><b>Results</b></div>
                <div>Correct Words: {this.state.correctwords}</div>
                <div>Time: {this.state.secs}s</div>
                <div>Accuracy: {this.state.accuracy}%</div>
            </div>
        </section>
        </>
    );
  }
}

export default Challenge;