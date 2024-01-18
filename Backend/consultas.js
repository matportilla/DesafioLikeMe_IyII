const { Pool } = require("pg");

// Indicarle los datos del acceso a la base de datos
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "likeme",
    allowExitOnIdle: true
})

//obtener desde la base de datos todos los registros
const getPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows
}

// registras nuevos datos en la base datos (nuevo post)
const addPost = async (titulo, img, descripcion, likes = 0) => {


    // INSERT INTO posts VALUES (DEFAULT, titulo, img, descripcion, likes)
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)";
    const valores = [titulo, img, descripcion, likes];
    const result = await pool.query(consulta, valores);
    console.log("Post agregado")
}

// Modfificar datos en la base datos (Like +1)
const modificarLikes = async (id) => {
    const consulta = "UPDATE posts SET likes = (likes + 1) WHERE id = $1";
    const valor = [id];
    const result = await pool.query(consulta, valor)
    console.log("Post actualizado")
}

// Eliminar datos en la base datos (DELETE)
const eliminarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1"
    const valor = [id];
    const result = await pool.query(consulta, valor)
    console.log("Post eliminado")
}



module.exports = { getPosts, addPost, modificarLikes, eliminarPost }