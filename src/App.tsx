import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Menu from './Menu';
import Routing from './Routing';
import { AlertOutlet, AlertProvider } from 'react-bootstrap-hooks-alert'
import 'react-bootstrap-hooks-alert/dist/Alert.css'
import { claim } from './Auth/auth.models';
import { getClaims } from './Auth/handleJWT';
import AuthenticationContext from './Auth/AuthenticationContext';
import eventContext from './Contexts/EventContexts';
import { retrieveItem } from './Utils/LocalStorage';
import configureInterceptor from './Utils/HttpInterceptors';

configureInterceptor();

function App() {

    const [claims, setClaims] = useState<claim[]>([]);
    const [eventCode, setEventCode] = useState(retrieveItem('eventCode'));

    useEffect(() => {
        setClaims(getClaims())
    }, [])

    return (
        <BrowserRouter>
        <AlertProvider timeouts={{ warning: 2000, success: 1000, danger: 3000 }}>
        <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
        <eventContext.Provider value={{ eventCode, updateEvent: setEventCode }}>
        <Menu />
        <div className="container">
            <AlertOutlet />
            <Routing />
        </div>
        <footer className="bd-footer py-5 mt-5 bg-light">
            <div className="container RRBlue">
                RRScout {new Date().getFullYear().toString()}
            </div>
        </footer>
        </eventContext.Provider>
        </AuthenticationContext.Provider>
         </AlertProvider>
        </BrowserRouter>
    )
}

export default App;
