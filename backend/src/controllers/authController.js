const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

function generateToken(user) {
    return jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

module.exports = {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            const existing = await User.findOne({ where: { email } });
            if (existing) return res.status(409).json({ error: 'Email já está em uso.' });

            const user = await User.create({ name, email, password });

            return res.status(201).json({
                user: { id: user.id, name: user.name, email: user.email },
                token: generateToken(user)
            });
        } catch (err) {
            return res.status(500).json({ error: 'Erro no registro.' });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user || !(await user.checkPassword(password))) {
                return res.status(401).json({ error: 'Credenciais inválidas.' });
            }

            return res.json({
                user: { id: user.id, name: user.name, email: user.email },
                token: generateToken(user)
            });
        } catch (err) {
            return res.status(500).json({ error: 'Erro no login.' });
        }
    }
};
