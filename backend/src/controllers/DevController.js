const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
    async index(req, res) {
        const { user } = req.headers

        const loggedDev = await Dev.findById(user)

        const users = await Dev.find({
            $and: [      //passar por todos os filtros
                { _id: { $ne: user } },   //ne = not equal (verificar se não é o usuário que está logado)
                { _id: { $nin: loggedDev.likes } },     //nin = not in (verifica se o usuário está na lista ou não)
                { _id: { $nin: loggedDev.dislikes } }
            ]
        })

        return res.json(users)
    },

    async store(req, res) {
        const { username } = req.body

        const userExists = await Dev.findOne({ user: username })

        if (userExists) {
            return res.json(userExists)
        }

        const response = await axios.get(`https://api.github.com/users/${username}`)

        const { name, bio, avatar_url: avatar } = response.data

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev)
    }
}