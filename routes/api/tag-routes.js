const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [{model: Product, through: ProductTag}]
    })
    res.status(200).json(tagsData);

  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {

    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag}]
    })
    if (!tagsData) {
      res.status(400).json({message: 'Tag not found'})
      return;
    }
    res.status(200).json(tagsData)
    
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {

    const tagsData = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name
    }); 
    res.status(200).json(tagsData);

  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagsData = await Tag.update(
      {tag_name: req.body.tag_name},
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.status(200).json(tagsData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deletedTag)

  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;