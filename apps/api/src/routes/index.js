const route = require('express').Router();
const userRoutes = require('./userRoutes');

route.get('/', (req, res) => {
  res.json({ message: "API is running" });
});

route.use('/users', userRoutes);

module.exports = route;