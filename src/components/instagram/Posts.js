import firebase from 'firebase';
import '../../assets/css/Posts.css';
import { Input } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { useSelector } from 'react-redux';

export const Posts = ( { postId, username, caption, imageUrl } ) => {
    
    const [ comment, setComment ] = useState( '' );
    const [ comments, setComments ] = useState( [] );
    const { name } = useSelector( state => state.auth );


    useEffect( () => {
        
        let unsubscribe;        

        if ( postId ) {
            unsubscribe = db.collection( 'posts' ).doc( postId ).collection( 'comments' ).orderBy( 'timestamp', 'desc' )
            .onSnapshot( ( snapshot ) => setComments( snapshot.docs.map( ( doc ) => doc.data()  ) ) );
        };

        return () => {
            unsubscribe();
        };

    }, [ postId ] );

    const postComment = ( e ) => {
        e.preventDefault();

        db.collection( 'posts' ).doc( postId ).collection( 'comments' ).add({
            text: comment,
            username: name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment( '' );
    };

    return (
        <div className="posts" >
            <div className="posts__header" >
                <Avatar className="posts__avatar" src="" alt="Juan Villa" />
                <h3>{ username }</h3>
            </div>
            <img className="posts__image" src={ imageUrl } alt="Post Image" />
            <h4 className="posts__caption" ><strong>{ username }</strong> { caption }</h4>
            <div className="posts__comments">
                { comments.map( ( comment ) => <p><strong>{ comment.username }</strong> { comment.text }</p>) }
            </div>
            <form className="posts__commentBox">
                <Input className="posts__input" type="text" placeholder="Add a Comment" value={ comment } onChange={ ( e ) => setComment( e.target.value ) } />
                <Button className="posts__button" type="submit" disabled={ !comment } onClick={ postComment }>Post</Button>
            </form>
        </div>
    );

};