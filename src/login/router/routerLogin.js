import { Router } from 'express'

import {
    postLoginController,
    postRegisterController
} from '../controller/loginController'

const routerLogin = new Router()

routerLogin.post('/:login',postLoginController)
routerLogin.post('/:register',postRegisterController)

export { routerLogin }                                  
