import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

dotenv.config({ path: "./backend/.env" });

const cleanSeededData = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully!");

    // 1. Find the seeded recruiter
    const seededRecruiter = await User.findOne({ email: "recruiter@jobportal.com" });
    
    if (!seededRecruiter) {
      console.log("No seeded recruiter 'recruiter@jobportal.com' found. The database might have already been cleaned.");
      process.exit(0);
    }

    console.log(`Found seeded recruiter with ID: ${seededRecruiter._id}`);

    // 2. Delete all jobs created by the seeded recruiter
    console.log("Deleting seeded jobs...");
    const deletedJobsCount = await Job.deleteMany({ created_by: seededRecruiter._id });
    console.log(`Successfully deleted ${deletedJobsCount.deletedCount} seeded jobs.`);

    // 3. Delete all companies created by the seeded recruiter
    console.log("Deleting seeded companies...");
    const deletedCompaniesCount = await Company.deleteMany({ userId: seededRecruiter._id });
    console.log(`Successfully deleted ${deletedCompaniesCount.deletedCount} seeded companies.`);

    // 4. Delete the seeded recruiter itself
    console.log("Deleting seeded recruiter account...");
    await User.deleteOne({ _id: seededRecruiter._id });
    console.log("Successfully deleted seeded recruiter account.");

    console.log("Clean-up completed! The database is now ready for your actual posted jobs.");
    process.exit(0);
  } catch (error) {
    console.error("Error during cleaning seeded data:", error);
    process.exit(1);
  }
};

cleanSeededData();
