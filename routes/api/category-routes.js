const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', (req, res) => {
  
  try {
    const categoriesData = Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  
  try {
    const singleCategoryData = Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!singleCategoryData) {
      res.status(404).json({ message: 'No Category was found with that id!' });
      return;
    }
    res.status(200).json(singleCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  
  Category.update(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  
  try {
    const singleCategoryData = Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!singleCategoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(singleCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;