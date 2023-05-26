import { PassengerModel } from "../model/Passengers.js";

export default async function (req, res) {

  const { sex, pclass, age } = req.body
  const query = sex === 'tous' ?
    {
      Pclass: pclass,
      Age: age,
    } :
    {
      Sex: sex,
      Pclass: pclass,
      Age: age
    }

  console.log('query', query);

  const survivedPassengers = await PassengerModel.countDocuments({ ...query, Survived: '1' })
  const deadPassengers = await PassengerModel.countDocuments({ ...query, Survived: '0' })

  res.send({ survivedPassengers, deadPassengers })

};
