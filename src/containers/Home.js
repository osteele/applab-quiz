import React from 'react';
import {compose} from 'redux';
import {Typography, withStyles} from "@material-ui/core";
import {QuizList} from "../components/Quizzes";
import {connect} from "react-redux";
import {firebaseConnect, getVal} from "react-redux-firebase";

const styles = theme => ({});

const Home = props => {
    const {user} = props;

    return (
        <main>
            <Typography component="h2" variant="h4" gutterBottom>Activities</Typography>
            <QuizList user={user} type="activity" view="grid"/>
        </main>
    );
};

export default compose(
    firebaseConnect(props => {
        const uid = props.firebase.auth().currentUser.uid;

        return [{
            path: `users/${uid}`
        }]
    }),

    connect(
        ({firebase}) => ({
            uid: firebase.auth.uid,
            user: getVal(firebase.data, `users/${firebase.auth.uid}`)
        })
    ),

    withStyles(styles)
)(Home);
