/**
 * Created by tex on 15/07/2017.
 *
 * Define the mongoDB schema for use with mongoose.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DrawingSchema = new Schema({
    filename: {
        type: String,
        index: true,
        unique: true
    },
    canvasJSON: JSON
});

module.exports = mongoose.model('Drawing', DrawingSchema);