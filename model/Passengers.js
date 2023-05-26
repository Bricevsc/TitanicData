import mongoose from 'mongoose'
const { Schema, model } = mongoose

const PassengerSchema = new Schema({
  PassengerId: String,
  Survived: String,
  Pclass: String,
  Name: String,
  Sex: String,
  Age: String,
  SibSp: String,
  Farch: String,
  Ticket: String,
  Fare: String,
  Cabin: String,
  Embarked: String,
})

export const PassengerModel = model('passengers', PassengerSchema)
