const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    instructions:{
        type:String,
        required:false,
    },
    owner:{
        // type is objectId
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    ingredients:[{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
    }]
})

const Recipe = mongoose.model("Recipe", recipeSchema)

module.exports = Recipe;