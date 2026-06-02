import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { google } from "googleapis";
import nodemailer from "nodemailer";

dotenv.config();

// Prisma Setup (MariaDB on NAS)
const dbUrl = process.env.DATABASE_URL || "mysql://user:password@localhost:3306/portfolio";
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
} as any);

// Gmail & SMTP Helper (Robust / NAS Compatible)
async function sendEmail(name: string, email: string, message: string) {
  const targetEmail = "contact@vinamrakumar.com";
  const subject = `Portfolio Contact from ${name}`;

  // 1. SMTP (Robust & NAS Friendly)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: targetEmail,
        replyTo: email,
        subject: subject,
        html: `
          <h3>New contact request</h3>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
          <br/><hr/>
          <p><small>Sent via Nodemailer (Self-Hosted MariaDB/NAS)</small></p>
        `,
      });
      console.log("Email sent via SMTP.");
      return;
    } catch (smtpErr) {
      console.error("SMTP failed, attempting Google fallback:", smtpErr);
    }
  }

  // 2. Google APIs Fallback
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/gmail.send"],
    });
    const authClient = await auth.getClient() as any;
    const gmail = google.gmail({ version: "v1", auth: authClient });

    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
    
    const emailLines = [
      `To: ${targetEmail}`,
      "Content-Type: text/html; charset=utf-8",
      "MIME-Version: 1.0",
      `Subject: ${utf8Subject}`,
      "",
      `<h3>New contact request</h3>`,
      `<p><strong>From:</strong> ${name} (${email})</p>`,
      `<p><strong>Message:</strong></p>`,
      `<p style="white-space: pre-wrap;">${message}</p>`,
      "<br/>",
      "<hr/>",
      "<p><small>Sent via Google Workspace Integration (Prisma/MariaDB Port)</small></p>"
    ];

    const raw = Buffer.from(emailLines.join("\r\n"))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });
    console.log("Gmail notification sent.");
  } catch (error) {
    console.error("Gmail notification failed:", error);
  }
}

