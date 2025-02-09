import type { User, Post, Reel, FundingRequest, Tutorial } from "@shared/schema";

const STORAGE_KEYS = {
  POSTS: "athlete_bridge_posts",
  REELS: "athlete_bridge_reels",
  FUNDING: "athlete_bridge_funding",
  TUTORIALS: "athlete_bridge_tutorials",
  USERS: "athlete_bridge_users",
} as const;

export const storage = {
  getPosts: (): Post[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || "[]");
  },
  addPost: (post: Post) => {
    const posts = storage.getPosts();
    posts.unshift(post);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  },
  getReels: (): Reel[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REELS) || "[]");
  },
  addReel: (reel: Reel) => {
    const reels = storage.getReels();
    reels.unshift(reel);
    localStorage.setItem(STORAGE_KEYS.REELS, JSON.stringify(reels));
  },
  getFundingRequests: (): FundingRequest[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FUNDING) || "[]");
  },
  addFundingRequest: (request: FundingRequest) => {
    const requests = storage.getFundingRequests();
    requests.unshift(request);
    localStorage.setItem(STORAGE_KEYS.FUNDING, JSON.stringify(requests));
  },
  getTutorials: (): Tutorial[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TUTORIALS) || "[]");
  },
  addTutorial: (tutorial: Tutorial) => {
    const tutorials = storage.getTutorials();
    tutorials.unshift(tutorial);
    localStorage.setItem(STORAGE_KEYS.TUTORIALS, JSON.stringify(tutorials));
  },
  getUsers: (): User[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
  },
  addUser: (user: User) => {
    const users = storage.getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },
  getUserById: (id: number): User | undefined => {
    const users = storage.getUsers();
    return users.find(user => user.id === id);
  }
};
