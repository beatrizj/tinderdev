const Dev = require('../models/Dev')

module.exports = {
    async store(req, res) {

        const { user } = req.headers
        const { devId } = req.params //req.params é o parâmetro que vem pela rota

        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev does not exist' })
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('Deu match!')
        }

        loggedDev.likes.push(targetDev._id)

        await loggedDev.save()

        return res.json(loggedDev)
    }
}