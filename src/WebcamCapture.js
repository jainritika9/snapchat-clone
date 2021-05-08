import React,{useCallback, useRef} from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";
import { useHistory } from "react-router";
import './WebcamCapture.css';
import MoodIcon from '@material-ui/icons/Mood';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import {Avatar} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import LoopRoundedIcon from '@material-ui/icons/LoopRounded';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {useSelector} from 'react-redux';
import { selectUser } from './features/appSlice';
const videoConstraints={
    width:250,
    height:400,
    facingMode:"user",
};

function WebcamCapture(){
    const webcamRef=useRef(null);
    const dispatch=useDispatch();
    const history =useHistory();
    const capture= useCallback(()=>{
        const imageSrc=webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        history.push('./preview')
    },[webcamRef])
    const user=useSelector(selectUser)
    return(
        <div className='webcamcapture'>
            <Webcam
              audio={false}
              height=
              {videoConstraints.height}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              width={videoConstraints.width}
              videoConstraints={videoConstraints}
            />
            <Avatar
             src={user.profilePic} className='chats_avat'/>
             <SearchIcon className='chat_icon'/>
             <PersonAddIcon className='chat_icon2'/>
             <LoopRoundedIcon className='chat_icon3'/>
            <div className='cam-set'>
            <PhotoLibraryIcon id='side'/>
            <RadioButtonUncheckedIcon className='webcam_capture' onClick={capture} id='cam'/>
            <MoodIcon id='side'/>
            </div>
            
        </div>
    );
}

export default WebcamCapture;