import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {

    try {
        if(req.params?.type === 'hall'){
            next()
        } else {
            const token = req.cookies['token']
            console.log('token is', token)

            const decoded = jwt.verify(token, 'secretkey') 
            req.userId = decoded.id    
            next()    
        }

    } catch (error) {
        console.log(error)
        res.status(401).send('You arent authenticated bitch')
    }
}

export default auth