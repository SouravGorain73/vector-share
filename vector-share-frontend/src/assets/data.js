//Static data
export const plans = [
  {
    id: "p1",
    name: "Free",
    price: 0,
    storage: 15, // GB
    features: ["Basic Upload", "Limited Sharing"],
  },
  {
    id: "p2",
    name: "Pro",
    price: 199,
    storage: 100,
    features: ["Unlimited Upload", "Advanced Sharing", "Semantic Search"],
  },
  {
    id: "p3",
    name: "Enterprise",
    price: 499,
    storage: 1000,
    features: ["Team Access", "Priority Support", "AI Search"],
  },
];

export const subscriptions = [
  {
    userId: "u1",
    planId: "p2",
    startDate: "2026-04-01",
    expiryDate: "2026-05-01",
    status: "active",
  },
  {
    userId: "u2",
    planId: "p1",
    startDate: "2026-04-01",
    expiryDate: null,
    status: "active",
  },
]; 


export const transactions = [
  {
    id: "t1",
    userId: "u1",
    amount: 199,
    plan: "Pro",
    status: "Success",
    date: "2026-04-01",
    paymentMethod: "UPI",
  },
  {
    id: "t2",
    userId: "u1",
    amount: 199,
    plan: "Pro",
    status: "Success",
    date: "2026-03-01",
    paymentMethod: "Card",
  },
];

export const dashboardStats = {
  totalFiles: 24,
  totalStorageUsed: 12.5,
  totalSharedFiles: 6,
  recentUploads: 5,
};


export const notifications = [
  {
    id: "n1",
    message: "Your Pro plan will expire in 3 days",
    type: "warning",
  },
  {
    id: "n2",
    message: "File shared successfully",
    type: "success",
  },
];

export const publicFiles = [
  {
    id: "f2",
    name: "Resume.docx",
    owner: "Sourav",
    downloads: 34,
    likes: 10,
  },
];

export const uploads = [
  {
    id: "up1",
    fileName: "Project_Report.pdf",
    progress: 100,
    status: "Completed",
  },
  {
    id: "up2",
    fileName: "Video.mp4",
    progress: 60,
    status: "Uploading",
  },
];

export const teams = [
  {
    id: "team1",
    name: "College Project Team",
    members: ["u1", "u2"],
  },
];