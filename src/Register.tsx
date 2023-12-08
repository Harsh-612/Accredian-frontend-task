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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ErrorOutlineIcon from "@mui/icons-material/Error";

interface RegisterProps {
  onTogglePage: () => void;
}

const StyledCard = styled(Card)({
  padding: "40px",
  width: "400px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
});

const StyledTypography = styled(Typography)({
  marginBottom: "16px",
  color: "#333",
});

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  marginBottom: "16px",
});

const App: React.FC<RegisterProps> = ({ onTogglePage }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordMatch = password === confirmPassword;
  const isPasswordValid = password.length > 7;

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(
      value.length < 8 ? "Password must be at least 8 characters long" : ""
    );
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //api calls
    console.log("Form submitted:", { email, username, password });
  };

  return (
    <StyledCard raised className="register-card">
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <StyledTypography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            Sign Up
          </StyledTypography>
        </Grid>
        <Grid item style={{ padding: "0" }}>
          <Typography variant="caption" color="textSecondary">
            Please fill out the form to create an account.
          </Typography>
        </Grid>
      </Grid>
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          required
          value={password}
          error={passwordError !== ""}
          helperText={passwordError}
          onChange={(e) => handlePasswordChange(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ color: passwordError ? "red" : "inherit" }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          required
          value={confirmPassword}
          error={confirmPassword.length > 7 && !isPasswordMatch}
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {isPasswordMatch && isPasswordValid && (
                  <CheckCircleOutlineIcon style={{ color: "green" }} />
                )}
                {confirmPassword.length > 7 && !isPasswordMatch && (
                  <ErrorOutlineIcon style={{ color: "red" }} />
                )}
              </InputAdornment>
            ),
          }}
        />
        {isPasswordMatch && isPasswordValid && (
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginTop: "8px", color: "green" }}
          >
            Passwords match
          </Typography>
        )}
        {confirmPassword.length > 7 && !isPasswordMatch && (
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginTop: "8px", color: "red" }}
          >
            Passwords don't match!
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px", padding: "12px", borderRadius: "8px" }}
          disabled={!isPasswordMatch || !isPasswordValid}
        >
          Sign Up
        </Button>
      </StyledForm>
      <Typography variant="caption" color="textSecondary">
        Already registered?{" "}
        <Link color="primary" onClick={onTogglePage} sx={{ cursor: "pointer" }}>
          Register here
        </Link>
      </Typography>
    </StyledCard>
  );
};

export default App;
