import React from "react";
import { Link, withRouter } from "react-router-dom";
import PopOver from "../subcomponent/popOver";

function Followers(props) {
  return (
    <div className="profile-tab" style={{ width: "80%" }}>
      {" "}
      <h2>{`${props.user.firstname} ${props.user.lastname} is followed by`}</h2>
      {props.followers.length > 0 ? (
        props.followers.map((item, i) => {
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
                    <h3 style={{ color: "black" }}>{`${props.user.firstname} ${
                      props.user.lastname
                    }`}</h3>
                  </PopOver>
                </Link>
                <p style={{ textAlign: "left" }}> {item.bio}</p>
              </div>
            </div>
          );
        })
      ) : (
        <h1>You have no Followers</h1>
      )}
    </div>
  );
}

export default withRouter(Followers);
