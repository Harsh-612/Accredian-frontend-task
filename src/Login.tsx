import React, { useState } from "react";
import {
  Card,
  TextField,
  Button,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

interface LoginProps {
  onTogglePage: () => void;
}

//styled components

const StyledCard = styled(Card)({
  padding: "40px",
  width: "400px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
});

const StyledTypography = styled(Typography)({
  fontFamily: "'Roboto', sans-serif",
  marginBottom: "16px",
  color: "#333",
});

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  marginBottom: "16px",
});

const Login: React.FC<LoginProps> = ({ onTogglePage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  //On-change handlers

  const handleInputChange = (field: "username" | "password", value: string) => {
    if (field === "username") {
      setUsername(value);
    } else if (field === "password") {
      setPassword(value);
    }

    //Enabling the button

    setIsDisabled(username.length === 0 || password.length < 8);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    //api calls to log user

    console.log("Login submitted:", { username, password });
  };

  return (
    <StyledCard raised className="login-card">
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <StyledTypography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            Login
          </StyledTypography>
        </Grid>
        <Grid item style={{ padding: "0" }}>
          <Typography variant="caption" color="textSecondary">
            Enter your credentials to log in.
          </Typography>
        </Grid>
      </Grid>
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username or Email"
          variant="outlined"
          margin="normal"
          required
          value={username}
          onChange={(e) => handleInputChange("username", e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          required
          value={password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ color: "inherit" }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isDisabled}
          style={{ marginTop: "20px", padding: "12px", borderRadius: "8px" }}
        >
          Login
        </Button>
      </StyledForm>
      <Typography variant="caption" color="textSecondary">
        Don't have an account?{" "}
        <Link color="primary" onClick={onTogglePage} sx={{ cursor: "pointer" }}>
          Register here
        </Link>
      </Typography>
    </StyledCard>
  );
};

export default Login;
