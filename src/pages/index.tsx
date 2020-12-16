import * as React from "react"
import Header from "../components/Header"
import Lolly from '../components/Lolly'
import {navigate} from 'gatsby';


const IndexPage = () => {
  return (
    <div>
      <title>Virtual Lolly</title>
      <Header/>
      <div className='lolly-list'>
      <Lolly
          fillTop="#6b6bde"
          fillMiddle="#4ac383"
          fillBottom="#d2ec27"
        />
        <Lolly
          fillTop="#b71616"
          fillMiddle="#bf10f1"
          fillBottom="#10adf1"
        />
        <Lolly
          fillTop="#ffc107"
          fillMiddle="#00a97e"
          fillBottom="#ec398f"
        />
      </div>
      <div className='btn-wrapper'>
        <button className='' onClick={() => navigate('/sendLolly')}>Send a Lolly to your friend</button>
      </div>
    </div>
  )
}

export default IndexPage
