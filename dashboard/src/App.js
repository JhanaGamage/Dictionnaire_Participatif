import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Dashboard from './dashboard';
import SignIn from './signIn';

class App extends React.Component {

    constructor(){
        super();

        this.state={
            token: '',
            uId: '',
            loggedin: false,
        }

        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    signIn = (mail, password) => {
        axios.post('http://217.160.48.167/api/auth/signin', { mail, password })
        .then(res => { 
            //console.log(res)
            this.setState({token : res.data.token, userId: res.data.userId, loggedin: true}); 
        })
        .catch(error => console.log(error));
    }

    signUp = (mail, password) => {   
        axios.post(
            'http://217.160.48.167/api/auth/signup', 
            { mail, password }, 
            { headers: { 'Authorization': this.state.token },
        })
        .then(console.log('Inscrit'))
        .catch(error => console.log(error));
    }

    render() {        
        return (
            <div className="App">
                {this.state.loggedin && <Dashboard token={this.state.token} userId={this.state.userId}/> }
                {!this.state.loggedin && <SignIn signIn={this.signIn} signUp={this.signUp} /> }
            </div>
        );
    }
}

export default App;