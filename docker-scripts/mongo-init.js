db.createUser(
    {
        user: "cooknow",
        pwd: "sklu8tQbmsLYt6vRI54V",
        roles: [
            {
                role: "readWrite",
                db: "cooknow"
            }
        ]
    }
);


db.categories.insertMany([
    {_id: ObjectId("5efcf2689cb3e35fb3ee7b90"), name: "Beef"},
    {_id: ObjectId("5efcf2689cb3e35fb3ee7b91"), name: "Pork"},
    {_id: ObjectId("5efcf2689cb3e35fb3ee7b92"), name: "Poultry"},
    {_id: ObjectId("5efcf2689cb3e35fb3ee7b93"), name: "Vegan"},
    {_id: ObjectId("5efcf2689cb3e35fb3ee7b94"), name: "Vegetarian"},
    {_id: ObjectId("5efcf2689cb3e35fb3ee7b95"), name: "Chicken"},
    {_id: ObjectId("5f038e35744afc109d1a60d5"), name: "Fish"},
    {_id: ObjectId("5f038e3d744afc109d1a60e1"), name: "Seafood"},
    {_id: ObjectId("5f038e3d744afc109d1a60e2"), name: "Asian"}
]);

db.users.insertMany([
    {
        _id: ObjectId('5f1324a861743d01a813ca16'),
        isChef: true,
        isAuthenticated: true,
        courseInstances: [],
        courseIDs: [],
        email: 'lilian@laboheme.de',
        password: '$2a$08$b2bcNd3YC0LZLpP9w17mHOXhfJY9kOGtAeybTO9.0HZhoot.qy9g6',
        verificationToken: '',
        title: 'Mrs',
        firstName: 'Lilian',
        lastName: 'Schumann',
        streetname: 'Leopoldstraße',
        houseNumber: '180',
        zipCode: '80804',
        city: 'Munich',
        country: 'Germany',
        userImage: 'user/u_5f1324a861743d01a813ca16.jpg',
        restaurantName: 'La Bohème Schwabing',
        homepage: 'https://boheme-schwabing.de'
    },
    {
        _id: ObjectId('5f0cb998473fe0007f91865e'),
        isChef: true,
        isAuthenticated: true,
        courseInstances: [],
        courseIDs: [],
        email: 'gung@hongdae-muenchen.com',
        password: '$2a$08$8mrMcOtWNvdXrFK0YeWYHuZFutXT1d0LnTzSGKqIg0/mji.84QoOW',
        verificationToken: '',
        title: 'Mr',
        firstName: 'Gung',
        lastName: 'Kung',
        streetname: 'Theresienstraße',
        houseNumber: '7',
        zipCode: '80333',
        city: 'Munich',
        country: 'Germany',
        userImage: 'user/u_5f13465c1bf948004b8e9393.jpg',
        homepage: 'https://hongdae-muenchen.com',
        restaurantName: 'Hongdae'
    },
    {
        _id: ObjectId('5f11d57c8bf88a002a5ddfae'),
        isChef: true,
        isAuthenticated: true,
        courseInstances: [],
        courseIDs: [
            ObjectId('5f11d8288bf88a002a5ddfb0'),
            ObjectId('5f11db118bf88a002a5ddfc0')
        ],
        email: 'lukas@orangebox.de',
        password: '$2a$08$x4odq4KqWDt7zTVsw60dIe0JpsObSx7c8w1TZN9403uoSWKZ1frCS',
        verificationToken: '',
        title: 'Mr',
        firstName: 'Lukas',
        lastName: 'Meier',
        streetname: 'Poststraße',
        houseNumber: '10',
        zipCode: '80800',
        city: 'Munich',
        country: 'Deutschland',
        userImage: 'user/u_5f11d57c8bf88a002a5ddfae.jpg',
        restaurantName: 'Orange Box',
        homepage: 'orangebox-muenchen.de'
    },
    {
        _id: ObjectId('5f1329caddaeba00394bab10'),
        isChef: false,
        isAuthenticated: true,
        courseInstances: [],
        courseIDs: [],
        email: 'michael@cooknow.de',
        password: '$2a$08$Ovq4mFlK49MG.fPwaxjjt.QUuYu7s8yWwcgTQSOvBFboRK/yo0FHe',
        verificationToken: '',
        title: 'Mr',
        firstName: 'Michael',
        lastName: 'Gigler',
        streetname: 'Bergstraße',
        houseNumber: '1',
        zipCode: '80796',
        city: 'Munich',
        country: 'Germany',
        userImage: 'user/u_5f1329caddaeba00394bab10.jpg'
    },
    {
        _id: ObjectId('5f0cbae4473fe0007f918665'),
        isChef: false,
        isAuthenticated: true,
        courseInstances: [],
        courseIDs: [],
        email: 'maxi@cooknow.de',
        password: '$2a$08$8mrMcOtWNvdXrFK0YeWYHuZFutXT1d0LnTzSGKqIg0/mji.84QoOW',
        verificationToken: '',
        title: 'Mr',
        firstName: 'Maximilian',
        lastName: 'Marsch',
        streetname: 'Eichenstraße',
        houseNumber: '42',
        zipCode: '424242',
        city: 'Munich',
        country: 'Germany',
        userImage: 'user/u_5f1341be1bf948004b8e9391.jpg'
    }
    ,
    {
        _id: ObjectId('5f13504821c45f0061b93001'),
        isChef: false,
        isAuthenticated: true,
        courseInstances: [],
        courseIDs: [],
        email: 'maren@cooknow.de',
        password: '$2a$08$3QcKESD2fysHFrxpH7rufuGEMHQvF.jGtB96vLFuWsRb3zEi5vmRG',
        verificationToken: '',
        title: 'Ms',
        firstName: 'Maren',
        lastName: 'Hinrichs',
        streetname: 'Wiesenstraße',
        houseNumber: '10',
        zipCode: '80800',
        city: 'Munich',
        country: 'Deutschland',
        userImage: 'user/u_5f13504821c45f0061b93001.jpg'
    }, {
        _id: ObjectId('5f1404e3cff0fa008907eaef'),
        isChef: false,
        isAuthenticated: true,
        courseInstances: [],
        courseIDs: [],
        email: 'jenny@cooknow.de',
        password: '$2a$08$PuCc1ld1yK4sUJd3aPfD2OUvEytRtEREZsIkvkgY5kh3XV99kpsMC',
        verificationToken: '',
        title: 'Ms',
        firstName: 'Jenny',
        lastName: 'Pousada',
        streetname: 'Königinstraße',
        houseNumber: '10a',
        zipCode: '80331',
        city: 'Munich',
        country: 'Germany',
        userImage: 'user/u_5f1404e3cff0fa008907eaef.jpg'
    }
]);

