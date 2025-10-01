
const app = require('./app.js')
const PORT = process.env.PORT || 3000;


app.get('/api', (req, res) => {
  res.json({message: "API is running v1"})
})

app.listen(PORT, () => {
   console.log(`🚀 Server is running at http://localhost:${PORT}`);
})
