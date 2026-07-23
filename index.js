import express from "express";
import { connectDB } from "./src/config/connectionDB.js";
import { ENV } from "./src/constant.js";
import cors from "cors";
import router from "./src/route.js";
import "./src/worker/worker.js";

connectDB();
const app = express();
app.use(express.json());
app.use(cors({
    origin: "*", // For development
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use("/api", router);

app.get("/health", (req, res) => {
    return res.send("API is working Fine.....")
})

const PORT = ENV.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on the post of ${PORT}`);
});