db.courses.insertMany([
    {
        "_id": ObjectId("5f1302484663e0002a190162"),
        "categories": [
            ObjectId("5f038e35744afc109d1a60d5"),
        ],
        "title": "Spinach Pasta with Pulled Salmon",
        "description": "This culinary specialty combines traditional pasta with our fresh norwegian salmon, which will be a taste explosion. Besides that the flavour of the sauce will be enhances with fresh tomates and freshly harvested herbes. ",
        "dishes": [
            {
                "_id": ObjectId("5f1302484663e0002a190164"),
                "course": "Starter",
                "dish": "Summer salad"
            },
            {
                "_id": ObjectId("5f1302484663e0002a190165"),
                "course": "Main Course",
                "dish": "Spinach Pasta with Pulled Salmon"
            }
        ],
        "ingredients": [
            {
                "_id": ObjectId("5f1302484663e0002a190166"),
                "amount": 150,
                "unit": "g",
                "ingredient": "Handmade spinach pasta"
            },
            {
                "_id": ObjectId("5f1302484663e0002a190167"),
                "amount": 120,
                "unit": "g",
                "ingredient": "Norwegian salmon"
            },
            {
                "_id": ObjectId("5f1302484663e0002a190168"),
                "amount": 50,
                "unit": "g",
                "ingredient": "Butter"
            },
            {
                "_id": ObjectId("5f1302484663e0002a190169"),
                "amount": 250,
                "unit": "ml",
                "ingredient": "Cream"
            },
            {
                "_id": ObjectId("5f1302484663e0002a19016a"),
                "amount": 70,
                "unit": "g",
                "ingredient": "Parmigiano Reggiano"
            },
            {
                "_id": ObjectId("5f1302484663e0002a19016b"),
                "amount": 100,
                "unit": "g",
                "ingredient": "Cherry tomatoes"
            },
            {
                "_id": ObjectId("5f1302484663e0002a19016c"),
                "amount": 3,
                "unit": " piece(s)",
                "ingredient": "Herbes"
            },
            {
                "_id": ObjectId("5f1302484663e0002a19016d"),
                "amount": 50,
                "unit": "ml",
                "ingredient": "Olive oil"
            },
            {
                "_id": ObjectId("5f1302484663e0002a19016e"),
                "amount": 3,
                "unit": " piece(s)",
                "ingredient": "Cloves of garlic"
            },
            {
                "_id": ObjectId("5f1302484663e0002a19016f"),
                "amount": 20,
                "unit": "g",
                "ingredient": "Pine nuts"
            },
            {
                "_id": ObjectId("5f1302484663e0002a190170"),
                "amount": 1,
                "unit": " piece(s)",
                "ingredient": "Lemon"
            }
        ],
        "equipment": [
            {
                "_id": ObjectId("5f1302484663e0002a190171"),
                "description": "One big pot"
            },
            {
                "_id": ObjectId("5f1302484663e0002a190172"),
                "description": "One big pan"
            },
            {
                "_id": ObjectId("5f1302484663e0002a190173"),
                "description": "One sharp knife"
            }
        ],
        "cost": 129.99,
        "maxParticipants": 12,
        "courseImage": "5f1302484663e0002a190162.jpg",
        "ratings": [
            {
                "_id": ObjectId("5f132ee17c4417002ae2a5da"),
                "userId": ObjectId("5f1329caddaeba00394bab10"),
                "firstName": "Michael",
                "rating": 5,
                "title": "So delicious",
                "description": "I can recommend this course to everyone! It was soo delicious. From now on I will cook this dish at least once a week.",
                "updatedAt": ISODate("2020-07-18T17:18:25.868Z"),
                "createdAt": ISODate("2020-07-18T17:18:25.868Z")
            },
            {
                "_id": ObjectId("5f132ee17c4417002ae2a5db"),
                "userId": ObjectId("5f13504821c45f0061b93001"),
                "firstName": "Maren",
                "rating": 4,
                "title": "Delicious",
                "description": "It was really delicious and we had a lot of fun with the chef. Can't wait to do my next course with La Boheme.",
                "updatedAt": ISODate("2020-07-13T15:20:38.515Z"),
                "createdAt": ISODate("2020-07-13T15:20:38.515Z")
            }, {
                "_id": ObjectId("5f132ee17c4417002ae2a5de"),
                "userId": ObjectId("5f1404e3cff0fa008907eaef"),
                "firstName": "Jenny",
                "rating": 5,
                "title": "Perfect Dish",
                "description": "I recommend participating in this course. The food was super delicious.",
                "updatedAt": ISODate("2020-07-12T17:00:00.000Z"),
                "createdAt": ISODate("2020-07-12T17:00:00.000Z")
            }
        ],
        "instances": [
            {
                "bookable": false,
                "_id": ObjectId("5f1302484663e0002a190174"),
                "startDate": ISODate("2020-07-12T09:00:00.000Z"),
                "endDate": ISODate("2020-07-12T11:00:00.000Z")
            },
            {
                "bookable": true,
                "_id": ObjectId("5f1302484663e0002a190175"),
                "startDate": ISODate("2020-07-23T15:00:00.000Z"),
                "endDate": ISODate("2020-07-23T17:00:00.000Z")
            },
            {
                "bookable": true,
                "_id": ObjectId("5f1302484663e0002a190176"),
                "startDate": ISODate("2020-07-25T15:00:00.000Z"),
                "endDate": ISODate("2020-07-25T17:00:00.000Z")
            },
            {
                "bookable": true,
                "_id": ObjectId("5f1302484663e0002a190177"),
                "startDate": ISODate("2020-07-31T15:00:00.000Z"),
                "endDate": ISODate("2020-07-31T17:00:00.000Z")
            }
        ],
        "createdAt": ISODate("2020-07-18T14:08:08.961Z"),
        "updatedAt": ISODate("2020-07-18T15:01:48.678Z")
    },
    {
        "_id": ObjectId("5f130ab74663e0002a190178"),
        "categories": [
            ObjectId("5efcf2689cb3e35fb3ee7b94")
        ],
        "title": "Spinach Knödel",
        "description": "In this course we will cook spinach knödlich, which are a Bavarian specialty, however interpreted in a new fruity way. Prepare for a new taste explosion, with new fruity flavours, which you have never experienced before.",
        "dishes": [
            {
                "_id": ObjectId("5f130ab74663e0002a19017a"),
                "course": "Starter",
                "dish": "Tomato soup"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a19017b"),
                "course": "Main course",
                "dish": "Spinach Knödel"
            }
        ],
        "ingredients": [
            {
                "_id": ObjectId("5f130ab74663e0002a19017c"),
                "amount": 200,
                "unit": "g",
                "ingredient": "Breadcrumbs"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a19017d"),
                "amount": 300,
                "unit": "g",
                "ingredient": "Fresh spinach"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a19017e"),
                "amount": 100,
                "unit": "ml",
                "ingredient": "Milk"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a19017f"),
                "amount": 25,
                "unit": "g",
                "ingredient": "Butter"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a190180"),
                "amount": 1,
                "unit": " piece(s)",
                "ingredient": "Egg"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a190181"),
                "amount": 1,
                "unit": " piece(s)",
                "ingredient": "Orange"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a190182"),
                "amount": 1,
                "unit": " piece(s)",
                "ingredient": "Lemon"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a190183"),
                "amount": 50,
                "unit": "g",
                "ingredient": "Parmigiano Reggiano"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a190184"),
                "amount": 10,
                "unit": "g",
                "ingredient": "Salt"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a190185"),
                "amount": 2,
                "unit": "g",
                "ingredient": "Pepper"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a190186"),
                "amount": 25,
                "unit": "g",
                "ingredient": "Walnuts"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a190187"),
                "amount": 1,
                "unit": " piece(s)",
                "ingredient": "Cloves of garlic"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a190188"),
                "amount": 400,
                "unit": "g",
                "ingredient": "Tomatoes"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a190189"),
                "amount": 10,
                "unit": "g",
                "ingredient": "Herbes"
            }
        ],
        "equipment": [
            {
                "_id": ObjectId("5f130ab74663e0002a19018a"),
                "description": "One big pot"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a19018b"),
                "description": "One small pot"
            },
            {
                "_id": ObjectId("5f130ab74663e0002a19018c"),
                "description": "One big pan"
            }
        ],
        "cost": 99.99,
        "maxParticipants": 12,
        "courseImage": "5f130ab74663e0002a190178.jpg",
        "ratings": [
            {
                "_id": ObjectId("5f132fa27c4417002ae2a5dc"),
                "userId": ObjectId("5f1329caddaeba00394bab10"),
                "firstName": "Michael",
                "rating": 5,
                "title": "5 stars",
                "description": "Very nice cook and the dish was super delicious as well!",
                "updatedAt": ISODate("2020-07-18T17:21:38.515Z"),
                "createdAt": ISODate("2020-07-18T17:21:38.515Z")
            }
        ],
        "instances": [
            {
                "bookable": true,
                "_id": ObjectId("5f130ab74663e0002a19018d"),
                "startDate": ISODate("2020-07-15T14:00:00.000Z"),
                "endDate": ISODate("2020-07-15T16:30:00.000Z")
            },
            {
                "bookable": true,
                "_id": ObjectId("5f130ab74663e0002a19018e"),
                "startDate": ISODate("2020-07-24T14:00:00.000Z"),
                "endDate": ISODate("2020-07-24T16:30:00.000Z")
            },
            {
                "bookable": true,
                "_id": ObjectId("5f130ab74663e0002a19018f"),
                "startDate": ISODate("2020-07-26T09:00:00.000Z"),
                "endDate": ISODate("2020-07-26T11:30:00.000Z")
            },
            {
                "bookable": true,
                "_id": ObjectId("5f130ab74663e0002a190190"),
                "startDate": ISODate("2020-07-31T14:00:00.000Z"),
                "endDate": ISODate("2020-07-31T16:30:00.000Z")
            }
        ],
        "createdAt": ISODate("2020-07-18T14:44:07.981Z"),
        "updatedAt": ISODate("2020-07-18T14:44:07.981Z")
    },
    {
        "_id": ObjectId('5f122c7539e39f004988816e'),
        "categories": [
            ObjectId('5efcf2689cb3e35fb3ee7b91'),
            ObjectId('5f038e3d744afc109d1a60e2')
        ],
        "title": 'Korean Dakgalbi',
        "description": 'Dakalbi is a very popular dish in all over Korea. It is a spicy-fried chicken dish made with bonless chicken pieces, rice cakes, green cabbage and a sweet potato. In this course I\'ll teach you how a tradional dakgalbi is made.',
        "dishes": [
            {
                "_id": ObjectId('5f122c7639e39f0049888170'),
                "course": 'Main',
                "dish": 'Dakgalbi'
            }
        ],
        "ingredients": [
            {
                "_id": ObjectId('5f122c7639e39f0049888171'),
                "amount": 150,
                "unit": 'g',
                "ingredient": 'boneless and skinless chicken thighs'
            },
            {
                "_id": ObjectId('5f122c7639e39f0049888172'),
                "amount": 1,
                "unit": ' piece(s)',
                "ingredient": 'green cabbage'
            },
            {
                "_id": ObjectId('5f122c7639e39f0049888173'),
                "amount": 1,
                "unit": ' piece(s)',
                "ingredient": 'Korean sweet potato'
            },
            {
                "_id": ObjectId('5f122c7639e39f0049888174'),
                "amount": 150,
                "unit": 'g',
                "ingredient": 'tteokbokki tteok'
            },
            {
                "_id": ObjectId('5f122c7639e39f0049888175'),
                "amount": 3,
                "unit": ' piece(s)',
                "ingredient": 'perilla leaves'
            },
            {
                "_id": ObjectId('5f122c7639e39f0049888176'),
                "amount": 2,
                "unit": ' piece(s)',
                "ingredient": 'scallions'
            },
            {
                "_id": ObjectId('5f122c7639e39f0049888177'),
                "amount": 200,
                "unit": 'g',
                "ingredient": 'mozzarella cheese'
            }
        ],
        "equipment": [
            {
                "_id": ObjectId('5f122c7639e39f0049888178'),
                "description": 'One bowl'
            },
            {
                "_id": ObjectId('5f122c7639e39f0049888179'),
                "description": 'One knife'
            },
            {
                "_id": ObjectId('5f122c7639e39f004988817a'),
                "description": 'One frying pan'
            }
        ],
        "cost": 99.99,
        "maxParticipants": 7,
        "courseImage": '5f122c7539e39f004988816e.jpg',
        "ratings": [
            {
                "_id": ObjectId("5f132fa27c4417002ae2a5da"),
                "userId": ObjectId("5f0cbae4473fe0007f918665"),
                "firstName": "Maximilian",
                "rating": 5,
                "title": "Soooo good",
                "description": "I love korean food. And this is just out of this world! Can only recommend to book!",
                "updatedAt": ISODate("2020-07-18T17:18:25.868Z"),
                "createdAt": ISODate("2020-07-18T17:18:25.868Z")
            }
        ],
        "instances": [
            {
                "bookable": false,
                "_id": ObjectId('5f1232b039e39f00498881f0'),
                "startDate": ISODate('2020-07-15T14:00:00.000Z'),
                "endDate": ISODate('2020-07-15T15:30:00.000Z')
            },
            {
                "bookable": true,
                "_id": ObjectId('5f1232b039e39f00498881f1'),
                "startDate": ISODate('2020-07-25T16:00:00.000Z'),
                "endDate": ISODate('2020-07-25T17:30:00.000Z')
            },
            {
                "bookable": true,
                "_id": ObjectId('5f1232b039e39f00498881f2'),
                "startDate": ISODate('2020-07-29T16:00:00.000Z'),
                "endDate": ISODate('2020-07-29T17:30:00.000Z')
            },
            {
                "bookable": true,
                "_id": ObjectId('5f1232b039e39f00498881f3'),
                "startDate": ISODate('2020-08-10T16:00:00.000Z'),
                "endDate": ISODate('2020-08-10T17:30:00.000Z')
            }
        ],
        "createdAt": ISODate('2020-07-17T22:55:50.510Z'),
        "updatedAt": ISODate('2020-07-17T23:22:24.271Z')
    },
    {
        "_id": ObjectId('5f12f24d39e39f00498881f2'),
        "categories": [
            ObjectId('5efcf2689cb3e35fb3ee7b90'),
            ObjectId('5f038e3d744afc109d1a60e2')
        ],
        "title": 'Bulgogi',
        "description": 'Bulgogi is a well known traditional course in Korea, translated it means "fire meat". There are many different versions, with different types of meat and different sauces, depending on where it origiates from. I\'ll show you the spicy beef version wraped in lettuce leaves.',
        "dishes": [
            {
                "_id": ObjectId('5f12f24f39e39f00498881f4'),
                "course": 'Main',
                "dish": 'Bulgogi'
            }
        ],
        "ingredients": [
            {
                "_id": ObjectId('5f12f24f39e39f00498881f5'),
                "amount": 250,
                "unit": 'g',
                "ingredient": 'entrecote beef'
            },
            {
                "_id": ObjectId('5f12f24f39e39f00498881f6'),
                "amount": 1,
                "unit": ' piece(s)',
                "ingredient": 'onion'
            },
            {
                "_id": ObjectId('5f12f24f39e39f00498881f7'),
                "amount": 1,
                "unit": ' piece(s)',
                "ingredient": 'clove garlic'
            },
            {
                "_id": ObjectId('5f12f24f39e39f00498881f8'),
                "amount": 1,
                "unit": ' piece(s)',
                "ingredient": 'scallion'
            },
            {
                "_id": ObjectId('5f12f24f39e39f00498881f9'),
                "amount": 2,
                "unit": ' el',
                "ingredient": 'soy sauce'
            },
            {
                "_id": ObjectId('5f12f24f39e39f00498881fa'),
                "amount": 2,
                "unit": ' el',
                "ingredient": 'sugar'
            },
            {
                "_id": ObjectId('5f12f24f39e39f00498881fb'),
                "amount": 4,
                "unit": ' el',
                "ingredient": 'ssamjang'
            },
            {
                "_id": ObjectId('5f12f24f39e39f00498881fc'),
                "amount": 1,
                "unit": ' el',
                "ingredient": 'dark sesame oil'
            },
            {
                "_id": ObjectId('5f12f24f39e39f00498881fd'),
                "amount": 1,
                "unit": ' piece(s)',
                "ingredient": 'lettuce'
            }
        ],
        "equipment": [
            {
                "_id": ObjectId('5f12f24f39e39f00498881fe'),
                "description": 'One knife'
            },
            {
                "_id": ObjectId('5f12f24f39e39f00498881ff'),
                "description": 'One frying pan'
            }
        ],
        "cost": 149.99,
        "maxParticipants": 10,
        "courseImage": '5f12f24d39e39f00498881f2.jpg',
        "ratings": [
            {
                "_id": ObjectId("5f132ee17c4417212ae2a5da"),
                "userId": ObjectId("5f0cbae4473fe0007f918665"),
                "firstName": "Maximilian",
                "rating": 5,
                "title": "Exotic but delicious",
                "description": "Great chef, great people and a more than delicious recipe.",
                "updatedAt": ISODate("2020-07-18T17:18:25.868Z"),
                "createdAt": ISODate("2020-07-18T17:18:25.868Z")
            }
        ],
        "instances": [
            {
                "bookable": false,
                "_id": ObjectId('5f12f31739e39f004988820e'),
                "startDate": ISODate('2020-07-15T15:30:00.000Z'),
                "endDate": ISODate('2020-07-15T18:30:00.000Z')
            },
            {
                "bookable": true,
                "_id": ObjectId('5f12f31739e39f004988820f'),
                "startDate": ISODate('2020-08-04T14:30:00.000Z'),
                "endDate": ISODate('2020-08-04T17:30:00.000Z')
            },
            {
                "bookable": true,
                "_id": ObjectId('5f12f31739e39f004988820a'),
                "startDate": ISODate('2020-08-06T14:30:00.000Z'),
                "endDate": ISODate('2020-08-06T17:30:00.000Z')
            },
            {
                "bookable": true,
                "_id": ObjectId('5f12f31739e39f004988820b'),
                "startDate": ISODate('2020-07-25T14:30:00.000Z'),
                "endDate": ISODate('2020-08-25T17:30:00.000Z')
            }
        ],
        "createdAt": ISODate('2020-07-18T12:59:59.626Z'),
        "updatedAt": ISODate('2020-07-18T13:03:19.487Z')
    }
    ,
    {
        "_id": ObjectId('5f11d8288bf88a002a5ddfb0'),
        "categories": [
            ObjectId('5efcf2689cb3e35fb3ee7b93')
        ],
        "title": 'Halloumi Wrap',
        "description": 'We will cook a delicious wrap with halloumi, baby corn, spinach and other delicious veggetables. Learn how to marinate your own halloumi and create the perfect meal for at home or on the go. ',
        "dishes": [
            {
                "_id": ObjectId('5f11d8298bf88a002a5ddfb2'),
                "course": 'Starter',
                "dish": 'Salad'
            },
            {
                "_id": ObjectId('5f11d8298bf88a002a5ddfb3'),
                "course": 'Main Dish',
                "dish": 'Halloumi Wrap'
            }
        ],
        "ingredients": [
            {
                "_id": ObjectId('5f11d8298bf88a002a5ddfb4'),
                "amount": 100,
                "unit": 'g',
                "ingredient": 'Halloumi'
            },
            {
                "_id": ObjectId('5f11d8298bf88a002a5ddfb5'),
                "amount": 100,
                "unit": 'g',
                "ingredient": 'Baby corn'
            },
            {
                "_id": ObjectId('5f11d8298bf88a002a5ddfb6'),
                "amount": 100,
                "unit": 'g',
                "ingredient": 'Assorted vegetables'
            },
            {
                "_id": ObjectId('5f11d8298bf88a002a5ddfb7'),
                "amount": 80,
                "unit": 'ml',
                "ingredient": 'Premium sesame oil'
            },
            {
                "_id": ObjectId('5f11d8298bf88a002a5ddfb8'),
                "amount": 5,
                "unit": ' piece(s)',
                "ingredient": 'Tortilla wraps'
            }
        ],
        "equipment": [
            {
                "_id": ObjectId('5f11d8298bf88a002a5ddfb9'),
                "description": 'A sharp knife'
            },
            {
                "_id": ObjectId('5f11d8298bf88a002a5ddfba'),
                "description": 'A frying pan'
            },
            {
                "_id": ObjectId('5f11d8298bf88a002a5ddfbb'),
                "description": 'A container for marinating'
            }
        ],
        "cost": 79.99,
        "maxParticipants": 6,
        "courseImage": '5f11d8288bf88a002a5ddfb0.jpg',
        "ratings": [
            {
                "_id": ObjectId("5f132fa27c4417002ae2a5dd"),
                "userId": ObjectId("5f13504821c45f0061b93001"),
                "firstName": "Maren",
                "rating": 4,
                "title": "Great Course",
                "description": "I loved the course. The wraps were great and I will be making them for my friends soon!",
                "updatedAt": ISODate("2020-07-19T20:20:38.515Z"),
                "createdAt": ISODate("2020-07-19T20:20:38.515Z")
            }
        ],
        "instances": [
            {
                "bookable": true,
                "_id": ObjectId('5f11d8298bf88a002a5ddfbc'),
                "startDate": ISODate('2020-07-19T15:00:00.000Z'),
                "endDate": ISODate('2020-07-19T16:30:00.000Z')
            },
            {
                "bookable": true,
                "_id": ObjectId('5f11d8298bf88a002a5ddfbd'),
                "startDate": ISODate('2020-07-25T15:00:00.000Z'),
                "endDate": ISODate('2020-07-25T16:30:00.000Z')
            },
            {
                "bookable": true,
                "_id": ObjectId('5f11d8298bf88a002a5ddfbe'),
                "startDate": ISODate('2020-08-06T15:00:00.000Z'),
                "endDate": ISODate('2020-08-06T16:30:00.000Z')
            },
            {
                "bookable": true,
                "_id": ObjectId('5f11d8298bf88a002a5ddfbf'),
                "startDate": ISODate('2020-08-14T15:00:00.000Z'),
                "endDate": ISODate('2020-08-14T16:30:00.000Z')
            }
        ],
        "createdAt": ISODate('2020-07-17T16:56:09.566Z'),
        "updatedAt": ISODate('2020-07-17T16:56:09.566Z')
    },
    {
        "_id": ObjectId('5f11db118bf88a002a5ddfc0'),
        "categories": [
            ObjectId('5efcf2689cb3e35fb3ee7b90'),
            ObjectId('5f038e3d744afc109d1a60e2')
        ],
        "title": 'Bibimbap',
        "description": 'Create traditional korean Bibimbap. Lukas learned how to cook delicious Bibimbap in culinary school in Korea. You will learn how to make Bibimbap and how to add your own twist. All the vegetables are regional and special ingredients are imported from Korea. ',
        "dishes": [
            {
                "_id": ObjectId('5f11db128bf88a002a5ddfc2'),
                "course": 'Main Dish',
                "dish": 'Bibimbap'
            },
            {
                "_id": ObjectId('5f11db128bf88a002a5ddfc3'),
                "course": 'Dessert',
                "dish": 'Mochi'
            }
        ],
        "ingredients": [
            {
                "_id": ObjectId('5f11db128bf88a002a5ddfc4'),
                "amount": 100,
                "unit": 'g',
                "ingredient": 'Rice'
            },
            {
                "_id": ObjectId('5f11db128bf88a002a5ddfc5'),
                "amount": 200,
                "unit": 'g',
                "ingredient": 'Beef'
            },
            {
                "_id": ObjectId('5f11db128bf88a002a5ddfc6'),
                "amount": 50,
                "unit": 'g',
                "ingredient": 'Spinach'
            },
            {
                "_id": ObjectId('5f11db128bf88a002a5ddfc7'),
                "amount": 3,
                "unit": ' piece(s)',
                "ingredient": 'Carrots'
            },
            {
                "_id": ObjectId('5f11db128bf88a002a5ddfc8'),
                "amount": 100,
                "unit": 'ml',
                "ingredient": 'Soy Sauce'
            },
            {
                "_id": ObjectId('5f11db128bf88a002a5ddfc9'),
                "amount": 100,
                "unit": 'ml',
                "ingredient": 'Sesame Oil'
            },
            {
                "_id": ObjectId('5f11db128bf88a002a5ddfca'),
                "amount": 2,
                "unit": ' piece(s)',
                "ingredient": 'Eggs'
            },
            {
                "_id": ObjectId('5f11db128bf88a002a5ddfcb'),
                "amount": 2,
                "unit": ' el',
                "ingredient": 'Korean chilli paste'
            },
            {
                "_id": ObjectId('5f11db128bf88a002a5ddfcc'),
                "amount": 6,
                "unit": ' piece(s)',
                "ingredient": 'Homemade Mochi'
            }
        ],
        "equipment": [
            {
                "_id": ObjectId('5f11db128bf88a002a5ddfcd'),
                "description": 'Three Frying pans'
            },
            {
                "_id": ObjectId('5f11db128bf88a002a5ddfce'),
                "description": 'Two serving bowls'
            },
            {
                "_id": ObjectId('5f11db128bf88a002a5ddfcf'),
                "description": 'A sharp knife'
            }
        ],
        "cost": 119.99,
        "maxParticipants": 7,
        "courseImage": '5f11db118bf88a002a5ddfc0.jpg',
        "ratings": [],
        "instances": [
            {
                "bookable": true,
                "_id": ObjectId('5f11db128bf88a002a5ddfd0'),
                "startDate": ISODate('2020-07-21T14:00:00.000Z'),
                "endDate": ISODate('2020-07-21T16:00:00.000Z')
            },
            {
                "bookable": true,
                "_id": ObjectId('5f11db128bf88a002a5ddfd1'),
                "startDate": ISODate('2020-07-30T15:00:00.000Z'),
                "endDate": ISODate('2020-07-30T17:00:00.000Z')
            },
            {
                "bookable": true,
                "_id": ObjectId('5f11db128bf88a002a5ddfd2'),
                "startDate": ISODate('2020-08-12T15:00:00.000Z'),
                "endDate": ISODate('2020-08-12T17:00:00.000Z')
            }
        ],
        "createdAt": ISODate('2020-07-17T17:08:34.226Z'),
        "updatedAt": ISODate('2020-07-17T17:08:34.226Z')
    }

]);


