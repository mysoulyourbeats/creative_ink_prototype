import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        // console.log(req)
        res.send('gosh')
        // const token = req.cookies['token']
        // console.log('token is', token)
        // const decodedData = jwt.verify(token, 'secretkey')
        // req.userId = decodedData?.id
        // next()
    } catch (error) {
        console.log(error)
    }
}

export default auth