import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token

        const decodedData = jwt.verify(token, 'secretkey')
        req.userId = decodedData?.id
        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth