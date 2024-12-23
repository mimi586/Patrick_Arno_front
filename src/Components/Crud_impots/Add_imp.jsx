import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Box,
  Container,
  CssBaseline,
  Backdrop,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Swal from "sweetalert2";

function Add_imp({ open, handleClose, onSuccess }) {
  const [formData, setFormData] = useState({
    Montant: "",
    DateP: "",
    TypeImpots: "",
    ModePaiement: "",
    ReferencePaiement: "",
    NumCompte: "",
    NIF: "",
  });

  const handleChange = (e, value, fieldName) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async () => {
    try {
      // Validation des champs
      if (
        !formData.Montant ||
        !formData.DateP ||
        !formData.TypeImpots ||
        !formData.ModePaiement ||
        !formData.ReferencePaiement ||
        !formData.NumCompte ||
        !formData.NIF
      ) {
        handleClose();
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Veuillez remplir tous les champs",
        });
        return;
      }

      const res = await axios.post(
        "http://localhost:8081/add_imp/add_imp", // Assurez-vous que l'URL est correcte dans votre backend
        formData
      );
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Paiement effectué avec succès",
        showConfirmButton: false,
        timer: 1250,
      });
      if (onSuccess) {
        onSuccess();
      }
      console.log(res);

      // Réinitialiser le formulaire
      setFormData({
        Montant: "",
        DateP: "",
        TypeImpots: "",
        ModePaiement: "",
        ReferencePaiement: "",
        NumCompte: "",
        NIF: "",
      });
    } catch (err) {
      console.error("Erreur lors de la requête POST:", err);
      handleClose();
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur s'est produite lors de ce paiement",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: { backdropFilter: "blur(5px)" },
      }}
    >
      <DialogTitle style={{ textAlign: "center", marginTop: "0px", color: "#D70000" }}>
        Payer
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Container>
            <CssBaseline />
            <Box component="form" noValidate sx={{ mt: 0 }}>
              {/* Montant Field */}
              <TextField
                margin="normal"
                fullWidth
                label="Montant"
                name="Montant"
                type="number"
                autoComplete="Montant"
                size="small"
                value={formData.Montant}
                onChange={(e) => handleChange(e, e.target.value, "Montant")}
                sx={{
                  backgroundColor: "#f1f1f1", 
                  "& .MuiInputBase-root": { backgroundColor: "#FFFFFF" },
                }}
              />

              {/* Date de paiement Field */}
              <TextField
                margin="normal"
                fullWidth
                label="Date de paiement"
                name="DateP"
                type="date"
                autoComplete="Date de paiement"
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                value={formData.DateP}
                onChange={(e) => handleChange(e, e.target.value, "DateP")}
                sx={{
                  backgroundColor: "#f1f1f1", 
                  "& .MuiInputBase-root": { backgroundColor: "#FFFFFF" },
                }}
              />

              {/* Type d'impôt Field */}
              <TextField
                margin="normal"
                fullWidth
                label="Type d'impôt"
                name="TypeImpots"
                type="text"
                autoComplete="Type d'impôt"
                size="small"
                value={formData.TypeImpots}
                onChange={(e) => handleChange(e, e.target.value, "TypeImpots")}
                sx={{
                  backgroundColor: "#f1f1f1", 
                  "& .MuiInputBase-root": { backgroundColor: "#FFFFFF" },
                }}
              />

              {/* Mode de paiement (Select) */}
              <FormControl fullWidth margin="normal" size="small">
                <InputLabel id="mode-paiement-label">Mode de paiement</InputLabel>
                <Select
                  labelId="mode-paiement-label"
                  id="ModePaiement"
                  value={formData.ModePaiement}
                  label="Mode de paiement"
                  onChange={(e) => handleChange(e, e.target.value, "ModePaiement")}
                >
                  <MenuItem value={"Mobile Money"}>Mobile Money</MenuItem>
                  <MenuItem value={"Carte Bancaire"}>Carte Bancaire</MenuItem>
                </Select>
              </FormControl>

              {/* Reference de paiement Field */}
              <TextField
                margin="normal"
                fullWidth
                label="Référence de paiement"
                name="ReferencePaiement"
                type="text"
                autoComplete="Référence de paiement"
                size="small"
                value={formData.ReferencePaiement}
                onChange={(e) => handleChange(e, e.target.value, "ReferencePaiement")}
                sx={{
                  backgroundColor: "#f1f1f1", 
                  "& .MuiInputBase-root": { backgroundColor: "#FFFFFF" },
                }}
              />

              {/* Numéro de compte Field */}
              <TextField
                margin="normal"
                fullWidth
                label="Numéro de compte"
                name="NumCompte"
                type="text"
                autoComplete="Numéro de compte"
                size="small"
                value={formData.NumCompte}
                onChange={(e) => handleChange(e, e.target.value, "NumCompte")}
                sx={{
                  backgroundColor: "#f1f1f1", 
                  "& .MuiInputBase-root": { backgroundColor: "#FFFFFF" },
                }}
              />

              {/* NIF Field */}
              <TextField
                margin="normal"
                fullWidth
                label="NIF"
                name="NIF"
                type="text"
                autoComplete="NIF"
                size="small"
                value={formData.NIF}
                onChange={(e) => handleChange(e, e.target.value, "NIF")}
                sx={{
                  backgroundColor: "#f1f1f1", 
                  "& .MuiInputBase-root": { backgroundColor: "#FFFFFF" },
                }}
              />
            </Box>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#00A859", // Green (Malagasy flag)
                  "&:hover": { backgroundColor: "#007B45" },
                  color: "white",
                }}
              >
                <AddIcon /> Effectuer
              </Button>
            </div>
          </Container>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

Add_imp.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default Add_imp;
