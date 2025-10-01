
const app = require('./app.js')
const config = require('../config/config')


app.get('/api', (req, res) => {
  res.json({message: "API is running v1"})
})

app.listen(config.app.port, () => {
  console.log(`🚀 Server running at http://localhost:${config.app.port} in ${config.app.env} mode`);
});