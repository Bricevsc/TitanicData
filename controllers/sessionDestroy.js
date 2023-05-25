export default function sessionDestroy(req, res) {
  if (req?.session.auth) {
    return req.session.destroy((err) => {
      res.status(200).send({ error: "You have been unlogged" });
    })
  }
  res.status(500).send({ error: "user is already logged out" })
}