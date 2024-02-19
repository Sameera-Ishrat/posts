import "./Card.css";
import React from "react";

const Card = ({ children, className }) => {
  const classes = className ? `card ${className}` : 'card';


  return <div className={classes}>{children}</div>;
};

export default Card;
