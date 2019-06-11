import React, { Component } from 'react';
import './subcomponent.css';


class TopHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "TabHeading1"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.state.active) {
      document.getElementById(this.state.active).classList.remove("active");
    }
    this.setState({
        active: e.target.id
      },
      document.getElementById(e.target.id).classList.add("active")
    );
  
  
  }
  render() { 
    const tabReel = this.props.tabs.map((val, index) => {
      if (index === 0) {
        return (
          <div
            className={`tab-heading-tab active ${this.props.styles}`}
            id={`TabHeading${index + 1}`}
            onClick={e => this.handleClick(e)}
          >
            {val}
          </div>
        );
      }
      return (
        <div
          className={`tab-heading-tab ${this.props.styles}`}
          id={`TabHeading${index + 1}`}
          onClick={e => this.handleClick(e)}
        >
          {val}
        </div>
      );
    });
    return <div className="tab-heading-main-div">{tabReel}</div>;
  }
}
 
export default TopHeader;