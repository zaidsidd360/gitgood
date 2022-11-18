import React from "react";

const UserInput = (): JSX.Element => {
  return (
    <>
      <div>
        <h1>Enter your own username and password</h1>
        <p>OR use the random ones provided by default</p>
        <form action="submit">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
        </form>
      </div>
    </>
  );
};

export default UserInput;
