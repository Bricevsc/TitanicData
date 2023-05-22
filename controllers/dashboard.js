import { TrainModel } from "../model/Train.js";

export default async function (req, res) {
  let data = [];

  const params = {
    Sex: req.query.sex,
    Pclass: req.query.class,
    Age: req.query.age,
  }

  const asArray = Object.entries(params)
  const filtered = asArray.filter(([key, value]) => value);

  const passengers = await TrainModel.find();
  let searchData = passengers;

  // filtre sur la base des passagers vivant et mort 
  filtered.map((elemSearch) => {
    searchData = searchData.filter(elem => elem[elemSearch[0]] == elemSearch[1]);
  });

  const passengersAlive = searchData.filter(elem => elem.Survived === 1);
  const passengersDead = searchData.filter(elem => elem.Survived === 0);
  data.push(passengers.length - passengersAlive.length - passengersDead.length, passengersAlive.length, passengersDead.length);

  console.log({searchData})
  res.send({data})

  // res.render('dashboard', { aaa: data })
};
