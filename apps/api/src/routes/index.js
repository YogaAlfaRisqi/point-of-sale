const route = require('express').Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

route.get('/', (req, res) => {
  res.json({ message: "API Docs Detail" });
});

route.use('/users', userRoutes);
route.use ('/auth',authRoutes)

module.exports = route;