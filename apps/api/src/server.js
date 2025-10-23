
const errorHandler = require("./middleware/errorHandler")
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const prisma = require('./config/database');
const cookieParser = require(`cookie-parser`);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await prisma.$connect;
    console.log(`✅ Database connected`);
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.use(errorHandler)