import React, { Component } from 'react';
import Editor from 'react-medium-editor';
import InputStoryHeader from '../MainHeader/inputStoryHeader';
import { addStory, getUserDetails, getCategories } from '../../store/reducer';
import { authRef } from '../../utilities/firebase';
import { connect } from 'react-redux';
import FileUploader from 'react-firebase-file-uploader';
import { storageRef } from '../../utilities/firebase';
require("medium-editor/dist/css/medium-editor.css");
require("medium-editor/dist/css/themes/default.css");

class InputBodyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "",
      title: "",
      body: "",
      userImg: '',
      categories: [],
      username: "",
      avatar: "",
      isUploading: false,
      progress: 0,
      imageURL: ""
    };
    
  }

  componentDidMount() {
    this.props.getCategories();
    var user = authRef.currentUser;
    user.providerData.forEach(profile => {
      var userImg = profile.photoURL
      var username = profile.displayName
      var Id = authRef.currentUser.uid
      this.setState({
        userImg, username, Id
      })
    })
  }


  addCategory(str) {
    //console.log("cats", this.state.categories);
    let cats = this.state.categories;
    cats.push(str);
    this.setState({
      categories: cats
    });
  }

  removeCategory(str) {
    let cats = this.state.categories;
    let deleteIndex = cats.indexOf(str);
    console.log(deleteIndex);
    cats.splice(deleteIndex, 1);
    this.setState({
      categories: cats
    });
  }

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
      storageRef
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({
          imageURL: url
        });
      });
  };

  handleChanges = (text, medium) => {
    this.setState({ body: text });
  };

  handleChange = (text, medium) => {
    this.setState({ title: text });
  };

  render() { 
    let categoryReel = this.props.categories.map((item, i) => {
      if (this.state.categories.includes(item.name)) {
        return (
          <div
            className="cat-button-selected"
            key={item.name}
            onClick={() => {
              this.removeCategory(item.name);
            }}
          >
            {item.name.toUpperCase()}
          </div>
        );
      }
      return (
        <div
          className="cat-selector-button-div"
          key={item.name}
          onClick={() => this.addCategory(item.name)}
        >
          {item.name.toUpperCase()}
        </div>
      );
    });
    //console.log(this.state.username)
    return ( 
      <div>
        <InputStoryHeader
          name={this.state.username}
          avatar={this.state.userImg}
          img={this.state.imageURL}
          cats={this.state.categories}
          title={this.state.title}
          body={this.state.body}
          id={this.state.Id}
        />
        <div className="input-body-component-main-div">
          <div className="category-selector-body">
            <div className="categry-selector-sub-body">
              <div className="category-selector-header">
                <h3>Select Categories</h3>
              </div>
              <div className="category-selector-main-div">{categoryReel}</div>
            </div>
          </div>
          <div className="input-body-component-user-info">
            {this.state.userImg ? (
              <img className="user-image" alt="..." src={this.state.userImg} />
            ) : (
              false
            )}
            <div className="input-body-component-user-info-name">
              <p>Draft</p>
            </div>
            <form>
              {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
              <FileUploader
                accept="image/*"
                name="thumbnail"
                randomizeFilename
                storageRef={storageRef}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
            </form>
          </div>

          <Editor
            className="input-body-component-title"
            data-placeholder="Title"
            onChange={this.handleChange}
            options={{ toolbar: { buttons: [] } }}
          />
          <img src={this.state.avatarURL} alt="" />
          <Editor
            className="text-area-body-component-body"
            data-placeholder="Tell your story..."
            onChange={this.handleChanges}
            options={{
              toolbar: {
                buttons: [
                  "bold",
                  "italic",
                  "underline",
                  "anchor",
                  "h1",
                  "image",
                  "quote",
                  "removeFormat",
                  "unorderedlist"
                ]
              }
            }}
          />
        </div>
      </div>
     );
  }
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {
  addStory , getUserDetails, getCategories
})(InputBodyComponent);