async function seedData() {
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    console.log("Seeding initial projects...");
    await prisma.project.createMany({
      data: [
        {
          title: "NEXUS: AI Troubleshooting",
          tag: "Telecom AI",
          stats: "5M+ Users",
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
          description: "Spearheaded the first AI-driven troubleshooting engine for technical support at Sunrise GmbH, significantly reducing support volume.",
          order: 0
        },
        {
          title: "GenAI Strategy & MVP",
          tag: "Digital Transformation",
          stats: "8M+ CHF Saved",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
          description: "Orchestrating the GenAI roadmap to automate high-volume customer journeys, defining the convergence of LLMs and business strategy.",
          order: 1
        },
        {
          title: "Lido Aviation DMS",
          tag: "Aviation Software",
          stats: "60% Efficiency",
          image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=800",
          description: "Led the transformation of legacy flight navigation data management systems into high-efficiency microservices for Lufthansa Systems.",
          order: 2
        }
      ]
    });
  }

  const expCount = await prisma.experience.count();
  if (expCount < 5) {
    console.log("Seeding full experience history...");
    await prisma.experience.deleteMany({}); // Clear existing to prevent duplicates/conflicts
    
    await prisma.experience.create({
      data: {
        company: "Sunrise GmbH",
        role: "Manager - Digital Transformation",
        period: "03/2024 – Present",
        location: "Zurich, CH",
        description: "Orchestrating high-level digital product strategy across six cross-functional journey teams. Bridging business needs, IT architecture, and emerging tech to redefine customer engagement.",
        achievements: [
          "People Leadership: Leading 6 cross-functional journey teams (UI/UX, Dev, QA, Biz) to unify the digital experience.",
          "C-Level Engagement: Regular reporting and strategy alignment with executive leadership to drive multi-year transformation goals.",
          "Delivery: Secured 8M+ CHF in annual efficiency savings through strategic GenAI integrations and process automation.",
          "Optimized the digital log-in and authentication journey, boosting NPS from 70% to 90%."
        ],
        order: 0
      }
    });

    await prisma.experience.create({
      data: {
        company: "Sunrise GmbH",
        role: "Product Owner (Digital Transformation)",
        period: "09/2022 – 02/2024",
        location: "Zurich, CH",
        description: "Spearheaded the 'Digital First' initiative for technical support, managing a core agile team focused on proactive service and self-care automation.",
        achievements: [
          "Delivered 2.4M CHF additional cost savings through streamlined support flows and 'Digital First' initiatives.",
          "Launched 'NEXUS', the first AI-driven troubleshooting platform, serving 5M+ customers with zero downtime delivery.",
          "Achieved a 20% year-on-year improvement in digital support resolution rates through data-driven prioritization.",
          "Led People Development for a core agile team of 15+ engineers and designers."
        ],
        order: 1
      }
    });

    await prisma.experience.create({
      data: {
        company: "LSY AG / Lufthansa Systems",
        role: "Product Owner",
        period: "03/2018 – 08/2022",
        location: "Zurich, CH",
        description: "Led development for state-of-the-art aviation navigation systems and Data Management Suites (DMS), coordinating between Zurich and Gdansk engineering hubs.",
        achievements: [
          "Revolutionized aviation data production cycles, reducing turnaround from 5 days to 2 days (60% efficiency gain).",
          "Exceeded annual cost-saving targets by 40% through infrastructure modernization and lean product processes.",
          "Successfully navigated complex transition of legacy monoliths to cloud-ready microservices.",
          "Maintained a 0-incident record for safety-critical navigation software updates."
        ],
        order: 2
      }
    });

    await prisma.experience.create({
      data: {
        company: "Lufthansa Systems (via External Partnership)",
        role: "Product Manager – Navigation Services",
        period: "05/2014 – 02/2018",
        location: "Zurich, CH",
        description: "Bridged the gap between airline operational requirements and technical engineering for flight navigation databases and aeronautical maps.",
        achievements: [
          "Streamlined requirement gathering processes for major European airline customers.",
          "Reduced navigation database errors by introducing automated validation checks during the PM review phase.",
          "Coordinated cross-border releases for Lufthansa Group's Lido/Navigation suite."
        ],
        order: 3
      }
    });

    await prisma.experience.create({
      data: {
        company: "Airports Authority of India (AAI)",
        role: "Manager Operations – Air Traffic Control",
        period: "04/2005 – 04/2014",
        location: "India",
        description: "Commanded radar-based operations in safety-regulated, high-stress aviation environments. Managed mission-critical systems and led tactical decision-making.",
        achievements: [
          "People Leadership: Directed operational shifts and mentored over 50 junior controllers in mission-critical environments.",
          "Stakeholder Engagement: Coordinated with international aviation bodies and regulatory agencies for airspace design.",
          "Delivery: Led implementation of standardized procedural updates that increased runway throughput by 10%.",
          "Managed safe traffic flow for up to 60 aircraft per hour with zero-error performance under pressure."
        ],
        order: 4
      }
    });
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Try to seed data (ignore if fails during build/env issues)
  seedData().catch(err => console.warn("Seed failed (ignorable if DB not ready):", err.message));

  // Contact Form Endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "Name, email, and message are required to reveal the personal email." });
      }

      console.log(`[CONTACT] Message from ${name} <${email}>`);

      // Store in MariaDB via Prisma
      await prisma.message.create({
        data: {
          name,
          email,
          message
        }
      });

      // Email Notification - NON-BLOCKING
      sendEmail(name, email, message);
      
      res.json({ 
        success: true, 
        message: "Thank you! Verification successful.",
        email: "contact@vinamrakumar.com" // Return the email on success
      });
    } catch (error: any) {
      console.error("Error in /api/contact:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Reveal Email Endpoint (Restricted - now requires form submission to be accessible via logic)
  app.get("/api/reveal-email", (req, res) => {
    res.status(403).json({ error: "Email revelation now requires verification via contact form." });
  });

  // Reveal Phone Endpoint
  app.get("/api/reveal-phone", (req, res) => {
    const phone = process.env.CONTACT_PHONE || "+41 76 326 31 55";
    res.json({ phone });
  });

  // Projects Endpoint
  app.get("/api/projects", async (req, res) => {
    try {
      // Simulate network jitter/latency for perceived performance test
      if (process.env.SIMULATE_LATENCY) await new Promise(r => setTimeout(r, 1200));
      
      const projects = await prisma.project.findMany({
        orderBy: { order: "asc" }
      });
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Experiences Endpoint
  app.get("/api/experiences", async (req, res) => {
    try {
      if (process.env.SIMULATE_LATENCY) await new Promise(r => setTimeout(r, 1800));

      const experiences = await prisma.experience.findMany({
        orderBy: { order: "asc" }
      });
      res.json(experiences);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      res.status(500).json({ error: "Failed to fetch experiences" });
    }
  });

  // DB Status Endpoint for NAS/Self-hosting verification
  app.get("/api/db-status", async (req, res) => {
    try {
      await prisma.$connect();
      res.json({ 
        connected: true,
        type: "MariaDB/Prisma",
        persistence: "MariaDB (Docker on Synology)",
        status: "active"
      });
    } catch (err) {
      res.json({ 
        connected: false,
        type: "MariaDB/Prisma",
        persistence: "Connection Failed",
        status: "offline"
      });
    }
  });

  // Analytics Endpoint
  app.post("/api/analytics", async (req, res) => {
    try {
      const { event, details } = req.body;
      
      await prisma.analytics.create({
        data: {
          event,
          details: JSON.stringify(details || {})
        }
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving analytics:", error);
      res.status(500).json({ success: false });
    }
  });

  // Serve portfolio.html for standalone requests
  app.get("/portfolio.html", (req, res) => {
    res.sendFile(path.join(process.cwd(), "portfolio.html"));
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
