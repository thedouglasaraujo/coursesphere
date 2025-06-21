const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/courses', require('./routes/courses'));
app.use('/lessons', require('./routes/lessons'));

app.get('/', (req, res) => res.send('API CourseSphere ativa!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await sequelize.authenticate();
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});