const db = require('./db/db');
const bcrypt = require('bcrypt'); 

function initialize() {
	db.sequelize.sync({ force: true }).then(function () {
	    dataInit().then(() => {
	        console.log("Tables created and inserted!");
	    });
	});
}

function dataInit() {
    const usersPromiseList = [
        db.users.create({id: 1, email: "hamo@gmail.com",password: bcrypt.hashSync("hamo", 10),full_name: "Hamo Hamic", 
        billing_address: 'Bakije sokak 33', shipping_address: 'Titova 99' , country: 'BiH' , phone: '033-123-123'}),
        db.users.create({id: 2, email: "memo@gmail.com",password: bcrypt.hashSync("memo", 10),full_name: "Memo memic",
        billing_address: 'Hasana suceske 22', shipping_address: 'Hasana Suceske 22' , country: 'BiH' , phone: '033-456-123'}),
        db.users.create({id: 3, email: "harun@gmail.com",password: bcrypt.hashSync("harun", 10),full_name: "Omar Hodzic",
        billing_address: 'Hasana suceske 11', shipping_address: 'Hasana Suceske 11' , country: 'BiH' , phone: '061-456-999'})
    ];

    const ordersPromiseList = [
       /* db.orders.create({id: 1,customer_id:1,ammount:569,shipping_address: 'Titova 99',order_address: 'Bakije sokak 33', order_email: "Hhamo@gmail.com",order_date: "28.04.2020",  order_status: 'ordered' , payment_method:'handover'}),
        db.orders.create({id: 2,customer_id:1,ammount:569,shipping_address: 'Titova 99',order_address: 'Bakije sokak 33', order_email: "Hhamo@gmail.com",order_date: "28.04.2020",  order_status: 'ordered' , payment_method:'handover'}),*/
    ];

    const categoriesPromiseListe = [
        db.categories.create({id:1 , name: 'Male' , description: 'primary'}),
        db.categories.create({id:2 , name: 'Female' , description: 'primary'}),
        db.categories.create({id:3 , name: 'Fashion' , description: 'primary'}),
        db.categories.create({id:4 , name: 'Accesories' , description: 'primary'}),
        db.categories.create({id:5 , name: 'Home' , description: 'primary'}),
        db.categories.create({id:6 , name: 'Electronics' , description: 'primary'}),
        db.categories.create({id:20 , name: 'Vehicle' , description: 'primary'}),
        db.categories.create({id:21 , name: 'Car' , description: 'subcategory Vehicle'}),
        db.categories.create({id:7 , name: 'Shoes' , description: 'subcategory Male Female Fashion'}),
        db.categories.create({id:8 , name: 'Sportware' , description: 'subcategory Male Female Fashion'}),
        db.categories.create({id:9 , name: 'Clothes' , description: 'subcategory Male Female Fashion'}),
        db.categories.create({id:15 , name: 'Bag' , description: 'subcategory Male Female Fashion'}),
        db.categories.create({id:10 , name: 'Jewlery' , description: 'subcategory Male Female Fashion Accesories'}),
        db.categories.create({id:11 , name: 'Watches' , description: 'subcategory Male Female Fashion Accesories'}),
        db.categories.create({id:12 , name: 'Mobile' , description: 'subcategory Electronics'}),
        db.categories.create({id:13 , name: 'Computer' , description: 'subcategory Electronics'}),
        db.categories.create({id:14 , name: 'Laptop' , description: 'subcategory Electronics'}),
        db.categories.create({id:16 , name: 'Kitchen' , description: 'subcategory Home'}),
        db.categories.create({id:17 , name: 'Garden' , description: 'subcategory Home'}),
        db.categories.create({id:18 , name: 'Toilet' , description: 'subcategory Home'}),
        db.categories.create({id:19 , name: 'Furniture' , description: 'subcategory Home'})
    ];

    const productsPromiseList = [
        db.products.create({id: 1,seller_id:2 ,name: 'Shirt NIKE', price: 49 , weight: 1 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"classic" , stock: 1}),
        db.products.create({id: 2,seller_id:2 ,name: 'Iphone 11', price: 1009 , weight: 1 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"classic", stock: 1 }),
        db.products.create({id: 3,seller_id:2 ,name: 'HP laptop Probook', price: 2009 , weight: 1 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"last_chance", stock: 1 }),
        db.products.create({id: 4,seller_id:2 ,name: 'Macbook PRO laptop Apple', price: 2009 , weight: 1 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"last_chance", stock: 1 }),
        db.products.create({id: 5,seller_id:2 ,name: 'Mac Apple Computer', price: 2009 , weight: 1 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"last_chance", stock: 1 }),
        db.products.create({id: 6,seller_id:2 ,name: 'Shirt Hugo Boss', price: 59 , weight: 1 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"top_rated", stock: 1 }),
       db.products.create({id: 7,seller_id:2 ,name: 'Barbecue', price: 270 , weight: 1 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"top_rated", stock: 1 }),
        db.products.create({id: 8,seller_id:2 ,name: 'Ipad Pro Apple', price: 590 , weight: 1 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"top_rated", stock: 1 }),
        db.products.create({id: 9,seller_id:2 ,name: 'Tesla electric car', price: 109000 , weight: 100 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"new_arrival", stock: 1 }),
        db.products.create({id: 10,seller_id:2 ,name: 'Bad for kids', price: 1090 , weight: 25 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"new_arrival", stock: 1 }),
        db.products.create({id: 11,seller_id:2 ,name: 'Shoes Nike', price: 109 , weight: 1 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"new_arrival", stock: 1 }),
        db.products.create({id: 12,seller_id:2 ,name: 'Bag Furla', price: 400 , weight: 1 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"feature", stock: 1 }),
        db.products.create({id: 13,seller_id:2 ,name: 'Gucci belt', price: 400 , weight: 1 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"feature", stock: 1 }),
        db.products.create({id: 14,seller_id:2 ,name: 'Rolex watch', price: 400 , weight: 1 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"feature", stock: 1 }),
        db.products.create({id: 15,seller_id:2 ,name: 'Ring Pandora', price: 300 , weight: 1 , description: 'The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.',label:"classic", stock: 1 })
    ];

    const product_categoriesPromiseList = [
        db.product_categories.create({ productId:1,categoryId:1}),
        db.product_categories.create({ productId:1,categoryId:2}),
        db.product_categories.create({ productId:1,categoryId:3}),
        db.product_categories.create({ productId:1,categoryId:8}),
        db.product_categories.create({ productId:1,categoryId:9}),

        db.product_categories.create({ productId:6,categoryId:1}),
        db.product_categories.create({ productId:6,categoryId:2}),
        db.product_categories.create({ productId:6,categoryId:3}),
        db.product_categories.create({ productId:6,categoryId:9}),

        db.product_categories.create({ productId:7,categoryId:5}),
        db.product_categories.create({ productId:7,categoryId:17}),
        
        db.product_categories.create({ productId:4,categoryId:6}),
        db.product_categories.create({ productId:4,categoryId:14}),


        db.product_categories.create({ productId:5,categoryId:6}),
        db.product_categories.create({ productId:5,categoryId:13}),

        db.product_categories.create({ productId:9,categoryId:20}),
        db.product_categories.create({ productId:9,categoryId:21}),

        db.product_categories.create({ productId:12,categoryId:1}),
        db.product_categories.create({ productId:12,categoryId:2}),
        db.product_categories.create({ productId:12,categoryId:3}),
        db.product_categories.create({ productId:12,categoryId:15}),

        db.product_categories.create({ productId:8,categoryId:6}),
        db.product_categories.create({ productId:8,categoryId:12}),
        db.product_categories.create({ productId:8,categoryId:13}),

        db.product_categories.create({ productId:10,categoryId:5}),
        db.product_categories.create({ productId:10,categoryId:19}),

        db.product_categories.create({ productId:11,categoryId:1}),
        db.product_categories.create({ productId:11,categoryId:2}),
        db.product_categories.create({ productId:11,categoryId:3}),
        db.product_categories.create({ productId:11,categoryId:7}),
        db.product_categories.create({ productId:11,categoryId:8}),

        db.product_categories.create({productId:3,categoryId:6}),
        db.product_categories.create({productId:3,categoryId:14}),
        db.product_categories.create({productId:4,categoryId:6}),
        db.product_categories.create({productId:4,categoryId:14}),
        db.product_categories.create({productId:5,categoryId:6}),
        db.product_categories.create({productId:5,categoryId:14}),
        
        db.product_categories.create({productId:2,categoryId:6}),
        db.product_categories.create({productId:2,categoryId:12}),

        db.product_categories.create({productId:13,categoryId:2}),
        db.product_categories.create({productId:13,categoryId:3}),
        db.product_categories.create({productId:13,categoryId:4}),
        db.product_categories.create({productId:13,categoryId:9}),

        db.product_categories.create({productId:14,categoryId:1}),
        db.product_categories.create({productId:14,categoryId:2}),
        db.product_categories.create({productId:14,categoryId:3}),
        db.product_categories.create({productId:14,categoryId:4}),
        db.product_categories.create({productId:14,categoryId:11}),

        db.product_categories.create({productId:13,categoryId:15}),
        db.product_categories.create({productId:14,categoryId:15}),


        db.product_categories.create({productId:15,categoryId:2}),
        db.product_categories.create({productId:15,categoryId:3}),
        db.product_categories.create({productId:15,categoryId:4}),
        db.product_categories.create({productId:15,categoryId:10}),
    ];

    const product_imagesPromiseList = [
        db.product_images.create({product_id:1,image:'/images/t-shirtNike.jpeg'}),
        db.product_images.create({product_id:1,image:'/images/tshirtBoss.jpg'}),
        db.product_images.create({product_id:1,image:'/images/shirt.jpg'}),
        db.product_images.create({product_id:2,image:'/images/iphone11.png'}),
        db.product_images.create({product_id:2,image:'/images/iphone11.png'}),

        db.product_images.create({product_id:3,image:'/images/laptopHp.jpg'}),

        db.product_images.create({product_id:4,image:'/images/mba.jpg'}),

        db.product_images.create({product_id:5,image:'/images/mac.jpg'}),

        db.product_images.create({product_id:6,image:'/images/tshirtBoss.jpg'}),
        
        db.product_images.create({product_id:7,image:'/images/rostilj.jpg'}),
        db.product_images.create({product_id:7,image:'/images/rostilj2.jpg'}),

        db.product_images.create({product_id:8,image:'/images/ipadPro.jpg'}),

        db.product_images.create({product_id:9,image:'/images/tesla.jpg'}),
        db.product_images.create({product_id:9,image:'/images/tesla.jpg'}),
        db.product_images.create({product_id:9,image:'/images/tesla2.jpg'}),

        db.product_images.create({product_id:10,image:'/images/bedForTwo.jpg'}),

        db.product_images.create({product_id:11,image:'/images/shoesNike.png'}),

        db.product_images.create({product_id:12,image:'/images/bag.png'}),
        db.product_images.create({product_id:13,image:'/images/gucciBelt.jpg'}),
        db.product_images.create({product_id:13,image:'/images/gucciBelt.jpg'}),
        db.product_images.create({product_id:13,image:'/images/gucciBelt.jpg'}),
        db.product_images.create({product_id:14,image:'/images/rolexGold.jpg'}),
        db.product_images.create({product_id:14,image:'/images/rolexGreen.jpg'}),
        db.product_images.create({product_id:14,image:'/images/rolexGreen.jpg'}),
        db.product_images.create({product_id:15,image:'/images/ring.jpg'}),
        db.product_images.create({product_id:15,image:'/images/ring.jpg'}),
        db.product_images.create({product_id:15,image:'/images/ring.jpg'}),
    ];
    
    const order_detailsPromiseList = [
        //db.order_details.create({id: 1, order_id:1 , product_id: 15 , price: 567 , quantity: 1 }),
        //db.order_details.create({id: 2, order_id:1 , product_id: 14 , price: 10000 , quantity: 1 })
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