var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: 'Sunset Beach',
        image: 'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg',
        description: 'A gorgeous natural area, where you can pitch your tent on the beach. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, nemo quo odit necessitatibus nam amet eligendi cum totam voluptate aliquam repellat incidunt eum non quas quae repellendus fuga deleniti quam?'
    },
    {
        name: 'Hemlock Forest',
        image: 'https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg',
        description: 'Don\'t eat the berries! But, the grove is absolutely beautiful. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, nemo quo odit necessitatibus nam amet eligendi cum totam voluptate aliquam repellat incidunt eum non quas quae repellendus fuga deleniti quam?'
    },
    {
        name: 'Yosemite Cliff Outlook Trail',
        image: 'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg',
        description: 'For those that would rather see the gorgeous cliff-face than make the climb. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, nemo quo odit necessitatibus nam amet eligendi cum totam voluptate aliquam repellat incidunt eum non quas quae repellendus fuga deleniti quam?'
    }
];


function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('Removed any and all campgrounds!');
            
            //Add a few sample campgrounds
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, campground) {
            //         if(err) {
            //             console.log(err);
            //         } else {
            //             console.log("Added a campground: " + campground.name);
                        
            //             //Create a comment
            //             Comment.create(
            //                 {
            //                     text: "This place is great, but I wish there was internet!",
            //                     author: "Homer"
            //                 }, function(err, comment) {
            //                     if(err) {
            //                         console.log(err);
            //                     } else {
            //                         campground.comments.push(comment);
            //                         campground.save();
            //                         console.log("Created new comment");
            //                     }
            //                 })
            //         }
            //     });  
            // });
        }
    });
}
module.exports = seedDB;