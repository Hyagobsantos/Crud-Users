const app = require("./src/server")
require('dotenv').config()


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor Rodando Na Porta ${port}`)
})