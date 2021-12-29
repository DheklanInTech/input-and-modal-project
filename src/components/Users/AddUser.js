import React, { useState, useRef } from "react";
import styles from "./AddUser.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErroModal";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  //   const [enteredUsername, setEnteredUsername] = useState("");

  //   const [enteredAge, setEnteredAge] = useState("");

  const [error, setError] = useState("");

  const addUserHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "invalid input",
        message: "please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "invalid age",
        message: "please enter a valid  age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    // setEnteredUsername("");
    // setEnteredAge("");
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  //   const usernameChangeHandler = (e) => {
  //     setEnteredUsername(e.target.value);
  //   };

  //   const ageChangeHandler = (e) => {
  //     setEnteredAge(e.target.value);
  //   };

  const clearError = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={clearError}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
