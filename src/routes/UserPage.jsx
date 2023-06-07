import React, { useState, useEffect } from "react";
import NotFound from "./NotFound";

function UserPage() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("signedInUser")) {
      setSignedIn(true);
    }
  }, []);

  if (signedIn) {
    return (
      <div className="view-frame white-bg">
        <h1>Din sida</h1>
      </div>
    );
  } else {
    return <NotFound />;
  }
}

export default UserPage;
