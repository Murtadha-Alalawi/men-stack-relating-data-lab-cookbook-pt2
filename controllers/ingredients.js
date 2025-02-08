const express = require('express');
const Recipe = require('../models/recipe-model')
const Ingredient = require('../models/ingredient-model');
const router = express.Router();

router.post('/', async(req,res)=>{

    try {

        const {name} = req.body

        const ingredient = new Ingredient({name});
        await ingredient.save()

        res.redirect('/recipes')
      } catch (error) {
        
        console.log('error')
      }
    

    
})


module.exports = router;