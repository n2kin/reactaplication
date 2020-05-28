import React from "react";
import { Redirect } from 'react-router-dom'

class New extends React.Component {
  constructor() {
    super();
    this.state = {
      postTitle: "",
      postContent: "",
      postPicture: [],
      postPicturePreview: ""
    };
  }

  submitHanlerPostTitle(event) {
    event.preventDefault(), this.setState({ postTitle: event.target.value });
  }

  submitHanlerPostContent(event) {
    event.preventDefault(), this.setState({ postContent: event.target.value });
  }

  submitHandlerFilePick(picture) {
    picture.preventDefault();
    let reader = new FileReader();
    let file = picture.target.files[0];
    reader.onloadend = () => {
      this.setState({
        postPicture: file,
        postPicturePreview: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  sendPost(e) {
    e.preventDefault()
    var xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append("creator", localStorage.getItem('user'));
    formData.append("title", this.state.postTitle);
    formData.append("content", this.state.postContent);
    formData.append("image", this.state.postPicture);
    xhr.open("POST", "https://reactAppBackend.kirilkuzmanovsk.repl.co/post");
    xhr.send(formData);
    window.location.href = 'https://reactaplication.stackblitz.io/list'
  }

  render() {
    return (
      <div class="navBar">
        <div class="form-group">
          <input 
              class = "input"
              placeholder="enter post title"
              onChange={this.submitHanlerPostTitle.bind(this)}
          />
        </div>
        <div class="form-group">
          <textarea
            class = "input"
            placeholder="enter post content"
            onChange={this.submitHanlerPostContent.bind(this)}
          />
        </div>
        <div class="form-group">
          <input  type="file" onChange={this.submitHandlerFilePick.bind(this)} />
          <img src={this.state.postPicturePreview} />
        </div>
          
          <button class="btnNav" onClick={this.sendPost.bind(this)}>Add Post</button>
        
      </div>
    );
  }
}

export default New;
