import React, { Component } from "react";

class myPosts extends Component {
  constructor() {
    super();
    this.state = {
      fetchedData: []
    };
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      var xhr = new XMLHttpRequest();
      let formData = new FormData();
      formData.append("creator", localStorage.getItem('user'));
      xhr.open("POST", "https://reactAppBackend.kirilkuzmanovsk.repl.co/myPosts");
      xhr.send(formData);
      xhr.onloadend = () => {
        this.setState({ fetchedData: JSON.parse(xhr.response) });
      };
    }
    else {
      window.location.href = 'https://reactaplication.stackblitz.io'
    }
  }

  deletePost(e) {
    console.log(e.target.id)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "https://reactAppBackend.kirilkuzmanovsk.repl.co/delete/" + e.target.id)
    xhr.send()
  }

  render() {
    return (
      <div>
        <nav className="navBar">
        <button className="btnNav" onClick={this.redirectNew}>New post</button>
        <button className="btnNav" onClick={this.redirectMyPosts}>My posts</button>
        </nav>
        {this.state.fetchedData.map((post, index) => {
          return (
            <div>
              <div className='post'>
                <div class="media" key={index.toString()}>
                  <img class="mr-3"  src={post.postPicturePath}/>
                  <div class="media-body">
                  <h5 class="mt-0">{post.postTitle}</h5>
                    <p>{post.postContent}</p>
                  </div>
                  <button className="btnNav">
                <a href={post._id}>edit</a>
              </button>
              <button className="btnNav" id={post._id} onClick={this.deletePost.bind(this)}>
                Delete Post
              </button>
                </div>
              </div>
              
            </div>
          );
        })}
      </div>
    );
  }
}

export default myPosts;