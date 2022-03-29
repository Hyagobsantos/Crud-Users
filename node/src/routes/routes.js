const {createUser,getAllUsers,getOneUser,routeWelcome,updateUser,deleteAllUsers,deletUser} = require('../controller/users');

const {Router} = require('express');
const router = Router();

router.get('/welcome', routeWelcome)
router.get('/api/v1/users',getAllUsers)
router.get('/api/v1/users/:user_id',getOneUser)
router.post('/api/v1/user',createUser)
router.put('/api/v1/users/:user_id',updateUser)
router.delete('/api/v1/users',deleteAllUsers)
router.delete('/api/v1/users/:user_id',deletUser)


module.exports = router;