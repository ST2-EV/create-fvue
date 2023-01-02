import { fUser } from '../odm/fCollection'
import { REQUIRED } from '../odm/helpers'


export const Users = new fUser({
    "___name" : "Users", // Don't delete this
    "email" : ["String", REQUIRED], // Don't delete this
})