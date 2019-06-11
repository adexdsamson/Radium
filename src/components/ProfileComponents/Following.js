import React from "react";
import { Link, withRouter } from "react-router-dom";
import PopOver from "../subcomponent/popOver";
import { connect } from "react-redux";

function Following(props) {
  let followingOrNot = "Following";
  function unfollow(id) {
    if (followingOrNot === "Following") {
      //axios
        //.delete(`/api/unfollow/${id}`)
        //.then(resposne => {
        //  console.log(resposne);
       // })
       // .catch(() => []);
      followingOrNot = "Follow";
    }
  }
  return (
    <div className="profile-tab" style={{ width: "80%" }}>
      <h2>{`${props.profile.firstname} ${props.profile.lastname} folllows`}</h2>
      {props.following.length > 0 ? (
        props.following.map((item, i) => {
          return (
            <div
              key={i}
              className="profile-story-icon"
              style={{
                border: "solid #efefef 1px",
                textAlign: "center",
                marginBottom: "20px"
              }}
            >
              <img
                src={item.avatar}
                alt="user avatar"
                className="user-image"
                style={{
                  width: "60px",
                  height: "60px",
                  margin: "10px 10px 10px 10px"
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  margin: "10px 10px 10px 10px"
                }}
              >
                <Link
                  to={`/user/${item.id}`}
                  style={{ color: "black" }}
                  onClick={() => window.location.reload()}
                >
                  <PopOver
                    user={item}
                    name={`${item.firstname} ${item.lastname}`}
                  >
                    <h3>{`${props.profile.firstname} ${
                      props.profile.lastname
                    }`}</h3>
                  </PopOver>
                </Link>
                <p style={{ textAlign: "left" }}> {item.bio}</p>
                <button
                  onClick={() => unfollow(item.followid)}
                  style={{
                    marginTop: "10px",
                    color: "#03a87c",
                    border: "none",
                    backgroundColor: "inherit",
                    cursor: "pointer"
                  }}
                >
                  {followingOrNot}
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <h1>You aren't following anybody.</h1>
      )}
    </div>
  );
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(Following));
