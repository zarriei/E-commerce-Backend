const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll();
    res.status(200).json(allTags);
    console.log(allTags);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const findTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tag_id' }],
    });
    res.status(200).json(findTag);
    console.log(findTag);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    if (!newTag){
      res.status(404).json({ message: "Cannot Create."});
      return;
    }
    res.status(200).json(newTag);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where:{ id: req.params.id }
    });
    if (!updateTag) {
      res.status(404).json({ message: "Cannot Update."});
      return;
    }
    res.status(200).json(updateTag);
  }catch (err) {
    res.status(500).json(err);
  }
  
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!deleteTag) {
      res.status(404).json({ message: "Cannot Delete."});
      return;
    }
    res.status(200).json(deleteTag);
  }catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;