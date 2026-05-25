import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

dotenv.config({ path: "./backend/.env" });

const diagnoseDB = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully!");

    const jobsCount = await Job.countDocuments({});
    console.log(`Total jobs in DB: ${jobsCount}`);

    const jobs = await Job.find({}).populate("company");
    
    if (jobsCount === 0) {
      console.log("WARNING: There are 0 jobs in the database! This is why it shows 'No jobs'. Make sure your MongoDB URI is correct and you have actually posted jobs using this database.");
      process.exit(0);
    }

    console.log("\n--- Listing Jobs in Database ---");
    jobs.forEach((job, index) => {
      console.log(`[Job ${index + 1}]`);
      console.log(`  ID: ${job._id}`);
      console.log(`  Title: ${job.title}`);
      console.log(`  Domain: ${job.domain}`);
      console.log(`  Company: ${job.company ? job.company.name : "NULL (No company object!)"}`);
      console.log(`  Created By: ${job.created_by}`);
      console.log(`  Created At: ${job.createdAt}`);
    });

    console.log("\nDiagnostic finished.");
    process.exit(0);
  } catch (error) {
    console.error("Error during diagnosis:", error);
    process.exit(1);
  }
};

diagnoseDB();
