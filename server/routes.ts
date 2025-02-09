import { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertPostSchema, insertReelSchema, insertFundingSchema, insertTutorialSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express) {
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    const user = await storage.getUser(parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  });

  app.post("/api/users", async (req, res) => {
    const parsed = insertUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    const user = await storage.createUser(parsed.data);
    res.status(201).json(user);
  });

  app.get("/api/users", async (_req, res) => {
    const users = await db.select().from(users);
    res.json(users);
  });

  // Post routes
  app.get("/api/posts", async (_req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.post("/api/posts", async (req, res) => {
    const parsed = insertPostSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid post data" });
    }
    const post = await storage.createPost(parsed.data);
    res.status(201).json(post);
  });

  // Reel routes
  app.get("/api/reels", async (_req, res) => {
    const reels = await storage.getReels();
    res.json(reels);
  });

  app.post("/api/reels", async (req, res) => {
    const parsed = insertReelSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid reel data" });
    }
    const reel = await storage.createReel(parsed.data);
    res.status(201).json(reel);
  });

  // Funding routes
  app.get("/api/funding", async (_req, res) => {
    const requests = await storage.getFundingRequests();
    res.json(requests);
  });

  app.post("/api/funding", async (req, res) => {
    const parsed = insertFundingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid funding request data" });
    }
    const request = await storage.createFundingRequest(parsed.data);
    res.status(201).json(request);
  });

  // Tutorial routes
  app.get("/api/tutorials", async (_req, res) => {
    const tutorials = await storage.getTutorials();
    res.json(tutorials);
  });

  app.post("/api/tutorials", async (req, res) => {
    const parsed = insertTutorialSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid tutorial data" });
    }
    const tutorial = await storage.createTutorial(parsed.data);
    res.status(201).json(tutorial);
  });

  const server = createServer(app);
  return server;
}