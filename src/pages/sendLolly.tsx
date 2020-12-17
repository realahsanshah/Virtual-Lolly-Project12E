import React, { useState } from 'react';
import Header from '../components/Header';
import Lolly from '../components/Lolly';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {  useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import { navigate } from 'gatsby';
import shortId from 'shortid';



const createLollyMutation=gql`
    mutation createLolly($recipient: String,$message: String,$sender:String,$top:String,$middle:String,$bottom:String){
        createLolly(recipient: $recipient,message: $message,sender:$sender,top:$top,middle:$middle,bottom:$bottom){
            message
            lollyPath
            sender
            recipient
        }
    }
`


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            padding: '8px 8px',
            width: '100%',
            fontSize: '14px',
        },
        input:{
            color:"white"
        },
        button: {
            color: "white",
            borderColor:"white"
        }
    }));

export interface SendLollyProps {

}

const SendLolly: React.SFC<SendLollyProps> = () => {

    const [top, setTop] = useState('#6b6bde');
    const [middle, setMiddle] = useState('#4ac383');
    const [bottom, setBottom] = useState('#d2ec27');

    const [createLolly]=useMutation(createLollyMutation)

    const classes = useStyles();

    const schema = Yup.object({
        recipient: Yup.string()
            .required("Recipiend is required")
            .min(3, "Must be minimum of 3 characters"),
        message: Yup.string()
            .required("Message is required")
            .min(10, "Must be minimum of 10 characters"),
        sender: Yup.string()
            .required("Sender is required")
            .min(3, "Must be minimum of 3 characters"),

    })

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
                <div className="colorContainer">
                    <label>
                        <input
                            type="color"
                            name="top"
                            value={top}
                            onChange={e => setTop(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="color"
                            name="middle"
                            value={middle}
                            onChange={e => setMiddle(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="color"
                            name="bottom"
                            value={bottom}
                            onChange={e => setBottom(e.target.value)}
                        />
                    </label>
                </div>
                <div className="formContainer">
                    <Formik
                        initialValues={{ recipient: "", message: "", sender: "" }}
                        validationSchema={schema}
                        onSubmit={(value, { resetForm }) => {
                            console.log("Recipient", value.recipient);
                            console.log("Message", value.message);
                            console.log("Sender", value.sender);
                            var id=shortId.generate();
                            createLolly({
                                variables:{
                                    recipient:value.recipient,
                                    message:value.message,
                                    sender:value.sender,
                                    top:top,
                                    middle:middle,
                                    bottom:bottom,
                                    lollyPath:id
                                }
                            }).then(result=>{
                                console.log(result)
                                // navigate(`/lolies/${id}`)
                            });
                            
                            setTop("#6b6bde")
                            setMiddle("#4ac383")
                            setBottom("#d2ec27")
                            resetForm();
                        }}
                    >
                        {(formik: any) => (
                            <Form onSubmit={formik.handleSubmit}>
                                <div>
                                    <Field
                                        type='recipient'
                                        as={TextField}
                                        variant="outlined"
                                        label="Recipient"
                                        name="recipient"
                                        id="recipient"
                                        className={classes.field}
                                        color="text.secondary"
                                        InputProps={{
                                            className:classes.input
                                          }}
                                    />
                                    <br />
                                    <ErrorMessage name='recipient' render={(msg: string) => (
                                        <span style={{ color: "white", fontSize: '18sp' }}>{msg}</span>
                                    )} />
                                    <br />
                                </div>
                                <div>
                                    <Field
                                        type='message'
                                        as={TextField}
                                        variant="outlined"
                                        label="Message"
                                        name="message"
                                        id="message"
                                        className={classes.field}
                                        InputProps={{
                                            className:classes.input
                                          }}
                                    />
                                    <br />
                                    <ErrorMessage name='message' render={(msg: string) => (
                                        <span style={{ color: "white", fontSize: '18sp' }}>{msg}</span>
                                    )} />
                                    <br />
                                </div>
                                <div>
                                    <Field
                                        type='sender'
                                        as={TextField}
                                        variant="outlined"
                                        label="Sender"
                                        name="sender"
                                        id="sender"
                                        className={classes.field}
                                        InputProps={{
                                            className:classes.input
                                          }}
                                    />
                                    <br />
                                    <ErrorMessage name='sender' render={(msg: string) => (
                                        <span style={{ color: "white", fontSize: '18sp' }}>{msg}</span>
                                    )} />
                                    <br />
                                </div>
                                <Button variant="outlined" className={classes.button} type="submit" >
                                    Create Lolly
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>

            </div>
        </div>
    );
}

export default SendLolly;