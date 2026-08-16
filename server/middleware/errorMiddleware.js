function notFound(req, res) {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} was not found.` });
}

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(err);
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid resource ID.' });
  if (err.code === 11000) return res.status(409).json({ message: 'An account with this email already exists.' });
  if (err.name === 'ValidationError') return res.status(400).json({ message: Object.values(err.errors).map((error) => error.message).join(' ') });
  res.status(err.statusCode || 500).json({ message: process.env.NODE_ENV === 'production' ? 'Something went wrong.' : err.message || 'Server error.' });
}

module.exports = { notFound, errorHandler };
