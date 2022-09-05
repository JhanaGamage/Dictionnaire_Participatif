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
            loggedin: false,
        }

        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    signIn = (mail, password) => {
        axios.post('http://localhost:3001/api/auth/signin', { mail, password })
        .then(res => { this.setState({token : res.data.token, loggedin: true}); })
        .catch(error => console.log(error));
    }

    signUp = (mail, password) => {   
        axios.post(
            'http://localhost:3001/api/auth/signup', 
            { mail, password }, 
            { headers: { 'Authorization': this.state.token },
        })
        .then(console.log('Inscrit'))
        .catch(error => console.log(error));
    }

    render() {        
        return (
            <div className="App">
                {this.state.loggedin &&
                    <Dashboard token={this.state.token}/>
                }

                {!this.state.loggedin &&
                    <SignIn signIn={this.signIn} signUp={this.signUp} />
                }
            </div>
        );
    }
}

export default App;