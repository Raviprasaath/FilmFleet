const mongoose = require("mongoose");
const watchListModel = require("../models/watchLaterModel");

const gettingWatchList = async (req, res) => {
    try {
        const allMovies = await watchListModel.find({});
        res.status(200).json(allMovies);
      } catch (e) {
        res.status(400).json({ error: e.message })
      }
}
const addingToWatchList = async (req, res) => {
  const { detail } = req.body;
  console.log('detail', detail);
  try {
    const watchList = await watchListModel.create({detail});
    res.status(200).json(watchList);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

const deletingFromWatchList = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "Task Not Found"});
  }
  try {
    const taskDelete = await watchListModel.findByIdAndDelete(id)
    res.status(200).json(taskDelete)
  } catch (e) {
    res.status(400).json({errors: e.message})
  }
};

module.exports = { gettingWatchList, addingToWatchList, deletingFromWatchList };