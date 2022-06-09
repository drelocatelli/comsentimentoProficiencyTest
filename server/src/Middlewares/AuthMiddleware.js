import jwt from "jsonwebtoken";
import dotenv from 'dotenv/config';
import { PrismaClient } from "@prisma/client";

const JWTSecret = process.env.JWTSecret;
const prisma = new PrismaClient();

export default async function ProtectedRoute(req, res, next) {
    const authToken = req.headers.authorization;

    if(authToken != undefined) {
        const bearer = authToken.split(' ');
        const token = bearer[1];
        
        jwt.verify(token, JWTSecret, async (err, data) => {
            if(err) {
                return res.status(401).json({ msg: "Token inválido." });
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: data.id
                }
            });

            const newToken = jwt.sign(user, JWTSecret);

            delete data.iat;

            req.userLoggedIn = { ...user, token: newToken };

            if(req.userLoggedIn.status == 'INACTIVE') {
                return res.status(401).json({ msg: "Não autorizado." });
            }
            
            next();
        });

    } else {
        return res.status(401).json({ msg: "Não autorizado." });
    }
    
}