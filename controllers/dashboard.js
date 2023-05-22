import { connect } from "../data/train.js";
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

  await connect();
  const passengers = await TrainModel.find();
  let searchData = passengers;

  filtered.map((elemSearch) => {
    searchData = searchData.filter(elem => elem[elemSearch[0]] == elemSearch[1]);
  });

  const searchDataAlive = searchData.filter(elem => elem.Survived === 1);
  const searchDataDead = searchData.filter(elem => elem.Survived === 0);
  data.push(passengers.length - searchDataAlive.length - searchDataDead.length, searchDataAlive.length, searchDataDead.length);

  res.render('dashboard', { aaa: data })
};
