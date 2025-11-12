const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

//initalize admin from env variables
const initializeAdmin = async () => {
    try {
        if(!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
            console.warn('Admin credentials not found in the env variables')
            return;
        }
        const exsistingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL })

        if(!exsistingAdmin) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

            const admin = new Admin({
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword
            })

            await admin.save();
            console.log('Admin User created Successfully');
        } else {
            console.log('Admin user already exsists');
        }
    } catch(error) {
        console.error('Error initializing admin:', error.message)
    }
}

const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            res.status(400).json({ message: 'Please Provide email and password'});
        }

        const admin = await Admin.findOne({ email })
        if(!admin) {
            return res.status(400).json({ message: 'Invalid credentials '});
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials'});
        }

        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        )

        res.json({
            success: true,
            token,
            admin: {
                id: admin._id,
                email: admin.email
            }
        })
    } catch(error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'server error during login'
        })
    }
}

const getCurrentAdmin = async (req, res) => {
    try {
        res.json({
            success: true,
            admin: {
                id: req.admin._id,
                email: req.admin.email
            }
        })
    } catch(error) {
        console.error('Get admin error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

module.exports = {
    initializeAdmin,
    loginAdmin,
    getCurrentAdmin
}