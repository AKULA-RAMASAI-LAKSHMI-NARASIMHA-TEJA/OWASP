export default function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Missing Authorization Header' });
  }
  next();
}