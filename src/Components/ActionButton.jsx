import React from "react";
import Button from "react-bootstrap/Button";

function ActionButton(props) {
  return (
    <div className="d-grid gap-2">
      <Button variant="primary" type="submit">
        {props.text}
      </Button>
    </div>
  );
}

export default ActionButton;
