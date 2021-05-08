import React,{useEffect} from 'react'
import { useHistory } from 'react-router';
import './ChatView.css'
import { selectSelectedImage } from './features/appSlice';
import {useSelector} from 'react-redux';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
function ChatView() {
    const selectedImage =useSelector(selectSelectedImage);
    const history=useHistory();
    console.log(selectedImage);
    useEffect(()=>{
        if(!selectedImage){
            exit();
        }
    },[selectedImage])

    const exit=()=>{
        history.replace("/chats");
    }
    return (
        <div className='chatView'>
            <img src={selectedImage} onClick={exit} alt=''/>
            <div className='chatView_timer'>
                <CountdownCircleTimer
                 isPlaying
                 duration={10}
                 strokeWidth={4}
                 size={40}
                 colors={[
                     ["#004777" ,0.33],
                     ["#F7B801",0.33],
                     ["#A30000",0.33],
                 ]}>
                     {({remainingTime})=>{
                         if(remainingTime==0){
                             exit();
                         }
                         return remainingTime;
                     }}
                </CountdownCircleTimer>
            </div>
        </div>
    );
}

export default ChatView;
