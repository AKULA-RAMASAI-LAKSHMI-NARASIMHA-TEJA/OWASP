export default function (req, res, next) {
  const role = req.headers['x-role'] || 'guest';

  if (req.path.startsWith('/admin') && role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admins only' });
  }

  next();
}