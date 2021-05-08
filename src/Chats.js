import React ,{useState} from 'react'
import './Chats.css'
import {Avatar} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {db, auth} from './firebase'
import {useEffect} from'react'
import Chat from './chat.js'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {useHistory} from "react-router-dom";
import {useSelector} from 'react-redux';
import { selectUser } from './features/appSlice';
function Chats() {

    const [posts, setPosts ]= useState([]);
    const history= useHistory();
    const user= useSelector(selectUser)
    useEffect(() => {
       db.collection('posts').orderBy('timestamp','desc').onSnapshot((snapshot)=> 
          setPosts(
            snapshot.docs.map((doc)=>({
               id: doc.id,
               data : doc.data(),
            }))
          )
       );
    }, []);
    
    const takesnap=()=>{
        history.replace("/");
    };
    return (
        <div className='chats'>
            <div className='chats_header'>
                <Avatar src={user.profilePic} onClick={()=> auth.signOut()} className='chats_avatar'/>
                <SearchIcon className='chats_icon'/>
                <div className='chats_search'>
                    <p>Chat</p>
                </div>
                <div>
                <PersonAddIcon className='chats_icon'/>
                <ChatBubbleIcon className='chats_icon'/>
                </div>
            </div>
            <div className="chats_posts">
                {posts.map(({id, data:{ profilePic,username ,timestamp,imageUrl,read}})=>{
                    return(<Chat key={id} id={id} username={user.username} timestamp={timestamp} imageUrl={imageUrl} read={read} profilePic={user.profilePic}/*'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoGflzvuomBI_2yfxSahkfl73hmHMVWhxrPz7WhNlTBUlFTPzA4RYxCakxjXXufgAec4w&usqp=CAU'*//> )
                })}
                <Chat username='divyansh85' profilePic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnkyDITxQVPWVslw7ki8vqdHhIsrDuxSf8D4uBDLiJfJkkzZF8CLay8Z93zxx4gEjUeeQ&usqp=CAU' read='false' />
                <Chat username='vaishnavi_hon19' profilePic='https://hips.hearstapps.com/cosmouk.cdnds.net/15/13/980x982/gallery_nrm_1427281570-emoji-7.jpg?resize=480:*'/>
                <Chat username='lavi_vashishth' profilePic='https://i.pinimg.com/originals/5a/90/53/5a9053e149285b43f8dd58f842267f3c.png' read='false'/>
                <Chat username='riyasharma5816' profilePic='https://i.pinimg.com/originals/87/aa/fa/87aafa6fb56b282712c2de573e2f022a.png' read='false'/>
                <Chat username='kushmanot13' profilePic='https://ericsonn.com/resources/bitmoji.png' read='false'/>
                <Chat username='neha_s140' profilePic='https://wallpapercave.com/wp/wp4925049.jpg'  />
            </div>
            
            <RadioButtonUncheckedIcon className='chats_picicon' onClick={takesnap} fontSize="large"/>
            
        </div>
    )
}

export default Chats
