import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Posts } from './Posts';
import { PostsUpload } from './PostsUpload';
import { startLogout } from '../../actions/auth';
import { db } from '../../firebase/firebaseConfig';

import Modal from '@material-ui/core/Modal';
import '../../assets/css/InstagramScreen.css';
import '../../assets/vendor/animate/animate.css';
import { makeStyles } from '@material-ui/core/styles';

const getModalStyle = () => {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles( ( theme ) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export const InstagramScreen = () => {

    const classes = useStyles();
    const [ modalStyle ] = useState( getModalStyle );

    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );
    const [ posts, setPosts ] = useState( [] );
    const [ open, setOpen ] = useState( false );
    const handleLogout = () => dispatch( startLogout() );
    
    useEffect( () => {
        db.collection( 'posts' ).orderBy( 'timestamp', 'desc' ).onSnapshot( snapshot => {
            setPosts( snapshot.docs.map( doc => ( { 
                id: doc.id,
                post: doc.data()
            } ) ) );
        } )
    }, [] );
    
    return (
        <div className="instagramScreen animated fadeIn">
            <div className="instagramScreen__header">
                <img className="instagramScreen__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram Logo" />
                <p className="instagramScreen__WelcomeMessage">Welcome, { name }</p>
                <button className="instagramScreen__headerButton" onClick={ handleLogout }>Logout</button>
            </div>

            <div className="instagramScreen__posts">
                <div className="instagramScreen__postsLeft">
                {
                    posts.map( ( { id, post } ) => (
                        <Posts key={ id } postId={ id } username={ post.username } caption={ post.caption } imageUrl={ post.imageUrl } />
                        ))
                    }
                </div>
            </div>

            <Modal open={ open } onClose={ () => setOpen( false ) } aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <div style={ modalStyle } className={ classes.paper }>
                    <PostsUpload />
                </div>
            </Modal>

            <div className="instagramScreen__footer">
                <button className="instagramScreen__footerButton" onClick={ () => setOpen( true ) }>Add a new post</button>
            </div>
        </div>
    );

};
