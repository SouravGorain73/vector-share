//Static data
export const pricingPlans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "₹0",
    highlighted: false,
    features: [
      "5 file uploads",
      "Basic file sharing",
      "7-day file retention",
      "Email support"
    ],
    cta: "Get Started"
  },
  {
    name: "Premium",
    description: "For individuals with larger needs",
    price: "₹500",
    highlighted: true,
    features: [
      "500 file uploads",
      "Advanced file sharing",
      "30-day file retention",
      "Priority email support",
      "File analytics"
    ],
    cta: "Go Premium"
  },
  {
    name: "Ultimate",
    description: "For teams and businesses",
    price: "₹2500",
    highlighted: false,
    features: [
      "5000 file uploads",
      "Team sharing capabilities",
      "Unlimited file retention",
      "24/7 priority support",
      "Advanced analytics",
      "API access"
    ],
    cta: "Go Ultimate"
  }
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "CreativeMinds Inc.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    quote:
      "VectorShare has transformed how our team collaborates on creative assets. The secure sharing and intuitive interface have made file management a breeze."
  },
  {
    name: "Michael Chen",
    role: "Freelance Designer",
    company: "Self-employed",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    quote:
      "As a freelancer, I need to share large design files with clients securely. VectorShare's simple interface and reasonable pricing make it my go-to solution."
  },
  {
    name: "Priya Sharma",
    role: "Project Manager",
    company: "TechSolutions Ltd.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4,
    quote:
      "Managing project files across multiple teams used to be a nightmare until we found VectorShare. Now everything is organized and accessible exactly when we need it."
  }
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

export const features = [
  {
    title: "Easy File Upload",
    description: "Quickly upload your files with our intuitive drag-and-drop interface.",
    icon: "ArrowUpCircle",
    color: "text-blue-500"
  },
  {
    title: "Secure Storage",
    description: "Your files are encrypted and stored securely in our cloud infrastructure.",
    icon: "Shield",
    color: "text-green-500"
  },
  {
    title: "Simple Sharing",
    description: "Share files with anyone using secure links that you control.",
    icon: "Share2",
    color: "text-purple-500"
  },
  {
    title: "Flexible Credits",
    description: "Pay only for what you use with our credit-based system.",
    icon: "CreditCard",
    color: "text-yellow-500"
  },
  {
    title: "File Management",
    description: "Organize, preview, and manage your files from any device.",
    icon: "FileText",
    color: "text-indigo-500"
  },
  {
    title: "Transaction History",
    description: "Keep track of all your credit purchases and usage.",
    icon: "Clock",
    color: "text-red-500"
  }
];