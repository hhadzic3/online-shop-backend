var express = require('express');
var router = express.Router();
const db = require('../db/db');

router.get('/', (req, res) => db.product_images.findAll().then(product_images => res.json(product_images)));

router.get('/:id', (req, res) => db.product_images.findOne({
    where: {   id: req.params.id }}).then( data => { res.send(data) })   
);

// DELETE
router.delete('/:id' , (req, res) => db.product_images.destroy({
    where: {   id: req.params.id     }
 }).then( () => { res.json({ status : 'Deleted!'}) })  
);




module.exports = router;