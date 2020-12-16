import * as React from "react"
import Header from "../components/Header"
import Lolly from '../components/Lolly'


const IndexPage = () => {
  return (
    <div>
      <title>Virtual Lolly</title>
      <Header/>
      <div>
        <Lolly fillTop="#deaa43" fillBottom="#d52358" fillMiddle="#e95946"/>
      </div>
    </div>
  )
}

export default IndexPage
