// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe-model.js');

// router logic will go here - will be built later on in the lab




router.get("/", async(req,res)=>{
    try {
        const recipe = await Recipe.find().populate('owner')
        
        res.render('recipes/index.ejs',{recipe:recipe})

    } catch (error) {
        console.log('error')
    }
})

router.get('/new', (req,res)=>{
    res.render('recipes/new.ejs')
})


router.post('/', async (req, res) => {
    try {

      const newRecipe = new Recipe(req.body);
      newRecipe.owner = req.session.user._id;
      await newRecipe.save();
      res.redirect('/recipes')
    } catch (error) {
      // Handle errors
      console.log('error')
    }
  });

  router.get('/:recipeId', async(req,res)=>{
    try {
      const foundRecipe = await Recipe.findById(req.params.recipeId).populate('owner')

      res.render('recipes/show.ejs', {recipe:foundRecipe})
    } catch (error) {
      console.log('error')
    }
  })

  router.delete('/:recipeId', async (req,res)=>{
    try {
      const recipe = await Recipe.findByIdAndDelete(req.params.recipeId)
      res.redirect('/recipes')
    } catch (error) {
      console.log('error')
      
    }
  })

  router.get('/:recipeId/edit', async (req,res)=>{

    const recipe = await Recipe.findById(req.params.recipeId)

    res.render('recipes/edit.ejs', {recipe:recipe})
  })

  router.put('/:recipeId', async (req,res)=>{

    const recipe = await Recipe.findById(req.params.recipeId)

    recipe.set(req.body)

    recipe.save()

    res.redirect('/recipes')

    

    

  })
module.exports = router