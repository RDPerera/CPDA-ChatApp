import logo from "./sliitlogo.png";
import chatlogo from "./pngegg.png";
import "./App.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";



function App() {



  const common_questions = {
    "greetings":["hi there! ", "hello there!", "hello" , "hi"],
    "goodbye":["bye! ", "see you!", "bye", "goodbye"],
    "aksingAge" : ["how old are you?", "your age?", "age?","age?"],
    "aksingName" : ["what is your name?", "your name?", "name?","introduce yourself","what's your name","Who are you?"],
    "howareyou":["how are you?", "how are you doing?"],
  }
  const common_answers = {
    "greetings":["Hi there! ", "Hello there!", "Hello" , "Hi"],
    "fullfill":["how are you?", "how are you doing?"],
    "goodbye":["bye! ", "see you!", "bye", "goodbye"],
    "aksingAge" : ["I was built in September of 2021"],
    "aksingName" : ["My name is CPDA","I'm CPDA"],
    "howareyou":["I'm fine, thanks for asking"],
  }
  const isInArray = (value, array) => {
    return array.indexOf(value) > -1;
  }
  const pickRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  }
  Number.prototype.round = function(places) {
    return +(Math.round(this + "e+" + places)  + "e-" + places);
  }
  useEffect(() => {
    addResponseMessage("Welcome to **CPDA Bot** test!");
  }, []);
  const [results, setResults] = React.useState([]);
  const handleNewUserMessage = async (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    let isCommonQuestion = false;
    //answering common questions
    for (let key in common_questions) {
      if (isInArray(newMessage.toLowerCase(), common_questions[key])) {
        isCommonQuestion = true;
        addResponseMessage(pickRandom(common_answers[key]));
        if (key === "greetings") {
          addResponseMessage(pickRandom(common_answers["fullfill"]));
        }
        setResults([]);
      }
    }
    if (!isCommonQuestion) {
      //do a request to the server
      const response = await axios.get("http://127.0.0.1:5000/reply", {
        params: {
          message: newMessage
          }
        });
      //add the response to the chat
      addResponseMessage(response.data.responce);
      setResults(response.data.details);
    }
  };
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <span className="main-title">CPDA Chat</span>
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
      <div className="wrapper">
        <div className="header">
          <h2>Welcome to the CPDA Bot Test Application</h2>
        </div>
        <div className="intro">
          <p>
            This is a testing application for classification model of the{" "}
            <b>Cancer Patient Distress Assistant</b>.
          </p>
        </div>
        <div className="content">
          <div className="accuracy-container">
            <div className="accuracy-block">
          {results.map((result, index) => (
          <span className="set"><h5>{result.emotion}</h5><ProgressBar completed={parseFloat(result.score*100).round(2)} bgColor={"#" + (Math.random() * 16777215 | 0).toString(16)} /></span>
          ))}
          </div>
          <Widget
            handleNewUserMessage={handleNewUserMessage}
            profileAvatar={chatlogo}
            title="CPDA Chat"
            subtitle="Cancer Patient Distress Assistant Chat Application"
          />
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
