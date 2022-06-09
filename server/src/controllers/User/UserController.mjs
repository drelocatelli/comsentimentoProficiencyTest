import express from "express";
import { PrismaClient } from '@prisma/client'
import CheckField from "../../Utils/Validation.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ProtectedRoute from "../../Middlewares/AuthMiddleware.js";
import { hiddenPassword } from "../../Utils/hiddenPassword.js";

const router = express.Router();
const prisma = new PrismaClient();

const JWTSecret = process.env.JWTSecret;

router.use((req, res, next) => {
    next();
});

router.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    try {
        if (CheckField(name) && CheckField(email) && CheckField(password)) {
            // check if email already exists
            const findEmail = await prisma.user.count({
                where: { email }
            });

            if (findEmail > 0) {
                return res.status(422).json({ msg: "Email já cadastrado." });
            }

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: bcrypt.hashSync(password, 10)
                }
            });

            return res.status(201).json({ msg: "O usuário foi registrado com sucesso.", user });
        } else {
            return res.status(422).json({ msg: "Dados não podem ser nulos." });
        }

    } catch (err) {
        return res.status(422).json({ msg: "Não foi possível registrar usuário.", err: err })
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (CheckField(email) && CheckField(password)) {

            //* check if user exists
            const account = await prisma.user.findUnique({
                where: { email }
            });

            // check passwords match
            if (account != null && bcrypt.compareSync(password, account.password)) {

                let accountDetails = account;
                delete accountDetails.password;
                
                const token = jwt.sign(accountDetails, JWTSecret);
                accountDetails = {
                    ...accountDetails,
                    token
                }
                
                return res.status(200).json({ msg: "Login realizado com sucesso.", user: accountDetails });
            }

            return res.status(422).json({ msg: "E-mail ou senha não correspondem." });

        } else {
            return res.status(422).json({ msg: "Preencha todos os campos." });
        }

    } catch (err) {
        return res.status(422).json({ msg: "Não foi possível fazer login.", err });
    }
});

router.get('/revalidate', ProtectedRoute, async(req, res) => {

    try {
        //* get user by token
        const request = await prisma.user.findFirst({
            where: {
                id: req.userLoggedIn.id
            }
        });

        const {userLoggedIn} = req;

        return res.status(200).json({ msg: "Usuário autenticado com sucesso.", user: userLoggedIn });

    } catch(err) {
        res.status(401).json({msg: 'Não foi possível fazer login', err});
    }
    
});

//* set user as admin
router.post('/permissions', ProtectedRoute, async(req, res) => {
    try {
        const { userId, status } = req.body;

        const user = await prisma.user.update({
            where: {
                id: Number(userId),
            },
            data: {
                status
            }
        });

        res.status(201).json({msg: 'Permissões alteradas com sucesso.', user});
        
    } catch(err) {
        res.status(401).json({msg: 'Não foi possível mudar permissão', err});
    }
});

router.get('/all/:status?', ProtectedRoute, async(req, res) => {
    
    try {
        const { status } = req.params;
        const find = await prisma.user.findMany({
            where: {
                id: {
                    not: {
                        equals: req.userLoggedIn.id
                    }
                }
            }
        });   
        const users = hiddenPassword(find);

        switch(status) {
            case 'active':
                return res.status(200).json({users: users.filter(user => user.status === 'ACTIVE')});
            break;
            case 'inactive':
                return res.status(200).json({users: users.filter(user => user.status === 'INACTIVE')});
            default:
                return res.status(200).json({users});
        }

    } catch(err) {
        res.status(401).json({msg: 'Não foi possível buscar usuários', err});
    }
});



export default router;