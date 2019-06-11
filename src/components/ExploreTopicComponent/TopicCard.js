import React,  {useState, useEffect}  from "react";
import "./ExploreTopic.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addUserInterest, removeUserInterest } from "../../store/reducer";
import { QueryUser, authRef } from "../../utilities/firebase";
//import {FaPlus} from "react-icons/fa";
//import {FaCheck} from "react-icons/fa";
//import swal from "sweetalert";

function TopicCard(props) {
  const capitalizeFirstLetter = str => {
    if (str.split(" ").length === 2) {
      return str
        .split(" ")
        .map(val => val.charAt(0).toUpperCase() + val.slice(1))
        .join(" ");
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  //const [interest, setInterest] = useState;
  //useEffect(() => {
    //var user = authRef.currentUser.uid;
   // QueryUser(user)
     // .get()
      //.then(doc => {
      //  const interest = [];
       // doc.forEach(doc => {
         // interest.push({
          //  interest: doc.data().interest
          //});
          //setInterest(interest)
       // })
   // })
  //})
  //console.log(interest)
  //let topicButton = props.user.interests.find(
    //val => val.category === props.id
  //) ? (
   // <div
     // className="topic-add-button"
    //  onClick={() => props.removeUserInterest(props.user.id, props.id)}
 //   >
  //    <FaCheck />
  //  </div>
  //) : (
   // <div
     // className="topic-add-button"
     // onClick={() => {
      //  if (!props.user.id) {
     //     swal({ text: "Sign-in" });
     //     return;
     //   }
     //   props.addUserInterest(props.user.id, props.id);
     // }}
   // >
    //  <FaPlus />
   // </div>
 // );
  return (
    <div className="topic-card">
      <div className="card-header">
        <h2>{capitalizeFirstLetter(props.name)}</h2>
      </div>
      <Link to={`/topic/${props.name}/${props.id}`}>
        <div
          className="topic-card-img"
          style={{
            backgroundImage: `url(${props.img})`
          }}
        />
      </Link>
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  addUserInterest,
  removeUserInterest
})(TopicCard);
