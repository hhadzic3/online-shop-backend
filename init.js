const db = require('./db/db');

function initialize() {
	db.sequelize.sync({ force: true }).then(function () {
	    dataInit().then(() => {
	        console.log("Tables created and inserted!");
	    });
	});
}

function dataInit() {
    const usersPromiseList = [
        db.users.create({id: 1, email: "Hhamo@gmail.com",password: "Hhamo",full_name: "Hamo Hamic", billing_address: 'Bakije sokak 33', shipping_address: 'Titova 99' , country: 'BiH' , phone: '033-123-123'}),
        db.users.create({id: 2, email: "ahsdasd@gmail.com",password: "sdhfsdfs",full_name: "Hamo Hamic",
        billing_address: 'Bakije sokak 33', shipping_address: 'Titova 99' , country: 'BiH' , phone: '033-123-123'})
    ];
    const productsPromiseList = [
        db.products.create({id: 1,seller_id:1 ,name: 'Majica NIKE', price: 59 , weight: 1 , description: 'blaaa blaaa' , stock: 4}),
        db.products.create({id: 2,seller_id:2 ,name: 'Iphone 11', price: 59 , weight: 1 , description: 'blaaa blaaa', stock: 4 })
    ];
    const ordersPromiseList = [
        db.orders.create({id: 1,customer_id:1,ammount:59,shipping_address: 'Titova 99',order_address: 'Bakije sokak 33', order_email: "Hhamo@gmail.com",order_date: "28.04.2020",  order_status: 'ordered' , payment_method:'handover'})
    ];
    
    const product_imagesPromiseList = [
        db.product_images.create({id: 1,product_id:1,image:'/images/1.png'})
    ];
    
    const categoriesPromiseListe = [
        db.categories.create({id:1 , name: 'male' , description: 'blaa'}),
        db.categories.create({id:2 , name: 'fimale' , description: 'blaa'}),
        db.categories.create({id:3 , name: 'clothe' , description: 'blaa'}),
        db.categories.create({id:4 , name: 'tech' , description: 'blaa'})
    ];
    
    const order_detailsPromiseList = [
        db.order_details.create({id: 1, order_id:1 , product_id: 1 , price: 59 , quantity: 5 })
    ];
    const product_categoriesPromiseList = [
        db.product_categories.create({id: 1,product_id:1,category_id:1})
    ];
    
    return new Promise((resolve, reject) => {
        Promise.all(usersPromiseList)
        .then(() => Promise.all(categoriesPromiseListe).then(all => resolve(all))) 
        .then(() => Promise.all(productsPromiseList).then(all => resolve(all)))
        .then(() => Promise.all(ordersPromiseList).then(all => resolve(all)))
        .then(() => Promise.all(product_categoriesPromiseList).then(all => resolve(all)))
        .then(() => Promise.all(product_imagesPromiseList).then(all => resolve(all)))
        .then(() => Promise.all(order_detailsPromiseList).then(all => resolve(all)))
        .catch(reason => reject(reason));
    });
}

exports.initialize = initialize;