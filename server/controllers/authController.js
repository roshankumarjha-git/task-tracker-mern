const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, createdAt: user.createdAt });

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required.' });
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: 'Enter a valid email address.' });
    if (password.length < 8) return res.status(400).json({ message: 'Password must have at least 8 characters.' });
    if (await User.exists({ email: email.toLowerCase() })) return res.status(409).json({ message: 'An account with this email already exists.' });
    const user = await User.create({ name, email, password });
    res.status(201).json({ user: publicUser(user), token: generateToken(user._id) });
  } catch (error) { next(error); }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Incorrect email or password.' });
    res.json({ user: publicUser(user), token: generateToken(user._id) });
  } catch (error) { next(error); }
}

async function getMe(req, res) { res.json({ user: publicUser(req.user) }); }
module.exports = { register, login, getMe };
