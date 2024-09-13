import cron from "node-cron"
import nodemailer from "nodemailer"
import taskModel from "../model/task.js";

const scheduleTask = async () => {
    const tasks = await taskModel.find({ status: true });
    tasks.forEach(task => {
        cron.schedule(task.frequency, async () => {
            // Perform task actions (e.g., send email)
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL,
                to: 'recipient@example.com',
                subject: 'Scheduled Email',
                text: 'This is a reminder email!',
            });

            // Log the execution
            task.logs.push({ time: new Date(), message: 'Email sent' });
            await task.save();
        });
    });
};

module.exports = scheduleTask;
