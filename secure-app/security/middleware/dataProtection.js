export default function (req, res, next) {
  res.removeHeader('X-Powered-By');
  next();
}