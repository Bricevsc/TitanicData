import { PassengerModel } from "../model/Passengers.js";

export default async function (req, res) {

  const { sex, pclass, age } = req.body

  const passengers = await PassengerModel.find();


  const survivedPassengers = await PassengerModel.count()
  const deadPassengers = await PassengerModel.count()


  res.send({ survivedPassengers, deadPassengers })

};
