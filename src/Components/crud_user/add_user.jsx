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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Swal from "sweetalert2";

function AddUser({ open, handleClose, onSuccess }) {
  const [formData, setFormData] = useState({
    NIF: "",
    numStat: "",
    nom: "",
    Prenoms: "",
    adresse: "",
    email: "",
    tel: "",
    numCompte: "",
    role: "",
  });

  const handleChange = (e, value, fieldName) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async () => {
    try {
      // Validation des champs
      if (
        !formData.NIF ||
        !formData.numStat ||
        !formData.nom ||
        !formData.Prenoms ||
        !formData.adresse ||
        !formData.email ||
        !formData.tel ||
        !formData.numCompte ||
        !formData.role
      ) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Veuillez remplir tous les champs",
        });
        return;
      }

      const res = await axios.post(
        "http://localhost:8081/add_user/add_user", // Assurez-vous que l'URL est correcte dans votre backend
        formData
      );
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Contribuable ajouté avec succès",
        showConfirmButton: false,
        timer: 1250,
      });
      if (onSuccess) {
        onSuccess();
      }

      // Réinitialiser le formulaire
      setFormData({
        NIF: "",
        numStat: "",
        nom: "",
        Prenoms: "",
        adresse: "",
        email: "",
        tel: "",
        numCompte: "",
        role: "",
      });
    } catch (err) {
      console.error("Erreur lors de la requête POST:", err);
      handleClose();
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur s'est produite lors de l'ajout de ce contribuable",
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
      <DialogTitle
        style={{
          textAlign: "center",
          marginTop: "0px",
          backgroundColor: "#008000", // Vert (drapeau malgache)
          color: "white",
          padding: "10px",
        }}
      >
        Ajouter un contribuable
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Container>
            <CssBaseline />
            <Box component="form" noValidate sx={{ mt: 0 }}>
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
                sx={{ backgroundColor: "#FFFFFF" }} // Blanc pour les champs de saisie
              />
              <TextField
                margin="normal"
                fullWidth
                label="Numéro Stat"
                name="numStat"
                type="text"
                autoComplete="Numéro Stat"
                size="small"
                value={formData.numStat}
                onChange={(e) => handleChange(e, e.target.value, "numStat")}
                sx={{ backgroundColor: "#FFFFFF" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Nom"
                name="nom"
                type="text"
                autoComplete="Nom"
                size="small"
                value={formData.nom}
                onChange={(e) => handleChange(e, e.target.value, "nom")}
                sx={{ backgroundColor: "#FFFFFF" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Prénoms"
                name="Prenoms"
                type="text"
                autoComplete="Prénoms"
                size="small"
                value={formData.Prenoms}
                onChange={(e) => handleChange(e, e.target.value, "Prenoms")}
                sx={{ backgroundColor: "#FFFFFF" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Adresse"
                name="adresse"
                type="text"
                autoComplete="Adresse"
                size="small"
                value={formData.adresse}
                onChange={(e) => handleChange(e, e.target.value, "adresse")}
                sx={{ backgroundColor: "#FFFFFF" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Email"
                name="email"
                type="email"
                autoComplete="Email"
                size="small"
                value={formData.email}
                onChange={(e) => handleChange(e, e.target.value, "email")}
                sx={{ backgroundColor: "#FFFFFF" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Téléphone"
                name="tel"
                type="number"
                autoComplete="Mobile"
                size="small"
                value={formData.tel}
                onChange={(e) => handleChange(e, e.target.value, "tel")}
                sx={{ backgroundColor: "#FFFFFF" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Numéro de compte"
                name="numCompte"
                type="text"
                autoComplete="Numéro de compte"
                size="small"
                value={formData.numCompte}
                onChange={(e) => handleChange(e, e.target.value, "numCompte")}
                sx={{ backgroundColor: "#FFFFFF" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Rôle"
                name="role"
                type="text"
                autoComplete="Rôle"
                size="small"
                value={formData.role}
                onChange={(e) => handleChange(e, e.target.value, "role")}
                sx={{ backgroundColor: "#FFFFFF" }}
              />
            </Box>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#008000", // Vert (drapeau malgache)
                  "&:hover": { backgroundColor: "#006400" }, // Couleur plus foncée au survol
                  color: "white",
                }}
              >
                <AddIcon /> Ajouter
              </Button>
            </div>
          </Container>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

AddUser.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default AddUser;
