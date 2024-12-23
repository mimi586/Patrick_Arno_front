// src/pages/PageTwo.js

import React from 'react';
import Impots from '../Components/Impots';
import { useNavigate } from "react-router-dom"; 
import { Button } from '@mui/material';
const Rapport = () => {
    const navigate = useNavigate(); 
    const handleGoToReport = () => {
        navigate("/user"); // Redirect to the report page
      };
    return (
        <div>
            <Button
          variant="contained"
          color="secondary"
          style={{ textTransform: "none" }}
          onClick={handleGoToReport} // Navigate to reports
        >
          User
        </Button>
            <Impots  showButtons={false} />
        </div>
    );
};

export default Rapport;