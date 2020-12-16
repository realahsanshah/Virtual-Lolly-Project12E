import React, { useState } from 'react';
import Header from '../components/Header';
import Lolly from '../components/Lolly';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            padding: '8px 8px',
            width: '100%',
            fontSize: '14px',
        },
        button: {
            color: "white"
        }
    }));

export interface SendLollyProps {

}

const SendLolly: React.SFC<SendLollyProps> = () => {

    const [top, setTop] = useState('#6b6bde');
    const [middle, setMiddle] = useState('#4ac383');
    const [bottom, setBottom] = useState('#d2ec27');
    const [recipient, setRecipient] = useState("");
    const [message, setMessage] = useState("");
    const [sender, setSender] = useState("");

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
                        initialValues={{ recipient: recipient, message: message, sender: sender }}
                        validationSchema={schema}
                        onSubmit={(value, { resetForm }) => {
                            console.log("Recipient", value.recipient);
                            console.log("Message", value.message);
                            console.log("Sender", value.sender);

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
                                    />
                                    <br />
                                    <ErrorMessage name='recipient' render={(msg: string) => (
                                        <span style={{ color: "red", fontSize: '18sp' }}>{msg}</span>
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
                                    />
                                    <br />
                                    <ErrorMessage name='message' render={(msg: string) => (
                                        <span style={{ color: "red", fontSize: '18sp' }}>{msg}</span>
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
                                    />
                                    <br />
                                    <ErrorMessage name='sender' render={(msg: string) => (
                                        <span style={{ color: "red", fontSize: '18sp' }}>{msg}</span>
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