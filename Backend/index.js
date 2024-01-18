const { getPosts, addPost, modificarLikes, eliminarPost } = require("./consultas");
const express = require("express");
const cors = require("cors");
const app = express();

app.listen(3000, () => {
    console.log("Servidor LikeMe operativo");
});

// Middleware
app.use(express.json());
app.use(cors());

// Ruta que permite al frontend recibir los registros de la base de datos
app.get("/posts", async (req, res) => {
    try {
        const posts = await getPosts();
        res.json(posts);
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Agregar Post
app.post("/posts", async (req, res) => {
    try {
        const { titulo, img, descripcion, likes } = req.body;
        await addPost(titulo, img, descripcion, likes);
        res.status(201).json("Agregado");
    } catch (error) {
        console.error("Error al agregar el post:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Modificar Likes (PUT)
app.put("/posts/like/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await modificarLikes(id);
        res.send("Like actualizado");
    } catch (error) {
        console.error("Error al modificar los likes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Eliminar Post (DELETE)
app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await eliminarPost(id);
        res.send("Post eliminado");
    } catch (error) {
        console.error("Error al eliminar el post:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
