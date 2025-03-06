import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <h2>Hello, welcome to the home page!</h2>
      <Link to="/add-thread">Go to Add Thread</Link> 
      
    </div>
  );
}
