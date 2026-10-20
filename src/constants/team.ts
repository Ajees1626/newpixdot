export interface TeamMember {
  name: string;
  role: string;
  /** Optional short title line above the role, e.g. "Director" */
  title?: string;
  gradient: string;
  image: string;
  bio?: string;
}

export const LEADERSHIP: TeamMember[] = [
  {
    name: "Mohamed Mustafa N",
    title: "Director",
    role: "Business & Brand Consultant",
    bio: "Guiding Pixdot’s creative direction and client strategy — building brands that grow with clarity, craft, and lasting impact.",
    gradient: "from-primary/30 via-secondary/20 to-transparent",
    image:
      "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1784618879/2_j2mpxz.jpg",
  },
];

export const VALUES = [
  { title: "Creative Excellence", description: "We turn bold ideas into powerful brand identities and digital experiences that stand out." },
  { title: "Client First", description: "We build trust through transparency, collaboration, and client-focused solutions." },
  { title: "Innovation Driven", description: "We combine creative thinking, modern technology, and strategic insights to deliver smarter solutions." },
  { title: "Growth Focused", description: "We build scalable brands and digital experiences designed to evolve with businesses and create lasting impact." },
];

export const MILESTONES = [
  {
    year: "2023",
    title: "The Beginning",
    description:
      "Pixdot Solutions was founded with a vision to build impactful brands and digital experiences.",
  },
  {
    year: "2024",
    title: "Expanding Our Expertise",
    description:
      "Expanded our services across branding, web development, app development, and digital marketing.",
  },
  {
    year: "2025",
    title: "Growing Our Impact",
    description:
      "Strengthened client partnerships and delivered creative solutions across diverse industries.",
  },
  {
    year: "2026",
    title: "Innovating the Future",
    description:
      "Embracing new technologies and creative strategies to help businesses grow and stand out.",
  },
];
