const cron = require('node-cron');
const io = require("../index.js");

// Simulated ride database

    const rides = [
        { id: 1, userId: "user123", status: "ongoing", endTime: new Date(Date.now() + 5000) },  // Ends in 5 sec
        { id: 2, userId: "user456", status: "ongoing", endTime: new Date(Date.now() + 10000) }, // Ends in 10 sec
        { id: 3, userId: "user789", status: "ongoing", endTime: new Date(Date.now() + 15000) }, // Ends in 15 sec
        { id: 4, userId: "user234", status: "ongoing", endTime: new Date(Date.now() + 20000) }, // Ends in 20 sec
        { id: 5, userId: "user567", status: "ongoing", endTime: new Date(Date.now() + 25000) }, // Ends in 25 sec
        { id: 6, userId: "user890", status: "ongoing", endTime: new Date(Date.now() + 30000) }, // Ends in 30 sec
        { id: 7, userId: "user345", status: "completed", endTime: new Date(Date.now() + 35000) }, // Ends in 35 sec
        { id: 8, userId: "user678", status: "ongoing", endTime: new Date(Date.now() + 40000) }, // Ends in 40 sec
        { id: 9, userId: "user901", status: "completed", endTime: new Date(Date.now() + 45000) }, // Ends in 45 sec
        { id: 10, userId: "user012", status: "ongoing", endTime: new Date(Date.now() + 50000) } // Ends in 50 sec
    ];
    
    console.log(rides);
    



const pushRideCompleteNotifications = (getSocketConnections) =>{
    cron.schedule("* * * * *", () => {
        console.log("Checking for completed rides...");
        
        const now = new Date();
        //Getting the IO connections.
        const io = getSocketConnections();
        
        rides.forEach((ride) => {
          if (ride.status === "completed") {
            // ride.status = "completed";
      
            // Send notification to the user
            io.emit("ride_completed", {
              message: `Your ride ${ride.id} is over. Thank you!`,
              rideId: ride.id,
            });
      
            console.log(`Ride ${ride.id} marked as completed.`);
          }
        });
    });
}


module.exports = pushRideCompleteNotifications