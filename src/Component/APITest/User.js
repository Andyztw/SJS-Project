import React, { Component, Fragment } from "react";
import axios from 'axios';

class User extends Component {

  constructor(props) {
    super(props);

    //if(!localStorage.getItem('jwtToken')){
    //this.loadData();
    //console.log("load data function called")
    //}
    //this.testDash();
    this.testPostRunAll();
    //this.testPostAddAPI()
  }



 testPostRunAll(){
   let url = "https://www.nzbeta.com/";

  fetch(url+'api/v1/apis/runall', {
    method: 'POST',
    headers: {
            //"Content-Type": "application/json; charset=utf-8",
             "Content-Type": "application/x-www-form-urlencoded",
             //Accept : 'application/json',
             //'Content-Type': 'application/json'
        },
   //body: JSON.stringify({"username": "test", "password": "test"}),
   body: "token="+localStorage.getItem('jwtToken'),
 }).then(function(response) {
   return response.json();
 }).then(function(data) {
    console.log("In run all")
     console.log(data)

 });
 }

 testPostAddAPI(){

     let url = "https://www.nzbeta.com/";

    let bod =  {
       "token": localStorage.getItem('jwtToken'),
       "protocol":"http",
       "domain":"httpbin.com",
    "method":"GET",
    "path":"get",
    "requests":{"header":{},
    "params":{"a":"1", "b":"2"}},
  };
  console.log(JSON.stringify(bod))

  console.log("posting to add api")
   //  fetch(url+'api/v1/apis/add_api', {
   //    method: 'POST',
   //    headers: {
   //            "Content-Type": "application/json; charset=utf-8",
   //             //"Content-Type": "application/x-www-form-urlencoded",
   //             'Accept' : 'application/json',
   //             //'Content-Type': 'application/json'
   //        },
   //   //body: JSON.stringify({"username": "test", "password": "test"}),
   //   body: JSON.stringify({"json":bod}) ,
   // }).then(function(response) {
   //   return response.json();
   // }).then(function(data) {
   //
   //     console.log(data)
   //
   // });



   axios.post(url+'api/v1/apis/add_api', bod)
  .then(function (response) {
    console.log("in axios")
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 }

 testDash(){
   let url = "https://www.nzbeta.com/";

  fetch(url+'api/v1/dashboard', {
    method: 'POST',
    headers: {
            //"Content-Type": "application/json; charset=utf-8",
             "Content-Type": "application/x-www-form-urlencoded",
             //Accept : 'application/json',
             //'Content-Type': 'application/json'
        },
   //body: JSON.stringify({"username": "test", "password": "test"}),
   body: "token="+localStorage.getItem('jwtToken'),
 }).then(function(response) {
   return response.json();
 }).then(function(data) {
   console.log("in testDash")
     console.log(data.data)

 });

 }


  render() {
    return (
      <div>
        <h1> fetching test:{localStorage.getItem('jwtToken')} </h1>
      </div>
    );
  }
}

export default User;
