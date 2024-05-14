const mongoose = require("mongoose");

const connetcDatabase = () => {
  console.log("conectando.. ");

  mongoose
    .connect(
      "mongodb+srv://oweslley03:BancoMongo03Weslley@cluster0.b3uma5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("mongoDB Atlas conectado"))
    .catch((err) => console.log(err));
}

module.exports = connetcDatabase 
