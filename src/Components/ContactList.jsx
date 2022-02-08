import React, { Fragment, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import HeartFilled from "./Logo/filled";
import HeartUnfilled from "./Logo/unfilled";
import Trash from "./Logo/trash";
import Edit from "./Logo/edit";

import { useSelector, useDispatch } from "react-redux";
import {
  getContacts,
  deleteContact,
  editContact,
} from "../Actions/contactActions";
import { AddContactModal } from "./AddContactModal";
import { Link, useNavigate } from "react-router-dom";

function ContactList() {
  const { contacts } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const iconClickStyle = {
    backgroundColor: "rgba(0,0,0,0)",
    border: "none",
    fontFamily: "Arial",
  };

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  const onDeleteClick = (id) => {
    dispatch(deleteContact(id));
    dispatch(getContacts());
  };

  const onEditClick = (id) => {
    navigate(`edit/${id}`);
  };

  const onFavClick = (id, favourite) => {
    // e.stopPropagation();

    console.log("favourite");
    const editedContact = {
      favourite: !favourite,
    };
    dispatch(editContact(id, editedContact));
    dispatch(getContacts());
  };
  return (
    <Fragment>
      {/* <AddContactModal /> */}
      <Link to={"addContact"}> add</Link>

      <Table striped hover style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th>Name</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(({ _id, name, number, favourite }, index) => (
            <tr key={_id}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>{number}</td>
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
                  onClick={() => onDeleteClick(_id)}
                >
                  <Trash />
                </button>
                &nbsp;&nbsp;
                <button style={iconClickStyle} onClick={() => onEditClick(_id)}>
                  <Edit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
}

export default ContactList;
