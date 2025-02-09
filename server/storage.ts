import { db } from "./db";
import { desc, eq } from "drizzle-orm";
import {
  users,
  posts,
  reels,
  fundingRequests,
  tutorials,
  type User,
  type Post,
  type Reel,
  type FundingRequest,
  type Tutorial
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUid(uid: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;  // Added this method
  createUser(user: Omit<User, "id">): Promise<User>;
  getPosts(): Promise<Post[]>;
  createPost(post: Omit<Post, "id" | "createdAt">): Promise<Post>;
  getReels(): Promise<Reel[]>;
  createReel(reel: Omit<Reel, "id" | "createdAt">): Promise<Reel>;
  getFundingRequests(): Promise<FundingRequest[]>;
  createFundingRequest(request: Omit<FundingRequest, "id" | "createdAt">): Promise<FundingRequest>;
  getTutorials(): Promise<Tutorial[]>;
  createTutorial(tutorial: Omit<Tutorial, "id" | "createdAt">): Promise<Tutorial>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUid(uid: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.uid, uid));
    return user;
  }

  async getUsers(): Promise<User[]> {  // Added this method implementation
    return db.select().from(users);
  }

  async createUser(user: Omit<User, "id">): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async getPosts(): Promise<Post[]> {
    return db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async createPost(post: Omit<Post, "id" | "createdAt">): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  async getReels(): Promise<Reel[]> {
    return db.select().from(reels).orderBy(desc(reels.createdAt));
  }

  async createReel(reel: Omit<Reel, "id" | "createdAt">): Promise<Reel> {
    const [newReel] = await db.insert(reels).values(reel).returning();
    return newReel;
  }

  async getFundingRequests(): Promise<FundingRequest[]> {
    return db.select().from(fundingRequests).orderBy(desc(fundingRequests.createdAt));
  }

  async createFundingRequest(request: Omit<FundingRequest, "id" | "createdAt">): Promise<FundingRequest> {
    const [newRequest] = await db.insert(fundingRequests).values(request).returning();
    return newRequest;
  }

  async getTutorials(): Promise<Tutorial[]> {
    return db.select().from(tutorials).orderBy(desc(tutorials.createdAt));
  }

  async createTutorial(tutorial: Omit<Tutorial, "id" | "createdAt">): Promise<Tutorial> {
    const [newTutorial] = await db.insert(tutorials).values(tutorial).returning();
    return newTutorial;
  }
}

export const storage = new DatabaseStorage();