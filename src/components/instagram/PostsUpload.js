import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { db, storage, firebase } from '../../firebase/firebaseConfig';

import Swal from 'sweetalert2';
import '../../assets/css/PostsUpload.css';
import { Input } from '@material-ui/core';

export const PostsUpload = () => {

    const [ image, setImage ] = useState( null );
    const [ caption, setCaption ] = useState('');
    const [ progress, setProgress ] = useState('');
    const { name } = useSelector( state => state.auth );

    const handleChange = ( e ) => {
        if ( e.target.files[ 0 ] ) {
            setImage( e.target.files[ 0 ] );
        };
    };

    const handleUpload = ( e ) => {
        e.preventDefault();

            const uploadTask = storage.ref( `images/${ image.name }` ).put( image );
            
            uploadTask.on(
        
                    "state_changed",
                    ( snapshot ) => {
                        const progress = Math.round( ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100 );
                        setProgress( progress );
                    },
                    ( error ) => Swal.fire( 'Error', error.message, 'error' ),
                    () => {
                        storage.ref( "images" ).child( image.name ).getDownloadURL().then( url => {
                            
                            db.collection( "posts" ).add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageUrl: url,
                                username: name
                                                });
        
                            setProgress( 0 );
                            setCaption( "" );
                            setImage( null );
        
                        });
        
                    }
        
                );
                

    };

    return (
        <div>
            <form className="postsUploads__addNewPost">
                <center>
                    <img className="postUploads__instaLogo" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram Logo" /> 
                </center>
                <div className="postsUploads">
                    <progress className="postsUploads__progress" value={ progress } max="100" />
                    <Input className="postsUploads__inputFile" type="file" onChange={ handleChange }/>
                    <Input className="postsUploads__input" type="text" placeholder="Enter a Caption" onChange={ e => setCaption( e.target.value ) } value={ caption } />
                    <button className="postsUploads__button" onClick={ handleUpload }>Upload</button>
                </div>
            </form>
        </div>
    );

};