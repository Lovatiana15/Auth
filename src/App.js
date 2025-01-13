import React, { useState } from "react";
import { registerUser, loginUser, logoutUser } from "./Auth";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const handleRegister = async () => {
        try {
            const userCredential = await registerUser(email, password);
            setUser(userCredential.user);
            alert("Inscription réussie !");
        } catch (error) {
            console.error("Erreur d'inscription :", error.message);
        }
    };

    const handleLogin = async () => {
        try {
            const userCredential = await loginUser(email, password);
            setUser(userCredential.user);
            alert("Connexion réussie !");
        } catch (error) {
            console.error("Erreur de connexion :", error.message);
        }
    };

    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
        alert("Déconnexion réussie !");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Firebase Authentication</h1>
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button onClick={handleRegister}>S'inscrire</button>
                <button onClick={handleLogin}>Se connecter</button>
                <button onClick={handleLogout}>Se déconnecter</button>
            </div>
            {user && <p>Connecté en tant que : {user.email}</p>}
        </div>
    );
}

export default App;
