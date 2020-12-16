import React, { useState } from 'react';
import Header from '../components/Header';
import Lolly from '../components/Lolly';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag'


const query = gql`
    query lollyByPath($lollyPath:String){
        lollyByPath(lollyPath:$lollyPath){
            top
            bottom
            middle
            message
            lollyPath
            recipient
            sender
        }
    }
`

const LollyTemplate = ({pageContext}) => {
    const [top, setTop] = useState('#6b6bde');
    const [middle, setMiddle] = useState('#4ac383');
    const [bottom, setBottom] = useState('#d2ec27');
    const [sender, setSender] = useState('');
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');

    console.log("lollypath",pageContext.lollyPath)
    const {data,loading,error}=useQuery(query,{
        variables:{lollyPath:pageContext.lollyPath}
    })
    if (error) {
        console.log("error",error);
        return <h4>error</h4>
      }
    return (
        <div className="container">
            <Header />
            {loading?<CircularProgress/>:
<div>
            <div className="lollyContainer">
                <div>
                    <Lolly
                        fillTop={data?.lollyByPath?.top}
                        fillMiddle={data?.lollyByPath?.middle}
                        fillBottom={data?.lollyByPath?.bottom}
                    />
                </div>
            </div>

            <div className="freezedLollyData">
                <div className="linkWrapper">
                    <h4>Share this link with your frined</h4>
                    <p>{`/lollies/${data?.lollyByPath?.lollyPath}`}</p>
                </div>
                <div className="freezedLollyCard">
                    <h1>to: {data?.lollyByPath?.recipient}</h1>
                    <p>{data?.lollyByPath?.message}</p>
                    <h3>From: {data?.lollyByPath?.sender}</h3>
                </div>
            </div>
            </div>}
            </div>
     );
}
 
export default LollyTemplate;