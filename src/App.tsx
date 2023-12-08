import React, { useState } from "react";
import { Box } from "@mui/material";
import background from "./assets/5291450.jpg";
import { styled } from "@mui/system";
import Login from "./Login";
import Register from "./Register";

const App: React.FC = () => {
  const StyledBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `url(${background})`,
    backgroundSize: "cover",
    opacity: 0.9,
  });

  const [isRegisterPage, setisRegisterPage] = useState(true);
  const handleTogglePage = () => {
    setisRegisterPage((prev) => !prev);
  };

  return (
    <StyledBox className="registerSection">
      {isRegisterPage ? (
        <Register onTogglePage={handleTogglePage} />
      ) : (
        <Login onTogglePage={handleTogglePage} />
      )}
    </StyledBox>
  );
};

export default App;
