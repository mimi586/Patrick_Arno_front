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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import axios from "axios";

function Update_imp({
  openModify,
  handleCloseModify,
  selectedImpots,
  onSuccess,
}) {
  const [formData, setFormData] = useState(selectedImpots || {});

  useEffect(() => {
    if (selectedImpots) {
      const localDate = new Date(selectedImpots.DateP).toISOString().split('T')[0];
      setFormData({ ...selectedImpots, DateP: localDate });
    }
  }, [selectedImpots]);

  const handleSubmit = () => {
    if (
      formData.Montant === selectedImpots?.Montant &&
      formData.DateP === selectedImpots?.DateP &&
      formData.TypeImpots === selectedImpots?.TypeImpots &&
      formData.ModePaiement === selectedImpots?.ModePaiement &&
      formData.ReferencePaiement === selectedImpots?.ReferencePaiement &&
      formData.NumCompte === selectedImpots?.NumCompte
    ) {
      handleCloseModify();
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Veuillez modifier au moins une donnée avant de soumettre.",
      });
      return;
    }

    const utcDate = new Date(formData.DateP + 'T00:00:00Z').toISOString();

    axios
      .put(
        `http://localhost:8081/update_imp/update_imp/${selectedImpots.NumPayements}`,
        { ...formData, DateP: utcDate }
      )
      .then((response) => {
        console.log("Impôt mis à jour avec succès:", response.data);
        handleCloseModify();
        Swal.fire({
          icon: "success",
          title: "Mise à jour réussie!",
          text: "L'impôt a été mis à jour avec succès.",
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'impôt:", error);
        handleCloseModify();
        Swal.fire({
          icon: "error",
          title: "Erreur!",
          text: "Une erreur est survenue lors de la mise à jour de l'impôt. Veuillez réessayer plus tard.",
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
      <DialogTitle style={{ textAlign: "center", marginTop: "0px" }}>
        Mise à jour d'un impôt
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Container>
            <CssBaseline />
            <Box component="form" noValidate sx={{ mt: 0 }}>
              <TextField
                margin="normal"
                fullWidth
                label="Montant"
                name="Montant"
                type="number"
                autoComplete="Montant"
                size="small"
                value={formData?.Montant || ""}
                onChange={(e) =>
                  setFormData({ ...formData, Montant: e.target.value })
                }
                sx={{ backgroundColor: "#f1f1f1" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Date de paiement"
                name="DateP"
                type="date"
                autoComplete="Date de paiement"
                size="small"
                value={formData?.DateP || ""}
                onChange={(e) =>
                  setFormData({ ...formData, DateP: e.target.value })
                }
                sx={{ backgroundColor: "#f1f1f1" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Type d'impôt"
                name="TypeImpots"
                type="text"
                autoComplete="Type d'impôt"
                size="small"
                value={formData?.TypeImpots || ""}
                onChange={(e) =>
                  setFormData({ ...formData, TypeImpots: e.target.value })
                }
                sx={{ backgroundColor: "#f1f1f1" }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="mode-paiement-label">Mode de paiement</InputLabel>
                <Select
                  labelId="mode-paiement-label"
                  name="ModePaiement"
                  value={formData?.ModePaiement || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, ModePaiement: e.target.value })
                  }
                  size="small"
                >
                  <MenuItem value="Mobile Money">Mobile Money</MenuItem>
                  <MenuItem value="Carte Bancaire">Carte Bancaire</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                fullWidth
                label="Référence de paiement"
                name="ReferencePaiement"
                type="text"
                autoComplete="Référence de paiement"
                size="small"
                value={formData?.ReferencePaiement || ""}
                onChange={(e) =>
                  setFormData({ ...formData, ReferencePaiement: e.target.value })
                }
                sx={{ backgroundColor: "#f1f1f1" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Numéro de compte"
                name="NumCompte"
                type="text"
                autoComplete="Numéro de compte"
                size="small"
                value={formData?.NumCompte || ""}
                onChange={(e) =>
                  setFormData({ ...formData, NumCompte: e.target.value })
                }
                sx={{ backgroundColor: "#f1f1f1" }}
              />
            </Box>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#28A745",
                  "&:hover": { backgroundColor: "#218838" },
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

Update_imp.propTypes = {
  openModify: PropTypes.bool.isRequired,
  handleCloseModify: PropTypes.func.isRequired,
  selectedImpots: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default Update_imp;
