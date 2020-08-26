const db = require('./db/db');

function initialize() {
	db.sequelize.sync({ force: true }).then(function () {
	    dataInit().then(() => {
	        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
	    });
	});
}

function dataInit() {
    /*const partsPromiseList = [
        db.parts.create({id: 1, name: 'Kocnice', availability: "DOSTUPAN"}),
        db.parts.create({id: 2, name: 'Blatobrani', availability: "DOSTUPAN"}),
        db.parts.create({id: 3, name: 'Hauba', availability: "DOSTUPAN"})
    ];*/
    const usersPromiseList = [
        db.users.create({email: "Hhamo@gmail.com",password: "Hhamo",full_name: "Hamo Hamic"}),
        db.users.create({email: "ahsdasd@gmail.com",password: "sdhfsdfs",full_name: "Hamo Hamic"})
    ];
    

    return new Promise((resolve, reject) => {
        Promise.all(usersPromiseList)
            /*.then(() => Promise.all(technical_reviewsPromiseList).then(all => resolve(all))) 
            .then(() => Promise.all(partsPromiseList).then(all => resolve(all)))
            .then(() => Promise.all(vehiclesPromiseList).then(all => resolve(all)))
            .then(() => Promise.all(failuresPromiseList).then(all => resolve(all)))*/
            .catch(reason => reject(reason));
    });
}

exports.initialize = initialize;