import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log(token);

  if (!token)
    return res
      .status(401)
      .send({ auth: false, error: 'Not authorized, check token' });
  try {
    const payload = jwt.verify(token, process.env.PRIVATE_KEY);
    console.log(payload);

    if (!payload)
      return res
        .status(401)
        .send({ ok: false, msg: 'Not authorized, check token' });

    req.user = payload; //{id}

    next();
  } catch (err) {
    res.status(500).send({ ok: false, msg: 'Please try again later' });
  }
};