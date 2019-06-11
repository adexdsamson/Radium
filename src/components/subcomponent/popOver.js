import React from "react";
import { Popover } from "antd";

function PopOver(props) {
  const content = (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "80%" }}>
          {props.user.articleAuthorFirstName ? (
            <h2>{props.user.name}</h2>
          ) : (
            <h2>{props.user.name}</h2>
          )}
          {props.user.articleAuthorFirstName ? (
            <p style={{ fontSize: ".9em", textAlign: "left" }}>
              {props.user.articleAuthorBio}
            </p>
          ) : (
            false
          )}
          {props.user.bio ? (
            <p style={{ fontSize: ".9em", textAlign: "left" }}>
              {props.user.bio}
            </p>
          ) : (
            false
          )}
        </div>
        {props.user.articleAuthorAvatar ? (
          <img
            style={{
              height: "60px",
              
              width: "60px",
              backgroundColor: "#bbb",
              borderBottomLeftRadius: "50%",
              borderTopLeftRadius: "50%",
              borderBottomRightRadius: "50%",
              borderTopRightRadius: "50%",
              display: "inline-block"
            }}
            alt="..."
            src={props.user.articleAuthorAvatar}
          />
        ) : (
          false
        )}
        {props.user.avatar ? (
          <img
            style={{
              height: "60px",
              width: "60px",
              backgroundColor: "#bbb",
              borderBottomLeftRadius: "50%",
              borderTopLeftRadius: "50%",
              borderBottomRightRadius: "50%",
              borderTopRightRadius: "50%",
              display: "inline-block"
            }}
            alt = "..."
            src={props.user.avatar}
          />
        ) : (
          false
        )}
        {props.user.userImage ? (
          <img
            style={{
              height: "60px",
              width: "60px",
              backgroundColor: "#000",
              borderBottomLeftRadius: "50%",
              borderTopLeftRadius: "50%",
              borderBottomRightRadius: "50%",
              borderTopRightRadius: "50%",
              display: "inline-block"
            }}
            alt = "..."
            src={props.user.userImage}
          />
        ) : (
          false
        )}

        <hr />
      </div>
    </div>
  );
  return (
    <Popover content={content} trigger="hover">
      {props.name}
    </Popover>
  );
}

export default PopOver;
