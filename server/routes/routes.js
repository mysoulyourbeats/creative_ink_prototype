import express from 'express'
import { signup, signin, clearcookies } from '../controller/register.js'
import { postprose, getprose, updateprose, deleteprose } from '../controller/crud.js'
// import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send(req.body)
})

// ================
//      REGISTER
// ================
router.post('/signup', signup)
router.post('/signin', signin)
router.get('/clearcookies', clearcookies)

// ================
//      CRUD
// ================
router.post('/postprose', postprose)
router.patch('/:id/updateprose', updateprose)
router.delete('/:id/deleteprose', deleteprose)
router.get('/:id/:type/getprose', getprose)


export default router
