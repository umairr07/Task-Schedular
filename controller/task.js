import taskModel from "../model/task.js";
import nodemailer from "nodemailer";
import cron from "node-cron";

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'imumairshaikh07@gmail.com',
        pass: 'hello 123',
    },
});

export const createTask = async (req, res) => {
    try {
        const { task, email, schedule } = req.body;

        // Debugging: Log the task details
        console.log('Received task:', { task, email, schedule });

        // Schedule the task using cron
        const scheduledTask = cron.schedule(schedule, () => {
            const mailOptions = {
                from: 'imumairshaikh07@gmail.com',
                to: email,
                subject: `Scheduled Task: ${task}`,
                text: `This is your scheduled task: ${task}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                    return;
                }

                // Log the task execution in MongoDB
                const emailLog = new taskModel({ task, email, schedule });
                emailLog.save()
                    .then(() => console.log('Task executed and logged'))
                    .catch(err => console.log('Error logging task:', err));

                console.log('Email sent:', info.response);
            });
        });

        // Debugging: Log scheduled task
        console.log('Task scheduled with cron expression:', schedule);

        res.status(200).json({
            message: 'Task added and scheduled successfully'
        });
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).send('Error creating task');
    }
}


export const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find(); // Fetch all tasks from MongoDB
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Error fetching tasks');
    }
}