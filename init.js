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
        db.products.create({id: 1,seller_id:1 ,name: 'Shirt NIKE', price: 49 , weight: 1 , description: 'blaaa blaaa',label:"classic" , stock: 4}),
        db.products.create({id: 2,seller_id:2 ,name: 'Iphone 11', price: 1009 , weight: 1 , description: 'blaaa blaaa',label:"classic", stock: 4 }),
        db.products.create({id: 3,seller_id:2 ,name: 'HP laptop Probook', price: 2009 , weight: 1 , description: 'blaaa blaaa',label:"last_chance", stock: 1 }),
        db.products.create({id: 13,seller_id:2 ,name: 'Macbook PRO laptop Apple', price: 2009 , weight: 1 , description: 'blaaa blaaa',label:"last_chance", stock: 1 }),
        db.products.create({id: 14,seller_id:2 ,name: 'Macbook AIR laptop Apple', price: 2009 , weight: 1 , description: 'blaaa blaaa',label:"last_chance", stock: 1 }),
        db.products.create({id: 4,seller_id:2 ,name: 'T-shirt Hugo Boss', price: 59 , weight: 1 , description: 'blaaa blaaa',label:"top_rated", stock: 4 }),
        db.products.create({id: 11,seller_id:2 ,name: 'T-shirt LV', price: 59 , weight: 1 , description: 'blaaa blaaa',label:"top_rated", stock: 4 }),
        db.products.create({id: 12,seller_id:2 ,name: 'T-shirt Gucci', price: 59 , weight: 1 , description: 'blaaa blaaa',label:"top_rated", stock: 4 }),
        db.products.create({id: 5,seller_id:2 ,name: 'Shoes Addidas', price: 109 , weight: 1 , description: 'blaaa blaaa',label:"new_arrival", stock: 4 }),
        db.products.create({id: 9,seller_id:2 ,name: 'Shoes Puma', price: 109 , weight: 1 , description: 'blaaa blaaa',label:"new_arrival", stock: 4 }),
        db.products.create({id: 10,seller_id:2 ,name: 'Shoes Nike', price: 109 , weight: 1 , description: 'blaaa blaaa',label:"new_arrival", stock: 4 }),
        db.products.create({id: 6,seller_id:2 ,name: 'Gucci glasses', price: 400 , weight: 1 , description: 'blaaa blaaa',label:"feature", stock: 4 }),
        db.products.create({id: 7,seller_id:2 ,name: 'Apple Ipad', price: 400 , weight: 1 , description: 'blaaa blaaa',label:"feature", stock: 4 }),
        db.products.create({id: 8,seller_id:2 ,name: 'Rolex watch', price: 400 , weight: 1 , description: 'blaaa blaaa',label:"feature", stock: 4 })
    ];
    const ordersPromiseList = [
        db.orders.create({id: 1,customer_id:1,ammount:59,shipping_address: 'Titova 99',order_address: 'Bakije sokak 33', order_email: "Hhamo@gmail.com",order_date: "28.04.2020",  order_status: 'ordered' , payment_method:'handover'}),
        db.orders.create({id: 2,customer_id:1,ammount:59,shipping_address: 'Titova 99',order_address: 'Bakije sokak 33', order_email: "Hhamo@gmail.com",order_date: "28.04.2020",  order_status: 'ordered' , payment_method:'handover'})
    ];
    
    const product_imagesPromiseList = [
        db.product_images.create({id: 1,product_id:1,image:'/images/1.png'}),
        db.product_images.create({id: 2,product_id:1,image:'/images/1.png'}),
        db.product_images.create({id: 3,product_id:1,image:'/images/1.png'})
    ];
    
    const categoriesPromiseListe = [
        db.categories.create({id:1 , name: 'Male' , description: 'blaa'}),
        db.categories.create({id:2 , name: 'Female' , description: 'blaa'}),
        db.categories.create({id:3 , name: 'Fashion' , description: 'blaa'}),
        db.categories.create({id:4 , name: 'Accesories' , description: 'blaa'}),
        db.categories.create({id:5 , name: 'Jewlery' , description: 'blaa'}),
        db.categories.create({id:6 , name: 'Shoes' , description: 'blaa'}),
        db.categories.create({id:7 , name: 'Sportware' , description: 'blaa'}),
        db.categories.create({id:8 , name: 'Home' , description: 'blaa'}),
        db.categories.create({id:9 , name: 'Electronics' , description: 'blaa'}),
        db.categories.create({id:10 , name: 'Mobile' , description: 'blaa'}),
        db.categories.create({id:11 , name: 'Computer' , description: 'blaa'}),
        db.categories.create({id:12 , name: 'Laptop' , description: 'blaa'}),
        db.categories.create({id:13 , name: 'Watches' , description: 'blaa'}),
        db.categories.create({id:14 , name: 'Toys' , description: 'blaa'}),
        db.categories.create({id:15 , name: 'Books' , description: 'blaa'}),
    ];
    
    const order_detailsPromiseList = [
        db.order_details.create({id: 1, order_id:1 , product_id: 1 , price: 59 , quantity: 5 }),
        db.order_details.create({id: 2, order_id:1 , product_id: 1 , price: 59 , quantity: 5 })
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
        .then(() => Promise.all(order_detailsPromiseList).then(all => resolve(all)))
        .then(() => Promise.all(product_imagesPromiseList).then(all => resolve(all)))
        .catch(reason => reject(reason));
    });
}

exports.initialize = initialize;