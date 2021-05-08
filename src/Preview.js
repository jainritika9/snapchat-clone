import React ,{useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import './Preview.css'
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import GetAppIcon from '@material-ui/icons/GetApp';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { v4 as uuid} from 'uuid';
import {db, Storage} from './firebase'
import firebase from 'firebase'
function Preview() {

    const cameraImage= useSelector(selectCameraImage);
    const history= useHistory();
    const dispatch =useDispatch();

    useEffect(() => {
        if(!cameraImage){
          history.replace('/');
        }
    }, [cameraImage,history]);

    const closePreview=() =>{
        dispatch(resetCameraImage());
        history.replace('/');
    };

    const sendPost=()=>{
       const id= uuid();
       const uploadTask = Storage
       .ref(`posts/${id}`)
       .putString(cameraImage, "data_url");

       uploadTask.on(
           firebase.storage.TaskEvent.STATE_CHANGED,
           null,
           (error)=>{
               console.log(error)
            },
            ()=>{
           Storage
           .ref('posts')
           .child(id)
           .getDownloadURL()
           .then((url)=>{
               db.collection('posts').add({
                   imageUrl: url,
                   username: "jain_ritika9",
                   read: false,
                   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
               });
               history.replace('/chats');
           });
         }
       );
    };
    return (
        <div className='preview'>
            <CloseIcon className='pre-close' onClick={closePreview}/>
            <div className='pre-tools'>
                <TextFieldsIcon/>
                <CreateIcon/>
                <NoteIcon/>
                <CropIcon/>
                <MusicNoteIcon/>
                <AttachFileIcon/>
                <TimerIcon/>
            </div>
            <img src={cameraImage} alt=''/>
            <div className='pre-options'>
                <div className='pre-ap'>
                <GetAppIcon id='ico'/>
                <AddPhotoAlternateIcon id='ico'/>
                </div>

                <div onClick={sendPost} className='pre-footer'>
                 <h2>Send Now </h2>
                 <SendIcon fontSize='small'  className="pre-send"/>
                </div>
            </div>
        </div>
    )
}

export default Preview
