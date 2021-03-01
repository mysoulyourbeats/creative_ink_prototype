import express from 'express'
import { signup, signin, clearcookies, postprose, getprose } from '../controller/user.js'
// import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('pls pls send bobs')
})


router.post('/signup', signup)
router.post('/signin', signin)
router.get('/clearcookies', clearcookies)
router.post('/postprose', postprose)
router.get('/getprose', getprose)
export default router
