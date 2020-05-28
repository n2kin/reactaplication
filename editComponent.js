import React from "react";
import update from "immutability-helper";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singlePost: [],
      editPostTitle: "",
      editPostContent: "",
      editPostPicture: [],
      editPostPicturePreview: ""
    };
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      var id = window.location.href.split("/")[3];
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://reactAppBackend.kirilkuzmanovsk.repl.co/edit/" + id
      );
      xhr.send();
      xhr.onloadend = () => {
        this.setState({ singlePost: JSON.parse(xhr.responseText) });
      };
    }
    else {
      window.location.href = 'https://reactaplication.stackblitz.io'
    }
  }

  submitHanlerPostTitle(event) {
    event.preventDefault(),
      this.setState({ editPostTitle: event.target.value });
    console.log(this.state.editPostTitle);
  }

  submitHanlerPostContent(event) {
    event.preventDefault(),
      this.setState({ editPostContent: event.target.value });
    console.log(this.state.editPostContent);
  }

  deleteImage(e) {
    var id = window.location.href.split("/")[3];
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://reactAppBackend.kirilkuzmanovsk.repl.co/deletePicture/" + id);
    xhr.send()
    this.setState({
      singlePost: update(this.state.singlePost, {
        0: { postPicturePath: { $set: null } }
      })
    });
  }

  submitHandlerFilePick(picture) {
    picture.preventDefault();
    let reader = new FileReader();
    let file = picture.target.files[0];
    reader.onloadend = () => {
      this.setState({
        editPostPicture: file,
        editPostPicturePreview: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  updatePost() {
    var id = window.location.href.split("/")[3];
    console.log(id)
    var xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append("updatedTitle", this.state.editPostTitle);
    formData.append("updatedContent", this.state.editPostContent);
    formData.append("image", this.state.editPostPicture);
    xhr.open("POST", "https://reactAppBackend.kirilkuzmanovsk.repl.co/update/" + id);
    xhr.send(formData);
    window.location.href = 'https://reactaplication.stackblitz.io/list'
  }

  render() {
    return (
      <div>
        {this.state.singlePost.map(post => {
          return (
            <div class="navBar">
            <div class="form-group">
              <input
                placeholder={post.postTitle}
                onChange={this.submitHanlerPostTitle.bind(this)}
              /></div>
              <div class="form-group">
              <textarea
                placeholder={post.postContent}
                onChange={this.submitHanlerPostContent.bind(this)}
              />
              </div>
            
              <div class="form-group">
                <img src={post.postPicturePath} />
                <img src={this.state.editPostPicturePreview} />
                <button onClick={this.deleteImage.bind(this)}>
                  delete picture
                </button>
              </div>
              <input
                type="file"
                onChange={this.submitHandlerFilePick.bind(this)}
              />
              <button onClick={this.updatePost.bind(this)}>update post</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Edit;
