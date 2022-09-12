// Trick to use 'react' from node_modules by node ReactComponents
// And to use 'react' from window by browser ReactComponents
// global.React = React;
// global.ReactDOM = ReactDom;
import React from "react";
import ReactDom from "react-dom";

global.React = React;
global.ReactDOM = ReactDom;
