import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import "./style.css";

class List extends Component {
  constructor() {
    super();
    this.state = {
      fetchedData: []
    };
  }

  getData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://reactAppBackend.kirilkuzmanovsk.repl.co/textData");
    xhr.send();
    xhr.onloadend = () => {
      this.setState({ fetchedData: JSON.parse(xhr.response) });
    };
  }

  componentDidMount() {
    if (localStorage.getItem("user")) {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://reactAppBackend.kirilkuzmanovsk.repl.co/textData"
      );
      xhr.send();
      xhr.onloadend = () => {
        this.setState({ fetchedData: JSON.parse(xhr.response) });
      };
    } else {
      window.location.href = "https://reactaplication.stackblitz.io/";
    }
  }

  redirectNew() {
    window.location.href = "https://reactaplication.stackblitz.io/new";
  }

  redirectMyPosts() {
    window.location.href = "https://reactaplication.stackblitz.io/myPosts";
  }

  logOut() {
    localStorage.clear()
    window.location.href = "https://reactaplication.stackblitz.io";
  }

  render() {
    return (
      <div>
        <nav className="navBar">
          <button className="btnNav" onClick={this.redirectNew}>New post</button>
          <button className='btnNav' onClick={this.redirectMyPosts}>My posts</button>
          <button className='btnLogOut' onClick={this.logOut}>Log out</button>
        </nav>
        {this.state.fetchedData.map((post, index) => {
          if(post.postPicturePath) {
            return (
              <div className='post'>
                <div class="media" key={index.toString()}>
                  <img class="mr-3"  src={post.postPicturePath}/>
                  <div class="media-body">
                  <h5 class="mt-0">{post.postTitle}</h5>
                    <p>{post.postContent}</p>
                  </div>
                </div>
              </div>
            )
          }
          else {
            return (
              <div className='post'>
                <div class="media" key={index.toString()}>
                  <div class="media-body">
                  <h5 class="mt-0">{post.postTitle}</h5>
                    <p>{post.postContent}</p>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
    );
  }
}

export default List;
