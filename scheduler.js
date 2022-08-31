const emailSender = require("./email-sender.service");
const Agenda = require("agenda");

const connectionString = process.env.MONGO_URL;

const agenda = new Agenda({
  db: { address: connectionString, collection: "ourScheduleCollectionName" },
  processEvery: "30 seconds",
});

const createNewJob = (jobName) => {
  agenda.define(
    `${jobName}`,
    { priority: "high", concurrency: 10, shouldSaveResult: false },
    async (job) => {
      // execute sp with job.attrs.data
      console.log("--------------------------------------------");      
      console.log(job.attrs);

      // Wheter or not there will be a next run
      let lastRunAt = job.attrs.lastRunAt;
      let endDate = new Date(job.attrs.data.endDate);

      const interval = 1;
      if (lastRunAt.setMinutes(lastRunAt.getMinutes() + interval) <= endDate) {
        job.attrs.nextRunAt = lastRunAt;
        await job.save();
      }
    }
  );
};

const updateJob = async (jobData) => {
  const startDate = new Date(jobData.startDate);
  await agenda.cancel({name: `${jobData.scheduleID}`}, async  (err, numRemoved) => {
    console.log("deletd");
    createNewJob(jobData.scheduleID);
    await agenda.schedule(startDate, `${jobData.scheduleID}`, { ...jobData });
  });
};

(async function () {
  await agenda.start();
})();

const scheduleJob = async (jobData) => {
  const startDate = new Date(jobData.startDate);
  createNewJob(jobData.scheduleID);
  await agenda.schedule(startDate, `${jobData.scheduleID}`, { ...jobData });
};

const updateSchedule = async (jobData) => {
  await updateJob(jobData);
};

module.exports = { scheduleJob, updateSchedule };
