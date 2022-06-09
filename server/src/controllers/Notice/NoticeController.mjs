import express  from "express";
import ProtectedRoute from "../../Middlewares/AuthMiddleware.js";
import { PrismaClient } from '@prisma/client'
import CheckField from "../../Utils/Validation.mjs";


const router = express.Router();
const prisma = new PrismaClient();

router.use((req, res, next) => {
    next();
});

router.post('/new', ProtectedRoute, async(req, res) => {
    const {title, date, description, file, status} = req.body;

    try {
        const isNotEmpty = CheckField(title) && CheckField(date) && CheckField(description) && CheckField(file) && CheckField(status);

        if(isNotEmpty) {
            const notice = await prisma.notice.create({
                data: {
                    title,
                    date,
                    description,
                    file,
                    status,
                    userId: Number(req.userLoggedIn.id)
                }
            });

            return res.json({msg: 'Todos os editais', notice});

        } else {
            throw 'Campos não podem ser nulos';
        }
    } catch(err) {
        res.json({msg: 'Não foi possível criar edital.', err});
    }

});

router.get('/my', ProtectedRoute, async(req, res) => {
    try {

        const noticeByUser = await prisma.notice.findMany({
            where: {
                userId: Number(req.userLoggedIn.id)
            },
            include: {
                user: true
            }
        });

        res.status(200).json(noticeByUser);

    } catch(err) {
        res.status(404).json({msg: 'Não foi possívei trazer os editais', err});
    }
});

//! protected notic
router.get('/all', ProtectedRoute, async(req, res) => {
    
    try {

        const notice = await prisma.notice.findMany({
            
            include: {
                user: true
            }
        });
        
        res.status(200).json(notice);
        
    } catch(err) {
        res.status(404).json({msg: 'Não foi possívei trazer os editais.', err});
    }

});

export default router;