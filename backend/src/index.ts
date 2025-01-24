import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import jwt, {JwtPayload} from 'jsonwebtoken'
import path from "path"


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin:"http://localhost:5173"
}))

const JWT_SECRET = "something";

app.post("/signin",(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const token = jwt.sign({
        id: 1,
    }, JWT_SECRET);
    res.cookie("token", true);
    res.send("Logged In");
})

app.get("/user", (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // get email of the user from the database
    res.send({
        userId: decoded.id
    })
})

app.post("/logout", (req, res) => {
    res.cookie('token', "ads");
    res.json({
        message : "Logged Out"
    })
})

app.listen(3002)