import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Add_imp from "./Crud_impots/Add_imp";
import Update_imp from "./Crud_impots/Update_imp";
import Swal from "sweetalert2";
import jsPDF from "jspdf";

function Impots({ showButtons = true }) {
  const [open, setOpen] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [selectedImpots, setSelectedImpots] = useState(null);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleOpenModify = (impot) => {
    setSelectedImpots(impot);
    setOpenModify(true);
  };

  const handleCloseModify = () => {
    setOpenModify(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchImpots();
  }, []);

  const fetchImpots = async () => {
    try {
      const response = await axios.get("http://localhost:8081/fetch_imp/fetch_imp");
      const fetchedData = response.data.data;
      console.log("Données récupérées :", fetchedData);
      setData(fetchedData);
      setFilteredData(fetchedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des impôts :", error);
      setData([]);
    }
  };

  const handleDeleteImpots = async (numPayements) => {
    try {
      await axios.delete(`http://localhost:8081/delete_imp/delete_imp/${numPayements}`);
      fetchImpots();
      Swal.fire({
        icon: "success",
        title: "Paiement supprimé avec succès",
      });
    } catch (error) {
      console.error("Erreur lors du suppression:", error);
    }
  };

  const handleConfirmDelete = (numPayements) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E60012", // Rouge
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteImpots(numPayements);
      }
    });
  };

  const filteredResults = Array.isArray(data)
    ? data.filter(
        (impot) =>
          impot.NIF.toString().toLowerCase().includes(search.toLowerCase()) ||
          impot.DateP.toLowerCase().includes(search.toLowerCase()) ||
          impot.ReferencePaiement.toLowerCase().includes(search.toLowerCase()) ||
          impot.TypeImpots.toLowerCase().includes(search.toLowerCase()) ||
          impot.ModePaiement.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const sortedData = [...filteredResults].sort((a, b) => {
    const dateA = new Date(a.DateP);
    const dateB = new Date(b.DateP);
    return dateA - dateB;
  });

  const confirmAndGeneratePDF = (impot) => {
    Swal.fire({
      title: "Confirmer la génération du réçu",
      text: "Voulez-vous générer un réçu pour ce paiements ?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Oui, générer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        generatePDF(impot);
      }
    });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const generatePDF = (impot) => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Détails du Paiement d'Impôt", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Montant : ${impot.Montant} Ar`, 20, 40);
    pdf.text(`Date de paiement : ${formatDate(impot.DateP)}`, 20, 50);
    pdf.text(`Type d'impôt : ${impot.TypeImpots}`, 20, 60);
    pdf.text(`Mode de paiement : ${impot.ModePaiement}`, 20, 70);
    pdf.text(`Numéro de compte : ${impot.NumCompte}`, 20, 80);
    pdf.text(`Référence de paiement : ${impot.ReferencePaiement}`, 20, 90);

    pdf.save(`Impot_${impot.NumPayements}.pdf`);
  };

  return (
    <Container sx={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "15vh" }}>
        <Typography variant="h3" component="h4" maxWidth="sm" sx={{ color: '#006747' }}>
          Liste des paiements
        </Typography>
      </Box>

      {showButtons && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleOpen}
            sx={{ backgroundColor: '#006747', '&:hover': { backgroundColor: '#004e3f' } }}
          >
            <AddIcon />
            Ajouter un paiement
          </Button>
        </Box>
      )}

      <Box sx={{ marginBottom: 3, display: "flex", justifyContent: "center" }}>
        <TextField
          label="Rechercher par NIF, Date, Référence"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          size="small"
          sx={{ backgroundColor: '#e9f3f1' }}
        />
      </Box>

      <Add_imp open={open} handleClose={handleClose} onSuccess={fetchImpots} />
      <Update_imp openModify={openModify} handleCloseModify={handleCloseModify} onSuccess={fetchImpots} selectedImpots={selectedImpots} />

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <TableContainer elevation={2} component={Paper} sx={{ backgroundColor: '#f4f6f8' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#E60012', color: 'white' }}>Montant</TableCell>
                <TableCell sx={{ backgroundColor: '#E60012', color: 'white' }}>Date de paiement</TableCell>
                <TableCell sx={{ backgroundColor: '#E60012', color: 'white' }}>Type d'impôt</TableCell>
                <TableCell sx={{ backgroundColor: '#E60012', color: 'white' }}>Mode de paiement</TableCell>
                <TableCell sx={{ backgroundColor: '#E60012', color: 'white' }}>Numéro de compte</TableCell>
                <TableCell sx={{ backgroundColor: '#E60012', color: 'white' }}>Référence de paiement</TableCell>
                <TableCell sx={{ backgroundColor: '#E60012', color: 'white' }}>NIF</TableCell>
                <TableCell sx={{ backgroundColor: '#E60012', color: 'white' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((impot) => (
                  <TableRow key={impot.NumPayements}>
                    <TableCell>{impot.Montant} Ar</TableCell>
                    <TableCell>{formatDate(impot.DateP)}</TableCell>
                    <TableCell>{impot.TypeImpots}</TableCell>
                    <TableCell>{impot.ModePaiement}</TableCell>
                    <TableCell>{impot.NumCompte}</TableCell>
                    <TableCell>{impot.ReferencePaiement}</TableCell>
                    <TableCell>{impot.NIF}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleOpenModify(impot)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleConfirmDelete(impot.NumPayements)}
                      >
                        <DeleteIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => confirmAndGeneratePDF(impot)}
                      >
                        Réçu
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Aucun paiement trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default Impots;
