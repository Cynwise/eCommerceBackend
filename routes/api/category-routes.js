const router = require('express').Router();
const { Category, Product } = require('../../models');

// get all categories
router.get('/', async(req, res) => {
  try{
    const categoryData = await Category.findAll({ include: [{model: Product}] });
    res.json(categoryData);
  }catch(err){
    res.status(500).json(err);
  };

});

// get category by id
router.get('/:id', async(req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });

    if(!categoryData) {
      res.status(404).json({message: 'Id not found'});
      return;
    };

    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  };
});

// add category
router.post('/', async (req, res) => {
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch(err){
    res.status(400).json(err);
  }
});

// update category by id
router.put('/:id', async (req, res) => {
  try{
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if(!categoryData) {
      res.status(404).json({message: 'Id not found.'});
      return;
    };

    res.status(200).json(categoryData);
  }catch(err){
    res.status(400).json(err);
  }
});

// delete category by id
router.delete('/:id', async (req, res) => {
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(!categoryData){
      res.status(404).json({message: 'Id not found.'});
      return;
    }
    res.status(404).json({categoryData});
  }catch(err){
    res.json(err);
  }
});

module.exports = router;
