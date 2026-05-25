import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

dotenv.config({ path: "./backend/.env" });

const seedData = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully!");

    // 1. Clear existing sample data to prevent clutter
    console.log("Cleaning database collections...");
    await Job.deleteMany({});
    await Company.deleteMany({});
    // We only delete recruiter user if it has our specific email
    await User.deleteMany({ email: "recruiter@jobportal.com" });

    // 2. Create a default Recruiter User
    console.log("Creating default recruiter user...");
    const hashedPassword = await bcrypt.hash("password123", 10);
    const recruiter = await User.create({
      fullname: "Manish Kumar",
      email: "recruiter@jobportal.com",
      phoneNumber: 9876543210,
      password: hashedPassword,
      role: "recruiter",
      profile: {
        bio: "Senior Technical Talent Acquisition Specialist.",
        skills: ["Recruitment", "Sourcing", "HR Management"],
      },
    });
    console.log(`Recruiter created with ID: ${recruiter._id}`);

    // 3. Create Sample Companies
    console.log("Creating sample companies...");
    const google = await Company.create({
      name: "Google India",
      description: "Google's mission is to organize the world's information and make it universally accessible and useful.",
      website: "https://google.com",
      location: "Bangalore, India",
      userId: recruiter._id,
    });

    const meta = await Company.create({
      name: "Meta",
      description: "Meta builds technologies that help people connect, find communities, and grow businesses.",
      website: "https://meta.com",
      location: "Gurgaon, India",
      userId: recruiter._id,
    });

    const microsoft = await Company.create({
      name: "Microsoft",
      description: "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.",
      website: "https://microsoft.com",
      location: "Hyderabad, India",
      userId: recruiter._id,
    });

    const netflix = await Company.create({
      name: "Netflix Inc.",
      description: "Netflix is the world's leading streaming entertainment service.",
      website: "https://netflix.com",
      location: "Mumbai, India",
      userId: recruiter._id,
    });

    console.log("Companies created successfully!");

    // 4. Create Sample Jobs in Different Domains
    console.log("Creating sample jobs in different domains...");
    
    const sampleJobs = [
      {
        title: "React Frontend Engineer",
        description: "Join our Google Search team to build beautiful, accessible, and fast web experiences using React and TypeScript.",
        requirements: ["React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Web Performance"],
        salary: 18,
        experienceLevel: 2,
        location: "Bangalore",
        jobType: "Full-time",
        domain: "Frontend Developer",
        position: 3,
        company: google._id,
        created_by: recruiter._id,
      },
      {
        title: "Senior UI/UX Front-End Developer",
        description: "We are seeking a creative Frontend Engineer at Meta to collaborate on cutting-edge interfaces for the next-generation social experiences.",
        requirements: ["HTML5", "CSS3", "JavaScript", "React", "UI/UX Design Systems"],
        salary: 24,
        experienceLevel: 4,
        location: "Gurgaon",
        jobType: "Remote",
        domain: "Frontend Developer",
        position: 2,
        company: meta._id,
        created_by: recruiter._id,
      },
      {
        title: "Node.js Backend Developer",
        description: "Scale our massive microservice backend APIs at Netflix. You will design, build, and optimize microservices running on Node.js and AWS.",
        requirements: ["Node.js", "Express", "MongoDB", "Redis", "AWS", "Microservices"],
        salary: 30,
        experienceLevel: 3,
        location: "Mumbai",
        jobType: "Full-time",
        domain: "Backend Developer",
        position: 4,
        company: netflix._id,
        created_by: recruiter._id,
      },
      {
        title: "Database Architect & Systems Engineer",
        description: "Meta is looking for a systems backend engineer to optimize high-throughput distributed database platforms and backend core engines.",
        requirements: ["MongoDB", "PostgreSQL", "C++", "Go", "Docker", "Database Tuning"],
        salary: 28,
        experienceLevel: 5,
        location: "Gurgaon",
        jobType: "Full-time",
        domain: "Backend Developer",
        position: 1,
        company: meta._id,
        created_by: recruiter._id,
      },
      {
        title: "Full-Stack Developer (MERN)",
        description: "Responsible for building the entire recruitment web portal. Managing the frontend client, backend APIs, and database migrations.",
        requirements: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
        salary: 15,
        experienceLevel: 1,
        location: "Bangalore",
        jobType: "Full-time",
        domain: "MERN Developer",
        position: 2,
        company: google._id,
        created_by: recruiter._id,
      },
      {
        title: "AI Research Engineer",
        description: "Develop cutting-edge generative AI models and intelligent agents at Microsoft. Apply LLM tuning and retrieval-augmented generation (RAG) at scale.",
        requirements: ["Python", "PyTorch", "Hugging Face", "LLMs", "RAG", "Vector Databases"],
        salary: 36,
        experienceLevel: 3,
        location: "Hyderabad",
        jobType: "Full-time",
        domain: "AI Engineer",
        position: 2,
        company: microsoft._id,
        created_by: recruiter._id,
      },
      {
        title: "Lead Data Scientist",
        description: "Extract actionable insights and build prediction engines for Netflix's recommendation algorithms using advanced statistical models.",
        requirements: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Machine Learning", "A/B Testing"],
        salary: 32,
        experienceLevel: 5,
        location: "Mumbai",
        jobType: "Full-time",
        domain: "Data Scientist",
        position: 1,
        company: netflix._id,
        created_by: recruiter._id,
      },
      {
        title: "Cybersecurity Analyst",
        description: "Secure our cloud endpoints, manage penetration testing cycles, and configure virtual firewalls to protect user data privacy.",
        requirements: ["Ethical Hacking", "Metasploit", "OWASP", "SIEM Tools", "Network Security"],
        salary: 16,
        experienceLevel: 2,
        location: "Bangalore",
        jobType: "Full-time",
        domain: "Cybersecurity",
        position: 2,
        company: google._id,
        created_by: recruiter._id,
      }
    ];

    await Job.insertMany(sampleJobs);
    console.log("Sample jobs created successfully!");
    console.log("Database seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding database:", error);
    process.exit(1);
  }
};

seedData();
