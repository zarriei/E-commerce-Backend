const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    if (!categories) {
      res.status(404).json({ message: "No categories found." })
    }
    res.status(200).json(categories);
    console.log("All categories: ", categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const thisCategory = await Category.findByPk(req.params.id, {
      include: [Product],
      // where: { id: req.params.id }
      // tried using just model: Product as well and nothing worked 
    });
    if (!thisCategory) {
      res.status(404).json(thisCategory);
    }
    res.status(200).json(thisCategory);
    console.log("Is this what you are looking for?", thisCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
    console.log(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updateCategory) {
      res.status(404).json({ message: "Cannot Update." });
    }
    res.status(200).json(updateCategory);
    console.log(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!deleteCategory) {
      res.status(404).json({ message: "Cannot Delete" });
      return;
    }
    res.status(200).json(deleteCategory);
    console.log("Deleteing: ", deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;