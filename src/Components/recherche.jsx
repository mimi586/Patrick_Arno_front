import React, { useState } from "react";
import axios from "axios";

const SearchComponent = () => {
    const [keyword, setKeyword] = useState(""); // Mot-clé entré par l'utilisateur
    const [results, setResults] = useState([]); // Résultats de la recherche
    const [loading, setLoading] = useState(false); // État du chargement
    const [error, setError] = useState(""); // Erreur éventuelle

    const handleSearch = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get("http://localhost:3001/search", {
                params: { keyword }, // Envoyer le mot-clé en tant que paramètre
            });

            setResults(response.data.results);
        } catch (err) {
            setError("Error while performing search. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Search Items</h2>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter keyword..."
                style={{ padding: "10px", marginRight: "10px", width: "300px" }}
            />
            <button onClick={handleSearch} style={{ padding: "10px" }}>
                Search
            </button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {results.map((item) => (
                    <li key={item.id}>
                        <strong>{item.name}</strong>: {item.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
