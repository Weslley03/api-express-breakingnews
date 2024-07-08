import mongoose from "mongoose"

const connetcDatabase = () => {
  console.log("conectando.. ");

  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b3uma5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }    
    )
    .then(() => console.log("mongoDB Atlas conectado"))
    .catch((err) => console.log(`não foi possivel se conectar ao banco ${err}`));
}

export default connetcDatabase 
