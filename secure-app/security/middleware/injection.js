export default function (req, res, next) {
  const patterns = [/['"`;$]/, /--/, /\b(OR|AND)\b/i];

  const hasInjection = (val) => {
    if (typeof val === 'string') {
      return patterns.some(p => p.test(val));
    }
    if (typeof val === 'object' && val !== null) {
      return Object.values(val).some(hasInjection);
    }
    return false;
  };

  if (hasInjection(req.body) || hasInjection(req.query) || hasInjection(req.params)) {
    return res.status(400).json({ error: 'Potential injection detected' });
  }

  next();
}