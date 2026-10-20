export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
  rating?: number;
  video?: boolean;
  gradient: string;
}

const GRADIENTS = [
  "from-indigo-500 to-fuchsia-500",
  "from-emerald-400 to-cyan-500",
  "from-amber-400 to-rose-500",
  "from-sky-400 to-indigo-500",
  "from-lime-400 to-emerald-600",
  "from-violet-500 to-purple-600",
  "from-teal-400 to-blue-600",
  "from-orange-400 to-red-500",
  "from-pink-400 to-rose-600",
  "from-cyan-400 to-teal-500",
  "from-fuchsia-500 to-pink-500",
  "from-blue-400 to-indigo-600",
  "from-yellow-400 to-amber-600",
  "from-rose-400 to-orange-500",
] as const;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "KarthiKeyan K",
    company: "Velan Bhavan & Velan Non Veg Restaurant",
    role: "Founder",
    image: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1761202250/KarthiKeyan_K-01_vixye3.jpg",
    rating: 5,
    quote:
      "We are very happy with the digital marketing, social media management, and poster design service by Pixdot – Chennai and Tenkasi. Their creative work for Velan Bhavan & Velan Non Veg Restaurant is excellent. We truly recommend Pixdot to other businesses looking to grow online with professional marketing support.",
    gradient: GRADIENTS[0],
  },
  {
    id: "t2",
    author: "Pradeep Kumar",
    company: "Velan Sweets & Bakery",
    role: "Founder",
    image: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1761202250/Pradeep_kumar-01_pyo95l.jpg",
    rating: 5,
    quote:
      "We are very happy with the social media management and poster design service provided by Pixdot for our brand Velan Sweets & Bakery – Surandai, near Tenkasi. Their creative team designs attractive and eye-catching posters that perfectly match our brand identity.",
    gradient: GRADIENTS[1],
  },
  {
    id: "t3",
    author: "Jaabir Mohamed",
    company: "National College",
    role: "Professor, Head of the Department",
    image: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1761202249/Jaabir_Mohamed-01_ia5cmj.jpg",
    rating: 5,
    quote:
      "Quick people to get the work done as we expect. Promises delivered with good leads. They made our promotions easy and reachable with elite posters and videos. Happy to seek their services again.",
    gradient: GRADIENTS[2],
  },
  {
    id: "t4",
    author: "Jahir Hussain",
    company: "Crescent Halwa",
    role: "Founder",
    image: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1761202249/JAHIR_HUSSAIN-01_tqseiz.jpg",
    rating: 5,
    quote:
      "We're very happy with the packaging design and social media marketing support provided by Pixdot. They understood our brand and created designs that reflect our tradition beautifully. Their team made the process smooth and professional. We highly recommend their services.",
    gradient: GRADIENTS[3],
  },
  {
    id: "t5",
    author: "Azhagi Homemade Products",
    company: "Azhagi Homemade Products",
    role: "Founder",
    image: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1761202257/Azhagi_Homemade_products-01_ug9vty.jpg",
    rating: 5,
    quote:
      "We are very satisfied with the video editing, YouTube handling, and digital marketing services provided by Pixdot. Their team is creative, professional, and understands our brand's needs perfectly. With their support, we've seen better audience reach and engagement. Highly recommend Pixdot for anyone looking for complete digital solutions!",
    gradient: GRADIENTS[4],
  },
  {
    id: "t6",
    author: "Bhavani Gopinath",
    company: "The Brand Box",
    role: "Founder",
    image: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1761202249/Bhavani_Gopinath-01_oejgu9.jpg",
    rating: 5,
    quote:
      "Working with Pixdot team for my store branding and marketing. Professional team. Their work was excellent beyond my expectations. Very much comfortable for communication and approachable. Happy with their work. Much recommended for businesses looking to grow online.",
    gradient: GRADIENTS[5],
  },
  {
    id: "t7",
    author: "Umar Faruk",
    company: "GMT Jewellers",
    role: "Founder",
    image: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1761288917/CASE_19_qbjxd4.webp",
    rating: 5,
    quote:
      "We are very happy with Pixdot, the best digital marketing and branding company in Chennai and Tenkasi. They helped us grow our jewellery business with creative logo design, poster design, and social media marketing. Their team gives very good support and ideas. If anyone is searching for the best branding company or digital marketing service in Tamil Nadu, we strongly recommend Pixdot.",
    gradient: GRADIENTS[6],
  },
  {
    id: "t8",
    author: "Prakash S",
    company: "Landster Pvt Ltd",
    role: "Founder",
    image: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1761288566/CASE_14_gy51bd.webp",
    rating: 5,
    quote:
      "Pixdot — they are the best digital marketing team in Chennai, giving best leads and work-related support for our real-estate company Landster Pvt Ltd. We are very happy and recommend them for anyone looking to improve business online.",
    gradient: GRADIENTS[7],
  },
  {
    id: "t9",
    author: "Asief Ali",
    company: "Spice Club",
    role: "Founder",
    image: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1773308730/CLIENT_NAMES-11_result_qixzjm.webp",
    rating: 5,
    quote:
      "Working with Pixdot has been one of the best decisions for our restaurant branding. They didn't just create posters and menus — they helped bring our vision to life. Every detail, from layout to color combination, reflected our brand personality beautifully. If you want to take your brand to the next level, Pixdot is the team to trust!",
    gradient: GRADIENTS[8],
  },
  {
    id: "t10",
    author: "Hari Krishna",
    company: "2 Innings Sports Club",
    role: "Founder",
    image: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1773308729/CLIENT_NAMES-01_result_wwaibo.webp",
    rating: 5,
    quote:
      "Good service from Pixdot. They are maintaining my page Froliic Sports Club on Instagram and Facebook. We gave them a page with 352 followers — within 3 months they grew it to 408 followers organically with constant activity.",
    gradient: GRADIENTS[9],
  },
  {
    id: "t11",
    author: "Smart Comfort Engineers",
    company: "Smart Comfort Engineers",
    role: "Founder",
    rating: 5,
    quote:
      "After starting digital marketing campaigns our brand visibility increased and we started receiving regular enquiries. Strong support in social media, Google Ads, and branding.",
    gradient: GRADIENTS[10],
  },
  {
    id: "t12",
    author: "Shivek P",
    company: "Pixdot Client",
    role: "Founder",
    rating: 5,
    quote:
      "I recently worked with Pixdot, who exceeded my expectations. They developed a tailored logo for my company. Their expertise in SEO, social media marketing, and content creation was impressive. Communication was clear, and they were always available to address my concerns.",
    gradient: GRADIENTS[11],
  },
  {
    id: "t13",
    author: "Little Buds Montessori",
    company: "Little Buds Montessori",
    role: "Management",
    rating: 5,
    quote:
      "Pixdot provided excellent digital marketing services for our school in Kadayanallur, especially under the Tenkasi district. They supported us with school branding, social media marketing, admission promotion, poster design, and video marketing. Their creative ideas helped us improve our online presence and reach more parents and students. Highly recommended for school digital marketing services in Tenkasi district.",
    gradient: GRADIENTS[12],
  },
  {
    id: "t14",
    author: "Rayyan Windows",
    company: "Rayyan Windows",
    role: "Founder",
    rating: 5,
    quote:
      "I am from Tenkasi and I run Rayyan Windows. I approached Pixdot for website design and website development, and I am very happy with their service. Pixdot is one of the best website design companies in Chennai and Tenkasi. They created a modern, user-friendly, and responsive website that perfectly represents my business. If you are looking for professional website design and development services, I highly recommend Pixdot.",
    gradient: GRADIENTS[13],
  },
];

export const TESTIMONIAL_GROUP_SIZE = 3;

export function getTestimonialGroups(size = TESTIMONIAL_GROUP_SIZE) {
  const groups: Testimonial[][] = [];
  for (let i = 0; i < TESTIMONIALS.length; i += size) {
    groups.push(TESTIMONIALS.slice(i, i + size));
  }
  return groups;
}
