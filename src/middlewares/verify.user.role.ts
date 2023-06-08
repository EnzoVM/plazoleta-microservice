import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

  
export const verifyUserRole = (userRole: String) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const tokenFound = req.header('Authorization')?.replace('Bearer ', '')
    
        if(!tokenFound) {
            return res.status(401).json({
                message: 'Unauthorized access. A valid token is required'
            })
        }

        try {
            const decodedToken: {userId:string, userRole: string} = jwt.verify(tokenFound, process.env.PRIVATE_KEY_TOKEN)

            if(decodedToken.userRole !== userRole) {
                if(userRole === 'Client') {
                    return res.status(403).json({
                        message: 'Access denied. Client role is required'
                    })
                }
                if(userRole === 'Administrator'){
                    return res.status(403).json({
                        message: 'Access denied. Administrator role is required'
                    })
                }
                if(userRole === 'Employee'){
                    return res.status(403).json({
                        message: 'Access denied. Employee role is required'
                    })
                }
            }else if(userRole === 'Client' || userRole === 'Employee') {
                req.body.userId = decodedToken.userId
            }
           
            next()

        } catch (error) {
            
            return res.status(401).json({
                message: 'Invalid token'
            })
        }
    }
}