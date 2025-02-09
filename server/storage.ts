import type { User, Post, Reel, FundingRequest, Tutorial } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUid(uid: string): Promise<User | undefined>;
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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private reels: Map<number, Reel>;
  private fundingRequests: Map<number, FundingRequest>;
  private tutorials: Map<number, Tutorial>;
  private currentIds: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.reels = new Map();
    this.fundingRequests = new Map();
    this.tutorials = new Map();
    this.currentIds = {
      users: 1,
      posts: 1,
      reels: 1,
      fundingRequests: 1,
      tutorials: 1,
    };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUid(uid: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.uid === uid);
  }

  async createUser(user: Omit<User, "id">): Promise<User> {
    const id = this.currentIds.users++;
    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values()).sort((a, b) =>
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createPost(post: Omit<Post, "id" | "createdAt">): Promise<Post> {
    const id = this.currentIds.posts++;
    const newPost = { ...post, id, createdAt: new Date() };
    this.posts.set(id, newPost);
    return newPost;
  }

  async getReels(): Promise<Reel[]> {
    return Array.from(this.reels.values()).sort((a, b) =>
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createReel(reel: Omit<Reel, "id" | "createdAt">): Promise<Reel> {
    const id = this.currentIds.reels++;
    const newReel = { ...reel, id, createdAt: new Date() };
    this.reels.set(id, newReel);
    return newReel;
  }

  async getFundingRequests(): Promise<FundingRequest[]> {
    return Array.from(this.fundingRequests.values()).sort((a, b) =>
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createFundingRequest(request: Omit<FundingRequest, "id" | "createdAt">): Promise<FundingRequest> {
    const id = this.currentIds.fundingRequests++;
    const newRequest = { ...request, id, createdAt: new Date() };
    this.fundingRequests.set(id, newRequest);
    return newRequest;
  }

  async getTutorials(): Promise<Tutorial[]> {
    return Array.from(this.tutorials.values()).sort((a, b) =>
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createTutorial(tutorial: Omit<Tutorial, "id" | "createdAt">): Promise<Tutorial> {
    const id = this.currentIds.tutorials++;
    const newTutorial = { ...tutorial, id, createdAt: new Date() };
    this.tutorials.set(id, newTutorial);
    return newTutorial;
  }
}

export const storage = new MemStorage();
