var express = require('express');
var router = express.Router();
var cars = require('../db_cars')
let err;
router.get('/', function(req, res, next) {
  res.send(cars)
});

router.post('/', function (req,res, next) {
    if(typeof (req.body.model) !== "string"
      || typeof (req.body.mark) !== "string"
      || typeof (req.body.gearboxtype) !== "string") {
        err = new Error("Unprocessable Entity")
        err.status = 422;
        return next(err);
    }


    const id = cars[cars.length-1].id + 1
    const newCar = { ...req.body, id: id }
    cars.push(newCar);
    res.send(newCar);
});

router.get('/:id', function(req, res, next) {
    const result = cars.filter(user => user.id === Number(req.params.id))
    if(result.length === 0) {
        err = new Error("Not found");
        err.status = 404;
        return next(err);
    }
    res.send(result)
});

router.delete('/:id', function (req,res, next) {
    const item = cars.indexOf(cars.find(user => user.id === Number(req.params.id)))
    if(!cars[item]) {
        err = new Error("Not found");
        err.status = 404;
        return next(err);
    }
    cars.splice(item, 1)
    res.end();
});

router.put('/:id', function (req,res, next) {
    const item = cars.indexOf(cars.find(user => user.id === Number(req.params.id)))
    const id = cars[item].id
    if(typeof (req.body.model) !== "string"
        || typeof (req.body.mark) !== "string"
        || typeof (req.body.gearboxtype) !== "string") {
        err = new Error("Unprocessable Entity")
        err.status = 422;
        return next(err);
    }
    cars[item] = { ...req.body, id:id};
    res.send(cars[item]);
});
module.exports = router;

