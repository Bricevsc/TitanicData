import mongoose from 'mongoose'
const { Schema, model } = mongoose

const PassengerSchema = new Schema({
  PassengerId: Number,
  Survived: Number,
  Pclass: Number,
  Name: String,
  Sex: String,
  Age: Number,
  SibSp: Number,
  Parch: Number,
  Ticket: Number,
  Fare: Number,
  Cabin: String,
  Embarked: Number,
})

export const PassengerModel = model('passengers', PassengerSchema)
