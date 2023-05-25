

export default async function (req, res) {

  if (req.session.auth === true) {
    return res.status(200).send({ auth: true });
  }
  res.status(400).send({ auth: false });
}