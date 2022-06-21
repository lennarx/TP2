import { Router } from 'express'

import {
    postLoginController,
    postRegisterController
} from '../controller/loginController.js'

const routerLogin = new Router()

routerLogin.post('/',postLoginController)
routerLogin.post('/register',postRegisterController)

export { routerLogin }                                  
