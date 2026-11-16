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


export const features = [
  {
    title: "Easy File Upload",
    description: "Quickly upload your files with our intuitive drag-and-drop interface. Supports all file types up to 50MB.",
    icon: "ArrowUpCircle"
  },
  {
    title: "Secure Storage",
    description: "Your files are encrypted and stored securely in our cloud infrastructure with enterprise-grade protocols.",
    icon: "Shield"
  },
  {
    title: "Simple Sharing",
    description: "Share files with anyone using secure links that you control. Toggle between public and private anytime.",
    icon: "Share2"
  },
  {
    title: "Google OAuth",
    description: "Sign in seamlessly with your Google account. No passwords to remember, instant access.",
    icon: "Globe"
  },
  {
    title: "File Management",
    description: "Organize, preview, and manage your files from any device with our responsive dashboard.",
    icon: "FileText"
  },
  {
    title: "Link Controls",
    description: "Regenerate share links, toggle visibility, and maintain full control over your shared content.",
    icon: "Link"
  }
];

export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Security", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "1M+", label: "Files Shared" },
  { value: "99.9%", label: "Uptime" },
  { value: "256-bit", label: "Encryption" },
];