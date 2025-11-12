const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MONGODB atlas connected: ${conn.connection.host}`);
    } catch(error) {
        console.error('Database connection error:', error);
        process.exit(1)
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('MONGODB disconnected')
})

mongoose.connection.on('error', (error) => {
    console.error('Mongo connection error', err);
})

module.exports = connectDB;