db.orders.insertMany([
    {
        "_id": ObjectId("5f132ba4ddaeba00394bab12"),
        "userId": ObjectId("5f1329caddaeba00394bab10"),
        "portions": 2,
        "deliveryTime": ISODate("2020-07-14T10:00:00.860Z"),
        "paid": true,
        "paymentId": "1BL7578276056362J",
        "email": "michael@cooknow.de",
        "title": "Mr",
        "firstName": "Michael",
        "lastName": "Gigler",
        "houseNumber": "1",
        "streetname": "Bergstraße",
        "zipCode": 80796,
        "city": "Munich",
        "courseInstancesId": ObjectId("5f130ab74663e0002a19018d"),
        "courseId": ObjectId("5f130ab74663e0002a190178"),
        "createdAt": ISODate("2020-07-14T17:04:36.511Z"),
        "updatedAt": ISODate("2020-07-14T17:04:36.511Z")
    },
    {
        "_id": ObjectId("5f132ca1ddaeba00394bab13"),
        "userId": ObjectId("5f1329caddaeba00394bab10"),
        "portions": 1,
        "deliveryTime": ISODate("2020-07-11T13:00:25.474Z"),
        "paid": true,
        "paymentId": "7T283497MS938914N",
        "email": "michael@cooknow.de",
        "title": "Mr",
        "firstName": "Michael",
        "lastName": "Gigler",
        "houseNumber": "1",
        "streetname": "Bergstraße",
        "zipCode": 80796,
        "city": "Munich",
        "courseInstancesId": ObjectId("5f1302484663e0002a190174"),
        "courseId": ObjectId("5f1302484663e0002a190162"),
        "createdAt": ISODate("2020-07-11T17:08:49.063Z"),
        "updatedAt": ISODate("2020-07-11T17:08:49.063Z")
    },
    {
        "_id": ObjectId("5f132ca1ddaeba00394bab14"),
        "userId": ObjectId("5f1404e3cff0fa008907eaef"),
        "portions": 2,
        "deliveryTime": ISODate("2020-07-11T14:00:25.474Z"),
        "paid": true,
        "paymentId": "7T283497MS938014N",
        "email": "jenny@cooknow.de",
        "title": "Ms",
        "firstName": "Jenny",
        "lastName": "Pousada",
        "houseNumber": "10a",
        "streetname": "Königinstraße",
        "zipCode": 80331,
        "city": "Munich",
        "courseInstancesId": ObjectId("5f1302484663e0002a190174"),
        "courseId": ObjectId("5f1302484663e0002a190162"),
        "createdAt": ISODate("2020-07-11T09:08:49.063Z"),
        "updatedAt": ISODate("2020-07-11T09:08:49.063Z")
    },
    {
        "_id": ObjectId("5f132ca1ddaeba00394bab15"),
        "userId": ObjectId("5f13504821c45f0061b93001"),
        "portions": 1,
        "deliveryTime": ISODate("2020-07-11T17:00:25.474Z"),
        "paid": true,
        "paymentId": "7JY42066YF644323N",
        "email": "maren@cooknow.de",
        "title": "Ms",
        "firstName": "Maren",
        "lastName": "Hinrichs",
        "houseNumber": "10",
        "streetname": "Wiesenstraße",
        "zipCode": 80800,
        "city": "Munich",
        "courseInstancesId": ObjectId("5f1302484663e0002a190174"),
        "courseId": ObjectId("5f1302484663e0002a190162"),
        "createdAt": ISODate("2020-07-11T09:08:49.063Z"),
        "updatedAt": ISODate("2020-07-11T09:08:49.063Z")
    },
    {
        _id: ObjectId('5f135631d27fb8002a3f79f6'),
        userId: ObjectId('5f13504821c45f0061b93001'),
        portions: 2,
        deliveryTime: ISODate('2020-07-18T20:05:30.316Z'),
        paid: true,
        paymentId: '1FK03937BC368374P',
        email: 'maren@cooknow.de',
        title: 'Ms',
        firstName: 'Maren',
        lastName: 'Hinrichs',
        houseNumber: '10',
        streetname: 'Wiesenstraße',
        zipCode: 80800,
        city: 'Munich',
        courseInstancesId: ObjectId('5f11d8298bf88a002a5ddfbc'),
        courseId: ObjectId('5f11d8288bf88a002a5ddfb0'),
        createdAt: ISODate('2020-07-18T20:06:09.695Z'),
        updatedAt: ISODate('2020-07-18T20:06:09.695Z')
    },
    {
        _id: ObjectId('5f1356c1d27fb8002a3f79f8'),
        userId: ObjectId('5f13504821c45f0061b93001'),
        portions: 2,
        deliveryTime: ISODate('2020-07-18T20:07:22.702Z'),
        paid: true,
        paymentId: '32471829206208010',
        email: 'maren@cooknow.de',
        title: 'Ms',
        firstName: 'Maren',
        lastName: 'Hinrichs',
        houseNumber: '10',
        streetname: 'Wiesenstraße',
        zipCode: 80800,
        city: 'Munich',
        courseInstancesId: ObjectId('5f11db128bf88a002a5ddfd0'),
        courseId: ObjectId('5f11db118bf88a002a5ddfc0'),
        createdAt: ISODate('2020-07-18T20:08:33.912Z'),
        updatedAt: ISODate('2020-07-18T20:08:33.912Z')
    },
    {
        _id: ObjectId('5f1356c1d27fb8002a3f79f9'),
        userId: ObjectId('5f0cbae4473fe0007f918665'),
        portions: 2,
        deliveryTime: ISODate('2020-07-14T20:07:22.702Z'),
        paid: true,
        paymentId: '32471829206208010',
        email: 'maxi@cooknow.de',
        title: 'Mr',
        firstName: 'Maximilian',
        lastName: 'Marsch',
        houseNumber: '42',
        streetname: 'Eichenstraße',
        zipCode: 424242,
        city: 'Munich',
        courseInstancesId: ObjectId('5f12f31739e39f004988820e'),
        courseId: ObjectId('5f12f24d39e39f00498881f2'),
        createdAt: ISODate('2020-07-13T20:08:33.912Z'),
        updatedAt: ISODate('2020-07-13T20:08:33.912Z')
    },
    {
        _id: ObjectId('5f1356c1d27fb8002a3f79fa'),
        userId: ObjectId('5f0cbae4473fe0007f918665'),
        portions: 2,
        deliveryTime: ISODate('2020-07-14T20:07:22.702Z'),
        paid: true,
        paymentId: '32471829206208010',
        email: 'maxi@cooknow.de',
        title: 'Mr',
        firstName: 'Maximilian',
        lastName: 'Marsch',
        houseNumber: '42',
        streetname: 'Eichenstraße',
        zipCode: 424242,
        city: 'Munich',
        courseInstancesId: ObjectId('5f1232b039e39f00498881f0'),
        courseId: ObjectId('5f122c7539e39f004988816e'),
        createdAt: ISODate('2020-07-12T20:08:33.912Z'),
        updatedAt: ISODate('2020-07-12T20:08:33.912Z')
    }

]);

db.users.updateOne(
    {_id: ObjectId('5f1324a861743d01a813ca16')}, {
        $set: {courseIDs: [ObjectId('5f1302484663e0002a190162'), ObjectId('5f130ab74663e0002a190178')]}
    }
);
db.users.updateOne(
    {_id: ObjectId('5f0cb998473fe0007f91865e')}, {
        $set: {courseIDs: [ObjectId('5f122c7539e39f004988816e'),ObjectId('5f12f24d39e39f00498881f2')]}
    }
);

