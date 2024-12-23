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
import AddUser from "./crud_user/add_user";
import UpdateUser from "./crud_user/update_user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function User() {
  const [open, setOpen] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleOpenModify = (user) => {
    setSelectedUser(user);
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

  const handleGoToReport = () => {
    navigate("/rapport");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/fetch_user/fetch_user"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching User:", error);
    }
  };

  const handleDeleteUser = async (NIF) => {
    try {
      await axios.delete(
        `http://localhost:8081/delete_user/delete_user/${NIF}`
      );
      fetchUser();
      Swal.fire({
        icon: "success",
        title: "Utilisateur supprimé avec succès",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleConfirmDelete = (NIF) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(NIF);
      }
    });
  };

  const sortedData = [...data].sort((a, b) => a.NIF.localeCompare(b.NIF));

  const filteredData = sortedData.filter(
    (user) =>
      user.NIF.toLowerCase().includes(search.toLowerCase()) ||
      user.nom.toLowerCase().includes(search.toLowerCase()) ||
      user.Prenoms.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container
      sx={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        padding: 4,
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 4,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: "bold", color: "#DC3545" }} // Red color for titles
        >
          Liste des Contribuables
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            backgroundColor: "#28A745", // Green for adding
            "&:hover": { backgroundColor: "#218838" },
          }}
          onClick={handleOpen}
        >
          <AddIcon /> Ajouter
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            textTransform: "none",
            backgroundColor: "#DC3545", // Red for report button
            "&:hover": { backgroundColor: "#C82333" },
          }}
          onClick={handleGoToReport}
        >
          Rapport
        </Button>
      </Box>

      <Box sx={{ marginBottom: 3, display: "flex", justifyContent: "center" }}>
        <TextField
          label="Rechercher (NIF, Nom, Prénoms, Email)"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          size="small"
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
      </Box>

      <AddUser open={open} handleClose={handleClose} onSuccess={fetchUser} />
      <UpdateUser
        openModify={openModify}
        handleCloseModify={handleCloseModify}
        onSuccess={fetchUser}
        selectedUser={selectedUser}
      />

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <TableContainer elevation={3} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "NIF",
                  "Numéro Stat",
                  "Nom",
                  "Prénoms",
                  "Adresse",
                  "Email",
                  "Mobile",
                  "Numéro de compte",
                  "Rôle",
                  "Actions",
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      backgroundColor: "#28A745", // Green for headers
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((user) => (
                <TableRow
                  key={user.NIF}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f4f6f8",
                    },
                  }}
                >
                  <TableCell>{user.NIF}</TableCell>
                  <TableCell>{user.numStat}</TableCell>
                  <TableCell>{user.nom}</TableCell>
                  <TableCell>{user.Prenoms}</TableCell>
                  <TableCell>{user.adresse}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.tel}</TableCell>
                  <TableCell>{user.numCompte}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#FFA500", // Orange for edit
                        "&:hover": { backgroundColor: "#FF8C00" },
                        marginRight: 1,
                      }}
                      onClick={() => handleOpenModify(user)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#FF6347", // Red for delete
                        "&:hover": { backgroundColor: "#E53935" },
                        marginRight: 1,
                      }}
                      onClick={() => handleConfirmDelete(user.NIF)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default User;
