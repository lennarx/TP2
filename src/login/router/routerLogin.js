import { Router } from 'express'
import {
    postLoginController,
    postRegisterController
} from '../midddleware.js'

const routerLogin = new Router()

routerLogin.post('/:login',postLoginController)
routerLogin.post('/:register',postRegisterController)

export { routerLogin }                                  
