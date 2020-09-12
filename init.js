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
        db.users.create({id: 1, email: "hamo@gmail.com",password: "hamo",full_name: "Hamo Hamic", billing_address: 'Bakije sokak 33', shipping_address: 'Titova 99' , country: 'BiH' , phone: '033-123-123'}),
        db.users.create({id: 2, email: "memo@gmail.com",password: "memo",full_name: "Memo memic",
        billing_address: 'Hasana suceske 22', shipping_address: 'Hasana Suceske 22' , country: 'BiH' , phone: '033-456-123'}),
        db.users.create({id: 3, email: "omar@gmail.com",password: "omar",full_name: "Omar Hodzic",
        billing_address: 'Hasana suceske 11', shipping_address: 'Hasana Suceske 11' , country: 'BiH' , phone: '061-456-999'})
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
        db.products.create({id: 8,seller_id:2 ,name: 'Rolex watch', price: 400 , weight: 1 , description: 'blaaa blaaa',label:"feature", stock: 4 }),
        db.products.create({id: 15,seller_id:2 ,name: 'Ring Pandora', price: 300 , weight: 1 , description: 'blaaa blaaa',label:"classic", stock: 4 })
    ];
    const ordersPromiseList = [
        db.orders.create({id: 1,customer_id:1,ammount:59,shipping_address: 'Titova 99',order_address: 'Bakije sokak 33', order_email: "Hhamo@gmail.com",order_date: "28.04.2020",  order_status: 'ordered' , payment_method:'handover'}),
        db.orders.create({id: 2,customer_id:1,ammount:59,shipping_address: 'Titova 99',order_address: 'Bakije sokak 33', order_email: "Hhamo@gmail.com",order_date: "28.04.2020",  order_status: 'ordered' , payment_method:'handover'})
    ];
    
    const product_imagesPromiseList = [
        db.product_images.create({id: 1,product_id:1,image:'/images/t-shirtNike.jpeg'}),
        db.product_images.create({id: 2,product_id:2,image:'/images/iphone11.png'}),
        db.product_images.create({id: 3,product_id:3,image:'/images/mba.jpg'}),
        db.product_images.create({id: 4,product_id:4,image:'/images/t-shirtNike.jpeg'}),
        db.product_images.create({id: 5,product_id:5,image:'/images/t-shirtNike.jpeg'}),
        db.product_images.create({id: 6,product_id:6,image:'/images/t-shirtNike.jpeg'}),
        db.product_images.create({id: 7,product_id:7,image:'/images/t-shirtNike.jpeg'}),
        db.product_images.create({id: 8,product_id:8,image:'/images/rolexGold.jpg'}),
        db.product_images.create({id: 9,product_id:9,image:'/images/bag.png'}),
        db.product_images.create({id: 10,product_id:10,image:'/images/gucciBelt.jpg'}),
        db.product_images.create({id: 11,product_id:11,image:'/images/iphone11.png'}),
        db.product_images.create({id: 12,product_id:12,image:'/images/iphone11.png'}),
        db.product_images.create({id: 13,product_id:13,image:'/images/mba.jpg'}),
        db.product_images.create({id: 14,product_id:14,image:'/images/mba.jpg'}),
        db.product_images.create({id: 15,product_id:15,image:'/images/rolexGreen.jpg'})
    ];
    
    const categoriesPromiseListe = [
        db.categories.create({id:1 , name: 'Male' , description: 'primary'}),
        db.categories.create({id:2 , name: 'Female' , description: 'primary'}),
        db.categories.create({id:3 , name: 'Fashion' , description: 'primary'}),
        db.categories.create({id:4 , name: 'Accesories' , description: 'primary'}),
        db.categories.create({id:5 , name: 'Home' , description: 'primary'}),
        db.categories.create({id:6 , name: 'Electronics' , description: 'primary'}),
        db.categories.create({id:7 , name: 'Shoes' , description: 'subcategory'}),
        db.categories.create({id:8 , name: 'Sportware' , description: 'subcategory'}),
        db.categories.create({id:9 , name: 'Clothes' , description: 'subcategory'}),
        db.categories.create({id:10 , name: 'Jewlery' , description: 'subcategory'}),
        db.categories.create({id:11 , name: 'Watches' , description: 'subcategory'}),
        db.categories.create({id:12 , name: 'Mobile' , description: 'subcategory'}),
        db.categories.create({id:13 , name: 'Computer' , description: 'subcategory'}),
        db.categories.create({id:14 , name: 'Laptop' , description: 'subcategory'}),
        /*db.categories.create({id:16 , name: 'White' , description: 'color'}),
        db.categories.create({id:17 , name: 'Black' , description: 'color'}),
        db.categories.create({id:18 , name: 'Green' , description: 'color'}),
        db.categories.create({id:19 , name: 'Blue' , description: 'color'}),
        db.categories.create({id:21 , name: 'Red' , description: 'color'}),
        db.categories.create({id:22 , name: 'Orange' , description: 'color'}),
        db.categories.create({id:23 , name: 'Small' , description: 'size'}),
        db.categories.create({id:24 , name: 'Medium' , description: 'size'}),
        db.categories.create({id:25 , name: 'Large' , description: 'size'}),
        db.categories.create({id:26 , name: 'Extra Large' , description: 'size'})*/
    ];
    
    const order_detailsPromiseList = [
        db.order_details.create({id: 1, order_id:1 , product_id: 1 , price: 59 , quantity: 5 }),
        db.order_details.create({id: 2, order_id:1 , product_id: 1 , price: 59 , quantity: 5 })
    ];
    const product_categoriesPromiseList = [
        db.product_categories.create({id: 1,productId:1,categoryId:1}),
        db.product_categories.create({id: 2,productId:1,categoryId:3}),
        db.product_categories.create({id: 3,productId:1,categoryId:3}),
        db.product_categories.create({id: 4,productId:1,categoryId:3}),
        db.product_categories.create({id: 5,productId:1,categoryId:3}),
        db.product_categories.create({id: 6,productId:1,categoryId:3}),
        db.product_categories.create({id: 7,productId:1,categoryId:3}),
        db.product_categories.create({id: 8,productId:1,categoryId:3}),
        db.product_categories.create({id: 9,productId:1,categoryId:3}),
        db.product_categories.create({id: 10,productId:1,categoryId:3}),
        db.product_categories.create({id: 11,productId:1,categoryId:3}),
        db.product_categories.create({id: 12,productId:1,categoryId:3})
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