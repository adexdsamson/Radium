import React, { Component } from 'react';
import swal from 'sweetalert';
import Logo from '../../assets/logo.svg';
import { APP_REGISTER } from '../../Routes/route';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addStory } from '../../store/reducer';
import { Posts, auth } from '../../utilities/firebase';
import ImageIcon from '../MainHeader/ImageIcon';
import { Menu } from 'antd';
import "antd/dist/antd.css";
import PropTypes from 'prop-types';

class InputStoryHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    this.props.addStory();
  }

  addCategory(str) {
    let cats = this.state.categories;
    cats.push(str);
    this.setState({
      categories: cats
    });
  }
  static contextTypes = {
    router: PropTypes.object
  };


  addPost(name, avatar, img, categories, title, body, id) {
    //console.log(name)
    let cats = categories.join(",");
    let post = {
      name,
      avatar,
      img,
      categories: cats,
      title,
      body,
      id,
    };
    var uid = auth.currentUser.uid;
    console.log(post)
    Posts(post, uid)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  render() { 
    let categoryReel = this.props.categories.map((item, i) => {
      return (
        <p
          className="topic-nav-link"
          key ={item.name}
          onClick={() => this.addCategory(item.name)}
        >
          {item.name.toUpperCase()}
        </p>
      );
    });
    //console.log(categoryReel);

    const menu = (
      <Menu>
        <Menu.Item className="nav-item-dropdown" key="0">
          Publish
        </Menu.Item>
      </Menu>
    );

    let loggedin = this.props.auth ? (
      <div>
        <p
          className = "sign-in-btn dl mr-2"
          onClick={() => {
            if (this.props.title && this.props.body) {
              if (this.props.cats.length > 0) {
                if (this.props.img) {
                  this.addPost(
                    this.props.name,
                    this.props.avatar,
                    this.props.img,
                    this.props.cats,
                    this.props.title,
                    this.props.body,
                    this.props.id
                  );
                } else {
                  //If no image given, use default and finish post
                  this.addPost(
                    this.props.name,
                    this.props.avatar,
                    "https://mocra.org/wp-content/uploads/2016/07/default.jpg",
                    this.props.cats,
                    this.props.title,
                    this.props.body,
                    this.props.id
                  );
                }
              } else {
                swal({ text: "Select Atleast One Category" });
              }
            } else {
              swal({
                text: "Add content to title and body before publishing"
              });
            }
          }}
        >
          Publish
        </p>
        <div className="dl">
          <ImageIcon />
        </div>
      </div>
      
    ) : (
      <a href={APP_REGISTER}>
        <button className="sign-in-btn">Sign In</button>
      </a>
    );
    return ( 
      <div>
        <div className="input-story-header-component-main-div">
          <div className="input-story-header-logo-left-div">
            <Link to="/">
              <img src={Logo} alt="..." className="logo-small" />
            </Link>
          </div>
          <div className="story-header-right-side-div">
            {/*<Dropdown
                overlay={menu}
                trigger={["click"]}
                placement="bottomCenter"
              >
                <p style={{ cursor: "pointer" }}>Publish</p>
              </Dropdown>*/}

            {loggedin}
          </div>
        </div>

        {/*<div className="topic-header-bar-main-div">
          <div className="topic-header-bar">
            <div id="topic-header-grid" className="topic-header-grid">
              {categoryReel}
            </div>
          </div>
            </div>*/}
      </div>
    );
  }
}
 
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    addStory
  })(InputStoryHeader)
);
