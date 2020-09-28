var express = require('express');
var router = express.Router();
const db = require('../db/db');

router.get('/', (req, res) => {
    db.categories.findAll().then( 
        categories => 
            res.json(categories)
    )
});

router.get('/:id', (req, res) => {
    db.categories.findOne({
        where: { id: req.params.id }
    }).then( data => { 
        res.send(data)
    })   
});

// DELETE
router.delete('/:id' , (req, res) => {
    db.categories.destroy({
    where: { id: req.params.id }
    }).then( () => {
        res.json({ status : 'Deleted!'}) 
    })  
});

// POST
router.post('/' , function(req, res)  {
    if ( !req.body.name)
        res.json({ error: 'Bad Data'})
    db.categories.create(req.body).then( data => { res.send(data) })
    .catch( err => {
        console.log(err); 
        res.send(err)
    })
});

module.exports = router;
