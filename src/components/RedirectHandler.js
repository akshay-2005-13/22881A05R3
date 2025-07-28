import React, { useEffect, useState } from "react";
import { Typography, Box, Container, CircularProgress, Alert } from "@mui/material";

const RedirectHandler = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const path = window.location.pathname.slice(1); 
    const data = localStorage.getItem(path);

    if (!data) {
      setStatus("notfound");
      setMessage(`❌ No URL found for code "${path}".`);
      return;
    }

    const parsed = JSON.parse(data);
    const now = Date.now();

    if (parsed.expiresAt && now > parsed.expiresAt) {
      setStatus("expired");
      setMessage(`-> This link (${path}) has expired.`);
    } else {
      const click = {
        timestamp: now,
        referrer: document.referrer || "Direct",
        location: "India"
      };
      parsed.clicks = parsed.clicks || [];
      parsed.clicks.push(click);
      localStorage.setItem(path, JSON.stringify(parsed));

      setStatus("redirecting");
      setTimeout(() => {
        window.location.href = parsed.longUrl;
      }, 1000); 
    }
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      {status === "loading" && (
        <Box textAlign="center">
          <CircularProgress />
          <Typography mt={2}>Loading...</Typography>
        </Box>
      )}

      {status === "redirecting" && (
        <Box textAlign="center">
          <CircularProgress color="success" />
          <Typography mt={2}>Redirecting you to the original link...</Typography>
        </Box>
      )}

      {status === "expired" && (
        <Alert severity="warning" variant="filled">
          {message}
        </Alert>
      )}

      {status === "notfound" && (
        <Alert severity="error" variant="filled">
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default RedirectHandler;
