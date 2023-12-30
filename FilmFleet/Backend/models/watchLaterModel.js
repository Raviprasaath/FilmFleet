const mongoose = require('mongoose');

const watchListSchema = new mongoose.Schema({
    detail: {
        type : mongoose.Schema.Types.Mixed,
        required: true,
        unique: true
    }
}, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model("MovieDeckWatchLists", watchListSchema)