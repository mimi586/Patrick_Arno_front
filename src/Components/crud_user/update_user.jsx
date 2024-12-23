import { useEffect, useState } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import axios from "axios";

function update_user({
  openModify,
  handleCloseModify,
  selecteduser,
  onSuccess,
}) {
  const [formData, setFormData] = useState(selecteduser || {});

  useEffect(() => {
    if (selecteduser) {
      const localDate = new Date(selecteduser.DateP).toISOString().split('T')[0];
      setFormData({ ...selecteduser, DateP: localDate });
    }
  }, [selecteduser]);

  const handleSubmit = () => {
    if (
      formData.NIF === selecteduser?.NIF &&
      formData.numStat === selecteduser?.numStat &&
      formData.nom === selecteduser?.nom &&
      formData.Prenoms === selecteduser?.Prenoms &&
      formData.adresse === selecteduser?.adresse &&
      formData.email === selecteduser?.email  &&
      formData.tel === selecteduser?.tel  &&
      formData.numCompte === selecteduser?.numCompte  &&
      formData.role === selecteduser?.role  
    ) {
      handleCloseModify();
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Veuillez modifier au moins une donnée avant de soumettre.",
      });
      return;
    }

    axios
      .put(
        `http://localhost:8081/update_user/update_user/${selecteduser.NIF}`,
      )
      .then((response) => {
        console.log("User mis à jour avec succès:", response.data);
        handleCloseModify();
        Swal.fire({
          icon: "success",
          title: "Mise à jour réussie!",
          text: "L'user a été mis à jour avec succès.",
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'user:", error);
        handleCloseModify();
        Swal.fire({
          icon: "error",
          title: "Erreur!",
          text: "Une erreur est survenue lors de la mise à jour de l'user. Veuillez réessayer plus tard.",
        });
      });
  };

  return (
    <Dialog
      open={openModify}
      onClose={handleCloseModify}
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: { backdropFilter: "blur(5px)" },
      }}
    >
      <DialogTitle
        style={{
          textAlign: "center",
          marginTop: "0px",
          backgroundColor: "#e60012", // Red background for header
          color: "#ffffff", // White text for header
        }}
      >
        Mise à jour d'un user
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
                value={formData?.NIF || ""}
                onChange={(e) =>
                  setFormData({ ...formData, NIF: e.target.value })
                }
                sx={{ backgroundColor: "#ffffff", marginBottom: "10px" }} // White background for text fields
              />
              <TextField
                margin="normal"
                fullWidth
                label="Numero Stat"
                name="numStat"
                type="text"
                autoComplete="Numero Stat"
                size="small"
                value={formData?.numStat || ""}
                onChange={(e) =>
                  setFormData({ ...formData, numStat: e.target.value })
                }
                sx={{ backgroundColor: "#ffffff", marginBottom: "10px" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Nom"
                name="nom"
                type="text"
                autoComplete="Nom"
                size="small"
                value={formData?.nom || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nom: e.target.value })
                }
                sx={{ backgroundColor: "#ffffff", marginBottom: "10px" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Prenoms"
                name="Prenoms"
                type="text"
                autoComplete="Prenoms"
                size="small"
                value={formData?.Prenoms || ""}
                onChange={(e) =>
                  setFormData({ ...formData, Prenoms: e.target.value })
                }
                sx={{ backgroundColor: "#ffffff", marginBottom: "10px" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Adresse"
                name="adresse"
                type="text"
                autoComplete="Adresse"
                size="small"
                value={formData?.adresse || ""}
                onChange={(e) =>
                  setFormData({ ...formData, adresse: e.target.value })
                }
                sx={{ backgroundColor: "#ffffff", marginBottom: "10px" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Email"
                name="email"
                type="text"
                autoComplete="Email"
                size="small"
                value={formData?.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                sx={{ backgroundColor: "#ffffff", marginBottom: "10px" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Mobile"
                name="tel"
                type="number"
                autoComplete="Mobile"
                size="small"
                value={formData?.tel || ""}
                onChange={(e) =>
                  setFormData({ ...formData, tel: e.target.value })
                }
                sx={{ backgroundColor: "#ffffff", marginBottom: "10px" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Numero de compte"
                name="numCompte"
                type="text"
                autoComplete="Numero de compte"
                size="small"
                value={formData?.numCompte || ""}
                onChange={(e) =>
                  setFormData({ ...formData, numCompte: e.target.value })
                }
                sx={{ backgroundColor: "#ffffff", marginBottom: "10px" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Rôle"
                name="role"
                type="text"
                autoComplete="Rôle"
                size="small"
                value={formData?.role || ""}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                sx={{ backgroundColor: "#ffffff", marginBottom: "20px" }}
              />
            </Box>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#00b140", // Green background for button
                  "&:hover": { backgroundColor: "#008f2f" }, // Darker green on hover
                  color: "white",
                }}
              >
                <EditIcon /> Mettre à jour
              </Button>
            </div>
          </Container>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

update_user.propTypes = {
  openModify: PropTypes.bool.isRequired,
  handleCloseModify: PropTypes.func.isRequired,
  selecteduser: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default update_user;
