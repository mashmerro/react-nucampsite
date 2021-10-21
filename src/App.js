import React, { Component } from 'react';       // Downloaded library
import Main from './components/MainComponent';  // App component is now rendering Main
import { BrowserRouter } from 'react-router-dom';   // Downloaded library
import { Provider } from 'react-redux';             // Downloaded library
import { ConfigureStore } from './redux/configureStore';    // js we made
import './App.css';

const store = ConfigureStore(); // ConfigureStore returns store

class App extends Component {
    render() {
        return (        // <Provider> makes redux store available to all connective components that are children of App
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Main />
                    </div>  
                </BrowserRouter>
            </Provider>
        );
    };
}

export default App;
