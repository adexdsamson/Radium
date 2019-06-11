import React, { Component } from "react";
//import { connect } from "react-redux";
import { Menu, Dropdown } from "antd";
import "antd/dist/antd.css";
import { authRef, Userdatabase } from '../../../utilities/firebase';
import { getUserDetails, SignOut } from '../../../store/reducer';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";



class ImageIcon extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      photoURL: ''
    }
  }
  componentDidMount() {
    //this.props.getUserDetails();
    
    var user = authRef.currentUser;
    user.providerData.forEach(profile => {
      var photoURL = profile.photoURL
      this.setState({
        photoURL
      })
    })
    
  }
  

  render() {
    
    const menu = (
      <Menu>
        <Menu.Item key="0" className="nav-item-dropdown">
          <Link to="/new-story"> New Story </Link>
        </Menu.Item>

        <Menu.Item key="3" className="nav-item-dropdown">
          <Link to="/new-story"> Stats </Link>
        </Menu.Item>
        <hr style={{ opacity: 0.7 }} />
        <Menu.Item key="4" className="nav-item-dropdown">
          <Link to="/saved"> Bookmarks </Link>
        </Menu.Item>
        <Menu.Item key="5" className="nav-item-dropdown">
          <Link to="/topics"> Customize your interests </Link>
        </Menu.Item>
        <hr style={{ opacity: 0.7 }} />
        <Menu.Item key="6" className="nav-item-dropdown">
          <Link to={`/user/`}> Profile </Link>
        </Menu.Item>
        <Menu.Item key="7" className="nav-item-dropdown">
          <Link to="/new-story"> Help </Link>
        </Menu.Item>
        <Menu.Item key="8" className="nav-item-dropdown">
          <p
            onClick={() => SignOut()}
          >
            Sign Out
          </p>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomCenter">
          <img
            className="user-image"
            alt=".."
            src = {
              this.state.photoURL
            }
            style={{ cursor: "pointer" }}
          />
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  SignOut, getUserDetails
})(ImageIcon);