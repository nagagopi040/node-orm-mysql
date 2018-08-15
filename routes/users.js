import { Router } from 'express'
import { User } from '../model/userModel'
import Sequelize from 'sequelize'
const router = Router()

router.get('/', (req, res, next) => {
    User.findAll().then( users => {
        res.json({ users: users })
    }).catch( err => {
        res.json({ error: err })
    });
});

router.post('/auth', (req, res, next) => {
    var credentials = req.body
    if(credentials.username != '' && credentials.password != '')
        User.findOne({ where: { username: credentials.username, password: credentials.password }}).then( user => {
            if(user)
                res.json({ access_token: user.access_token })
            else
                res.json({ serverError: 'Invalid username or password'})
        }).catch( err => {
            res.json({ serverError: err })
        })
    else {
        res.json({ serverError: 'username and password should not be empty'})
    }
})

router.get('/info', (req, res, next) => {
    var access_token = req.query.access_token ? req.query.access_token : ''
    var query = { where : { access_token : access_token } }
    User.findOne(query).then(user => {
        if(user)
            res.json({ userInfo: user })
        else
            res.json({ serverError : "User doesn't exist" })
    }).catch(Sequelize.ValidationError, err => {
        res.json({validationerror : Sequelize.ValidationError, serverError : err })
    });
})

router.post('/newUser', (req, res, next) => {
    var newUser = req.body
    User.sync().then( () => {
        User.findOne({ where: { email : newUser.email }}).then( user => {
            if( !user || Object.keys(user).length === 0 ){
                User.create(newUser).then( data => {
                    res.json({ updatedInfo : data.dataValues, message : "user succesfully added" })
                }).catch(Sequelize.ValidationError, err => {
                    res.json({validationerror: Sequelize.ValidationError, serverError: err })
                });
            } else {
                res.json({ serverError: "User already exists"})
            }
        }).catch( Sequelize.ValidationError, err => {
            res.json({validationerror: Sequelize.ValidationError, serverError: err })
        });
    })
})

router.post('/update', (req, res, next) => {
    
})

module.exports = router;