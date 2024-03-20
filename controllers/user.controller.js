const User = require('../models/user.model');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found', login:false  });
        }
        if (user.password !== password) {
            return res.status(401).json({ status: 'error', message: 'Incorrect password', login:false  });
        }
        return res.status(200).json({ status: 'success', message: 'Login successful', login:true });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ status: 'error', message: 'Internal server error', login:false });
    }
}




