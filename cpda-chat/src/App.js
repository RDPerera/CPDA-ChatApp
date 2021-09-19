import logo from "./sliitlogo.png";
import chatlogo from "./pngegg.png";
import "./App.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import axios from "axios";

function App() {
  useEffect(() => {
    addResponseMessage("Welcome to **CPDA Bot** test!");
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    //send message to the server
    const response = await axios.post("http://127.0.0.1:5000/hello", {
      message: "hi",
    });

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
          <Widget
            handleNewUserMessage={handleNewUserMessage}
            profileAvatar={chatlogo}
            title="CPDA Chat"
            subtitle="Cancer Patient Distress Assistant Chat Application"
          />
        </div>
      </div>
    </>
  );
}

export default App;
