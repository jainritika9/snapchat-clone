import React, { useEffect } from 'react';
import './App.css'
import WebcamCapture from './WebcamCapture.js'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Preview from './Preview.js'
import Chats from './Chats.js'
import ChatView from './ChatView.js'
import { login,logout, selectUser } from './features/appSlice';
import {useSelector} from 'react-redux';
import Login from './Login.js';
import { useDispatch } from 'react-redux';
import {auth} from './firebase';
function App() {
  const user=useSelector(selectUser);
  const dispatch=useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
       if(authUser){
         dispatch(login({
           username:authUser.displayName,
           profilePic:authUser.photoURL,
           id:authUser.uid,
         }))
       }else{
         dispatch(logout())
       }
    })
  },[])
  return (
    <div className="App">
      <Router>  
      {!user ?(<Login/>):
      (
        <div>
          <img className='app_logo' src='https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg' alt=''/> 
      <div className='app_body'>
        <div className='app_bodybackground'>
        <Switch>
          <Route path="/preview">
             <Preview/>
          </Route>
          <Route path="/chats/view">
             <ChatView/>
          </Route>
          <Route path="/chats">
             <Chats/>
          </Route>
          <Route exact path="/">
             <WebcamCapture/>
          </Route>
        </Switch>
        </div>
      </div>
      </div>
      )}
    </Router>
     
    </div>
  );
}

export default App;
