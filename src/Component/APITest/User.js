import React, { Component, Fragment } from "react";
import axios from 'axios';

const url = "https://www.nzbeta.com/";

class User extends Component {

  constructor(props) {
    super(props);

    //if(!localStorage.getItem('jwtToken')){
    this.loadData();
    //console.log("load data function called")
    //}
    this.testDash();
    this.testPostRunAll();
    this.testPostAddAPI()
  }



  testPostRunAll() {
    console.log("In run all")
    let mybody = "token=" + localStorage.getItem('jwtToken')
    axios.post(url + 'api/v1/apis/run_all', mybody)
      .then(function (response) {
        console.log("in axios")
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    //   fetch(url+'api/v1/apis/runall', {
    //     method: 'POST',
    //     headers: {
    //             //"Content-Type": "application/json; charset=utf-8",
    //              "Content-Type": "application/x-www-form-urlencoded",
    //              //Accept : 'application/json',
    //              //'Content-Type': 'application/json'
    //         },
    //    //body: JSON.stringify({"username": "test", "password": "test"}),
    //    body: "token="+localStorage.getItem('jwtToken'),
    //  }).then(function(response) {
    //   console.log("In run all - response area")
    //    return response.json()
    //  }).then(function(data) {
    //   console.log("In run all- after json format")
    //      console.log(data)

    //  });
  }

  loadData() {
    fetch(url + 'api/v1/users/signin', {
      method: 'POST',
      headers: {
        //"Content-Type": "application/json; charset=utf-8",
        //"Content-Type": "application/x-www-form-urlencoded",
        //Accept : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "username": "test", "password": "test" }),
      //body: "username="+this.state.userName+"&password="+this.state.Pword,
    }).then(function (response) {
      console.log(response)
      return response.json();
    }).then(function (JsonRes) {
      console.log(JsonRes)
      localStorage.setItem('jwtToken', JsonRes.token)
    })
  }

  testPostAddAPI() {

    let bod = {
      "token": localStorage.getItem('jwtToken'),
      "protocol": "http",
      "domain": "httpbin.org",
      "method": "GET",
      "path": "get",
      "requests": {
        "params": { "a": "1", "b": "2" }
      }
    };
    console.log(JSON.stringify(bod))

    console.log("posting to add api")
    fetch(url + 'api/v1/apis/add_api', {
      method: 'POST',
      headers: {
        //"Content-Type": "application/json; charset=utf-8",
        //"Content-Type": "application/x-www-form-urlencoded",
        //'Accept' : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bod),
      //body: JSON.stringify({"json":bod}) ,
    }).then(function (response) {
      console.log(response)
      return response.json();
    }).then(function (data) {

      console.log(data)

    });



    axios.post(url + 'api/v1/apis/add_api', bod)
      .then(function (response) {
        console.log("in axios")
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  testDash() {

    //   fetch(url+'api/v1/dashboard', {
    //     method: 'POST',
    //     headers: {
    //             //"Content-Type": "application/json; charset=utf-8",
    //              //"Content-Type": "application/x-www-form-urlencoded",
    //              "Accept" : 'application/json',
    //              'Content-Type': 'application/json'
    //         },
    //    //body: JSON.stringify({"username": "test", "password": "test"}),
    //    body: {"token": localStorage.getItem('jwtToken')},
    //  }).then(function(response) {
    //    return response.json();
    //  }).then(function(data) {
    //    console.log("in testDash")
    //      console.log(data.data)

    //  });

    let bod = { "token": localStorage.getItem('jwtToken') };
    console.log(bod)
    axios.post(url + 'api/v1/dashboard', bod)
      .then(function (response) {
        console.log("in axios testsdash")
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
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
