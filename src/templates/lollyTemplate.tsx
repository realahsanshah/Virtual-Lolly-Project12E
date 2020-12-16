import React, { useState } from 'react';
import Header from '../components/Header';
import Lolly from '../components/Lolly';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {  useMutation } from '@apollo/client';
import gql from 'graphql-tag'

export interface LollyTemplateProps {
    lollyPath:String
}
 
const LollyTemplate: React.SFC<LollyTemplateProps> = ({lollyPath}) => {
    const [top, setTop] = useState('#6b6bde');
    const [middle, setMiddle] = useState('#4ac383');
    const [bottom, setBottom] = useState('#d2ec27');
    const [sender,setSender]=useState('');
    const [recipient,setRecipient]=useState('');
    const [message,setMessage]=useState('');

    return ( 
        <div className="container">
            <Header />
            <div className="lollyContainer">
                <div>
                    <Lolly
                        fillTop={top}
                        fillMiddle={middle}
                        fillBottom={bottom}
                    />
                </div>
            </div>
            
          <div className="freezedLollyData">
            <div className="linkWrapper">
              <h4>Share this link with your frined</h4>
              <p>{`/lollies/${lollyPath}`}</p>
            </div>
            <div className="freezedLollyCard">
              <h1>to: {data?.getLollyByPath?.recipientName}</h1>
              <p>{data?.getLollyByPath?.message}</p>
              <h3>From: {data?.getLollyByPath?.sendersName}</h3>
            </div>
        </div>
     );
}
 
export default LollyTemplate;