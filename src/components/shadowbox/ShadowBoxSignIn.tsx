import React, { useState } from "react";
import { Button, Box, TextField, Typography, Grid, Container, Card } from "@mui/material";
import { useWebSocket } from "../websocket/useWebsocket";

export default function ShadowboxSignIn() {
  const { sendMessage } = useWebSocket('ws://localhost:5000');  // WebSocket server URL
  
  const newDefault = {
    practiceId: 1,
    typeOfIVR: "newApplication",
    patientInfo: {
      patientCode: "P2024341001",
      patientId: 503,
      isPatientEdited: false,
      patientFirstName: "Danial",
      patientMiddleName: "",
      patientLastName: "Smith",
      patientDOB: "12/12/2000",
      gender: "Male",
      patientStreetAddress: "Wills hales 49 East",
      patientUnitNumber: "",
      patientCity: "Naperville",
      patientState: "IL",
      patientZipcode: "65789",
      faceSheet: [],
      isFaceSheetSkipped: true,
    },
    insuranceInfo: {
      insuranceName: "INSLYF",
      policy: "123786",
      isPolicyUnderDifferentName: "no",
      insuranceCards: [],
      isInsuranceCardsSkipped: true,
      isSecondaryInsurance: false,
    },
  };
  
  const [editableField, setEditableField] = React.useState(
    JSON.stringify(newDefault, null, 2)
  );
  const handleTemp = (username: string, password: string) => {
    // Send the data via WebSocket to the server
    const data = { username, password, editableField };
    sendMessage(data);

    window.location.href = `http://localhost:3000/shadowbox`;
  };

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "100vh", pt: { xs: 10, md: 0 } }}>
      <Container component="main" maxWidth="md">
        <Card sx={{ borderRadius: 3, minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", p: 0 }}>
          <Grid item xs={12}>
            <Box py={5} px={4} sx={{ borderRadius: 3, border: 1, borderColor: "#455A64", textAlign: "center" }}>
              <Typography variant="h4" component="div" sx={{ fontWeight: "bold", textAlign: "center", color: "black", mb: 3 }}>
                Welcome to ShadowBox 👋
              </Typography>
              {/* <Typography variant="h5" component="div" sx={{ fontWeight: "bold", color: "black", mb: 2 }}>
                The Strategic Sourcing Platform for Advanced Woundcare
              </Typography>
              <Typography variant="h6" component="div" sx={{ color: "black", mb: 4 }}>
                To get started, sign in to your account.
              </Typography> */}

              <TextField
                fullWidth
                multiline
                minRows={12}
                maxRows={15}
                variant="outlined"
                value={editableField}
                onChange={(e) => setEditableField(e.target.value)}
                sx={{
                  color: "black",
                  borderRadius: 2,
                  borderColor: "#455A64",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                  "& .MuiInputBase-input": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "455A64",
                  },
                  mb: 1,
                }}
              />

              <Button
                variant="contained"
                color="info"
                size="large"
                fullWidth
                onClick={() => handleTemp("practice@conscisys.com", "v3BioTeamRocks!")}
                sx={{
                  borderRadius: "50px",
                  padding: "15px",
                  fontWeight: "bold",
                  width: "auto",
                }}
              >
                Launch V3 for PA
              </Button>
            </Box>
          </Grid>
        </Card>
      </Container>
    </Grid>
  );
}
