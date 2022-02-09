import React, { Fragment, useEffect } from "react";
import Table from "react-bootstrap/Table";
import HeartFilled from "./Logo/Filled";
import HeartUnfilled from "./Logo/Unfilled";
import Trash from "./Logo/Trash";
import Edit from "./Logo/Edit";

import { useSelector, useDispatch } from "react-redux";
import {
  getContacts,
  deleteContact,
  editContact,
} from "../Actions/contactActions";
import { useNavigate } from "react-router-dom";
import CloudinaryImg from "./CloudinaryImg";
import View from "./Logo/View";

function ContactList(props) {
  const { contacts } = useSelector((state) => state.contact);
  const userId = useSelector((state) => state.auth.user._id);
  const imgHeight = 50;
  const imgWidth = 50;

  const displayContacts =
    props.type === "fav"
      ? contacts.filter((contact) => contact.favourite)
      : contacts;

  // console.log(contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const iconClickStyle = {
    backgroundColor: "rgba(0,0,0,0)",
    border: "none",
    fontFamily: "Arial",
  };

  useEffect(() => {
    dispatch(getContacts(userId));
  }, []);

  const onDeleteClick = (id) => {
    dispatch(deleteContact(id));
    dispatch(getContacts());
  };

  const onEditClick = (id) => {
    navigate(`/dashboard/edit/${id}`);
  };
  const handleView = (id) => {
    navigate(`/dashboard/view/${id}`);
  };

  const onFavClick = (id, favourite) => {
    // e.stopPropagation();
    console.log("favourite");
    const editedContact = {
      favourite: !favourite,
    };
    dispatch(editContact(id, editedContact));
    dispatch(getContacts(userId));
    // console.log(contacts);
  };
  return (
    <Fragment>
      <h1>{props.type === "fav" ? "Favourites" : "All Contacts"}</h1>
      <Table
        striped
        hover
        style={{ textAlign: "center", verticalAlign: "middle" }}
      >
        <thead>
          <tr>
            <th style={{ width: "5%" }}></th>
            <th>Name</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayContacts.map(
            ({ _id, name, numbers, favourite, cloudinaryId }, index) => (
              <tr key={_id}>
                <td>
                  {cloudinaryId && (
                    <CloudinaryImg
                      imgId={cloudinaryId}
                      width={imgWidth}
                      height={imgHeight}
                    />
                  )}
                  {!cloudinaryId && (
                    <img
                      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.biiainsurance.com%2Fwp-content%2Fuploads%2F2015%2F05%2Fno-image.jpg&f=1&nofb=1"
                      alt="chosen"
                      style={{
                        height: `${imgHeight}px`,
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </td>
                <td>{name}</td>
                <td>{numbers[0].number}</td>
                <td>
                  <button
                    style={iconClickStyle}
                    onClick={() => onFavClick(_id, favourite)}
                  >
                    {favourite ? <HeartFilled /> : <HeartUnfilled />}
                  </button>
                  &nbsp;&nbsp;
                  <button
                    style={iconClickStyle}
                    onClick={() => handleView(_id)}
                  >
                    <View />
                  </button>
                  &nbsp;&nbsp;
                  <button
                    style={iconClickStyle}
                    onClick={() => onDeleteClick(_id)}
                  >
                    <Trash />
                  </button>
                  &nbsp;&nbsp;
                  <button
                    style={iconClickStyle}
                    onClick={() => onEditClick(_id)}
                  >
                    <Edit />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </Fragment>
  );
}

export default ContactList;
