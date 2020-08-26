const db = require('./db/db');

function initialize() {
	db.sequelize.sync({ force: true }).then(function () {
	    dataInit().then(() => {
	        console.log("Tables created and inserted!");
	    });
	});
}

function dataInit() {
    const productsPromiseList = [
        db.parts.create({id: 1,seller_id:1 ,name: 'Majica NIKE', price: 59 , weight: 1 , description: 'blaaa blaaa', category:'clothes' , stock: 4}),
        db.parts.create({id: 2,seller_id:1 ,name: 'Iphone 11', price: 59 , weight: 1 , description: 'blaaa blaaa', category:'clothes' , stock: 4 })
    ];
    const usersPromiseList = [
        db.users.create({id: 1, email: "Hhamo@gmail.com",password: "Hhamo",full_name: "Hamo Hamic", billing_address: 'Bakije sokak 33', shipping_address: 'Titova 99' , country: 'BiH' , phone: '033-123-123'}),
        db.users.create({id: 2, email: "ahsdasd@gmail.com",password: "sdhfsdfs",full_name: "Hamo Hamic",
        billing_address: 'Bakije sokak 33', shipping_address: 'Titova 99' , country: 'BiH' , phone: '033-123-123'})
    ];
    const ordersPromiseList = [
        db.orders.create({id: 1, email: "Hhamo@gmail.com",password: "Hhamo",full_name: "Hamo Hamic", billing_address: 'Bakije sokak 33', shipping_address: 'Titova 99' , country: 'BiH' , phone: '033-123-123'}),
    ];
    const orders_detailsPromiseList = [
        db.orders.create({id: 1, email: "Hhamo@gmail.com",password: "Hhamo",full_name: "Hamo Hamic", billing_address: 'Bakije sokak 33', shipping_address: 'Titova 99' , country: 'BiH' , phone: '033-123-123'}),
    ];
    
    const orders_detailsPromiseList = [
        db.orders.create({id: 1, email: "Hhamo@gmail.com",password: "Hhamo",full_name: "Hamo Hamic", billing_address: 'Bakije sokak 33', shipping_address: 'Titova 99' , country: 'BiH' , phone: '033-123-123'}),
    ];

    const categoriesPromiseListe = [
        db.categories.create({id:1 , name: 'male' , description: 'blaa'}),
        db.categories.create({id:2 , name: 'fimale' , description: 'blaa'}),
        db.categories.create({id:3 , name: 'clothe' , description: 'blaa'}),
        db.categories.create({id:4 , name: 'tech' , description: 'blaa'})
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