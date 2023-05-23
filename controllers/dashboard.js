import { PassengerModel } from "../model/Passengers.js";

export default async function (req, res) {
  let data = [];

  const params = {
    Sex: req.query.sex,
    Pclass: req.query.class,
    Age: req.query.age,
  }

  const asArray = Object.entries(params)
  const filtered = asArray.filter(([key, value]) => value);

  const passengers = await PassengerModel.find();

  // filtre sur la base des passagers vivant et mort 
  filtered.map((elemSearch) => {
    passengers = passengers.filter(elem => elem[elemSearch[0]] == elemSearch[1]);
  });

  const passengersAlive = passengers.filter(elem => elem.Survived === 1);
  const passengersDead = passengers.filter(elem => elem.Survived === 0);
  data.push(passengers.length - passengersAlive.length - passengersDead.length, passengersAlive.length, passengersDead.length);


  res.send({ data })

};
