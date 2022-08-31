require('dotenv').config();

const ExpressServer = require("./app");
const config = require("./config/config");

new ExpressServer(config).setup();


// const {scheduleJob, updateSchedule} = require("./scheduler");

// const express = require('express')
// const app = express()
// const port = 3000

// app.use(express.json());

// app.post('/', async (req, res) => {
//   const jobData = req.body;
//   await scheduleJob(jobData);  
//   res.send('Scheduled');
// })

// app.put('/', async (req, res) => {
//   const jobData = req.body;
//   await updateSchedule(jobData);  
//   res.send('Updated');
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
