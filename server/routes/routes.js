import express from 'express'
import { signup, signin, clearcookies } from '../controller/register.js'
import { postprose, getprose, updateprose, deleteprose } from '../controller/crud.js'
import likestory  from '../controller/like.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('hello world!')
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
router.post('/postprose', auth, postprose)
router.patch('/:postId/updateprose', auth, updateprose)
router.delete('/:postId/:type/deleteprose', auth, deleteprose)
router.get('/:type/getprose', auth, getprose)
router.get('/:isAuth/:type/gethallprose', auth, getprose)
router.patch('/:postId/likestory', auth, likestory)


export default router
