let logging = require("../logging.js")
const { Event, User } = require('../models')
const Sequelize = require('sequelize')
// const bcrypt = require("bcrypt-nodejs");

const insertEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            title,
            description,
            startDate,
            endDate
        } = req.body;
        const newEvent = await Event.create({
            title,
            description,
            startDate,
            endDate,
            "UserId": id
        });
        

        var mqtt = require('mqtt')
        var client = mqtt.connect("mqtt://gjlwpmmb:wVA7ICcNkB_j@farmer-01.cloudmqtt.com:8080")

        client.on("connect",  () => {
            client.subscribe("presence");
            console.log("Connected to MQTT Broker.");
          });
        client.publish("presence", "Hello world!");
        // client.on('message', function (topic, message) {
        //     // message is Buffer
        //     console.log(message.toString())
        //     client.end()
        // })
        res.status(200).send("inserted date");
    } catch (err) {
        res.status(400).json({
            error: err
        });
    }
}

const getAllEvents = async (req, res) => {
    const id = req.params.id;


    User.findOne({
        where: {
            id: id
        },
        attributes: [
            "id",
            "email"
        ],
        include: [
            {
                model: Event,
                as: 'events',
                attributes: ["title", "description", "startDate", "endDate"]
            }
        ]

    }).then(event => {
        logging.LOG("Event " + event)
        if (event !== null) {

            res.status(200).send(event);
        } else {
            res.status(400).send("Event Doesn't Exist");
        }

    });


}

// const getAllEventsWithAssociates = async (req, res) => {
//     var allEvents = [];
//     try {
//         let eventPresident = await Event.findAll({
//             where: {
//                 type: "presidential"
//             },
//             attributes: [
//                 "title", "type", "date",
//             ],
//             include: [
//                 {
//                     model: Candidate,
//                     as: 'candidate',
//                     attributes: ["name", "eventId"]
//                 }
//             ]

//         });

//         let eventParliamentary = await Event.findAll({
//             where: {
//                 type: "parliamentary"
//             },
//             attributes: [
//                 "title", "type", "date",
//             ],
//             include: [
//                 {
//                     model: Party,
//                     as: 'party',
//                     attributes: ["name", "eventId"]
//                 }
//             ]

//         });

//         let eventReferendum = await Event.findAll({
//             where: {
//                 type: "referendum"
//             },
//             attributes: [
//                 "title", "type", "date",
//             ],
//             include: [
//                 {
//                     model: Referendum,
//                     as: 'referendum',
//                     attributes: ["name", "eventId"]
//                 }
//             ]

//         })
//         allEvents.push(eventPresident,eventParliamentary,eventReferendum);
//         if(allEvents.length == 0)
//           throw "Event Doesn't Exist";

//         res.status(200).send(allEvents);

//     } catch (error) {
//         res.status(400).send(error);
//     }

// }


// const getEventWithAssociates = async (req, res) => {
//     if ("id" in req.body) {
//         if ("type" in req.body) {
//             const {id} = req.body;
//             const {type} = req.body;
//             switch (Event.type) {
//                 case "presidential":
//                     {
//                         Event.findOne({
//                             where: {
//                                 id: id
//                             },
//                             attributes: [
//                                 "title", "type", "date",
//                             ],
//                             include: [
//                                 {
//                                     model: Candidate,
//                                     as: 'candidate',
//                                     attributes: ["name", "eventId"]
//                                 }
//                             ]

//                         }).then(event => {
//                             logging.LOG( "Event " + event)
//                             if (event !== null) {

//                                 res.status(200).send(event);
//                             } else {
//                                 res.status(400).send("Event Doesn't Exist");
//                             }

//                         });
//                         break;
//                     }
//                 case "parliamentary":
//                     {
//                         Event.findOne({
//                             where: {
//                                 id: id
//                             },
//                             attributes: [
//                                 "title", "type", "date",
//                             ],
//                             include: [
//                                 {
//                                     model: Party,
//                                     as: 'party',
//                                     attributes: ["name", "eventId"]
//                                 }
//                             ]

//                         }).then(event => {
//                             logging.LOG( "Event " + event)
//                             if (event !== null) {

//                                 res.status(200).send(event);
//                             } else {
//                                 res.status(400).send("Event Doesn't Exist");
//                             }

//                         });
//                         break;
//                     }
//                 case "referendum":
//                     {
//                         Event.findOne({
//                             where: {
//                                 id: id
//                             },
//                             attributes: [
//                                 "title", "type", "date",
//                             ],
//                             include: [
//                                 {
//                                     model: Referendum,
//                                     as: 'referendum',
//                                     attributes: ["name", "eventId"]
//                                 }
//                             ]

//                         }).then(event => {
//                             logging.LOG( "Event " + event)
//                             if (event !== null) {

//                                 res.status(200).send(event);
//                             } else {
//                                 res.status(400).send("Event Doesn't Exist");
//                             }

//                         });
//                         break;
//                     }

//                 default:
//                     res.status(400).send("Requested event has unknown type");
//                     break;
//             }


//         } else {
//             res.status(400).send("Request missing required properties");
//         }
//     } else {
//         res.status(400).send("Request missing required properties");
//     }

// }

// const reg = async (req, res) => {
// try {
//     console.log(req.body);
//     const {
//       firstName,
//       lastName,
//       email,
//       pwd,
//       cnp,
//       voted_events
//     } = req.body;

//     const newEvent = await Event.create({
//       firstName,
//       lastName,
//       email,
//       pwd,
//       cnp,
//       voted_events

//     });
//     res.status(200).send("register successful");

// } catch (err) {
//     res.status(400).json({
//       error: err
//     });
// }


// }


module.exports = {
    '/insertEvent/:id': {
        post: {
            action: insertEvent,
            level: 'public'
        }
    },
    '/getAllEvents/:id': {
        get: {
            action: getAllEvents,
            level: 'public'
        }
    },
    // '/getEventWithAssociates': {
    //     get: {
    //         action: getEventWithAssociates,
    //         level: 'public'
    //     }
    // },

    // '/getAllEventsWithAssociates': {
    //     get: {
    //         action: getAllEventsWithAssociates,
    //         level: 'public'
    //     }
    // }
    // '/register': {
    // post: {
    //     action: reg,
    //     level: 'public'
    // },
    // },
    // '/profile/:id': {
    // get: {
    //     action: findEvent,
    //     level: 'public'
    // }
    // }
}
