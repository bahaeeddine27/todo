import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import path from "path";
import fs from "fs";
import axios from "axios";
import App from "../src/App";

const app = express();

// Middleware pour servir les fichiers statiques depuis le dossier dist
app.use(express.static(path.resolve(__dirname, "../dist"), { maxAge: "30d" }));

// Route principale pour la page d'accueil
app.get("/", async (req, res) => {
    try {
        // Récupérer les tâches depuis l'API JSONPlaceholder
        const { data: tasks } = await axios.get("https://jsonplaceholder.typicode.com/todos");

        // Lire le fichier index.html depuis le dossier public
        fs.readFile(path.resolve("./index.html"), "utf8", (err, data) => {
            if (err) {
                return res.status(500).send("Erreur lors de la lecture du fichier HTML");
            }

            // Rendre le composant App avec les données récupérées
            const appHtml = ReactDOMServer.renderToString(<App tasks={tasks} />);

            // Remplacer le div avec id="root" par le rendu du composant App
            const html = data.replace(
                '<div id="root"></div>',
                `<div id="root">${appHtml}</div>`
            );

            // Envoyer la réponse avec la page HTML complète
            res.send(html);
        });
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des tâches.");
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
