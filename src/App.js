import React, { Component } from 'react';
import Main from './components/MainComponent';  // App component is now rendering Main
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Main />
            </div>  // all the visual content is now in MainComponent
        );
    };
}

export default App;
