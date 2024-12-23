import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [Email, setEmail] = useState('');
    const [MDP, setMDP] = useState('');
    const [messageErreur, setMessageErreur] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        // Send POST request to backend API
        axios.post('http://localhost:8081/login/login', {
            Email,
            MDP,
        })
        .then((response) => {
            if (response.data && response.data.user) {
                navigate('/user'); // Redirect to the user page
            } else {
                setMessageErreur('Identifiants invalides. Veuillez réessayer.');
            }
        })
        .catch((error) => {
            setMessageErreur('Identifiants invalides. Veuillez réessayer.');
        });
    }

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center' style={{ backgroundColor: '#ffffff' }}>
            <div className='p-4 bg-white shadow rounded' style={{ width: '400px' }}>
                <h3 className='text-center mb-4' style={{ color: '#28A745' }}>Connexion</h3> {/* Green color for the title */}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="Email" className='form-label' style={{ color: '#28A745', fontWeight: 'bold' }}>Adresse Email</label> {/* Green color for labels */}
                        <input 
                            type="email" 
                            id="Email"
                            placeholder='Entrez votre email' 
                            className='form-control' 
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="MDP" className='form-label' style={{ color: '#28A745', fontWeight: 'bold' }}>Mot de passe</label> {/* Green color for labels */}
                        <input 
                            type="password" 
                            id="MDP"
                            placeholder='Entrez votre mot de passe' 
                            className='form-control' 
                            value={MDP}
                            onChange={(e) => setMDP(e.target.value)} 
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className='btn w-100' 
                        style={{
                            backgroundColor: '#28A745', 
                            borderColor: '#28A745', 
                            fontWeight: 'bold', 
                            color: 'white'
                        }}
                    >
                        Se connecter
                    </button>
                </form>
                {messageErreur && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {messageErreur} {/* Red color for error message */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
