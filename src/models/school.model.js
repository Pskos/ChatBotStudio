module.exports = mongoose => {
  const School = mongoose.model(
    "school",
    mongoose.Schema({
      lecturetitle: String,
      teacher: String,
      students: [String],
      room: String,
      sequenceNumber: String
    }, {
      timestamps: true
    })
  );

  return School;
};