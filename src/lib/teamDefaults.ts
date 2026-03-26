export type PersonRecord = {
  name: string;
  role: string;
  category: string;
  description: string;
  imageUrl: string;
  linkedInLink: string;
  membershipType: "team" | "alumni";
  academicYear: string;
  sortOrder: number;
};

export const defaultPeople: PersonRecord[] = [
  {
    name: "Yogita",
    role: "President",
    category: "Core",
    description:
      "A visionary with a diplomat’s poise, Yogita leads Swaas with fierce creativity and unwavering devotion.",
    imageUrl: "/Team/Yogita.jpeg",
    linkedInLink:
      "https://www.linkedin.com/in/yogita-20a782293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    membershipType: "team",
    academicYear: "2025-2026",
    sortOrder: 1,
  },
  {
    name: "Shreya",
    role: "General Secretary",
    category: "Core",
    description:
      "Composed in thought and precise in action, Shreya brings balance to the heart of Swaas.",
    imageUrl: "/Team/Shreya.png",
    linkedInLink:
      "https://www.linkedin.com/in/shreyarai21?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    membershipType: "team",
    academicYear: "2025-2026",
    sortOrder: 2,
  },
  {
    name: "Kashish",
    role: "Vice President",
    category: "Core",
    description:
      "Soft in tone, steady in will, Kashish keeps the rhythm of Swaas moving with purpose.",
    imageUrl: "/Team/Kashish.jpeg",
    linkedInLink:
      "https://www.linkedin.com/posts/kashish-chauhan-423916293_googlecareercertificates-coursera-pythonfordataanalytics-activity-7354596082250657792-iI8G?utm_source=share&utm_medium=member_android&rcm=ACoAAEcgmqoBO3Poo4uyB7O4bc6dXFqPtzBIs5Y",
    membershipType: "team",
    academicYear: "2025-2026",
    sortOrder: 3,
  },
  {
    name: "Avneet",
    role: "Execution Lead",
    category: "Execution",
    description:
      "Every plan, every pivot, every last-minute save, Avneet powers Swaas behind the scenes.",
    imageUrl: "/Team/avneet.jpeg",
    linkedInLink: "",
    membershipType: "team",
    academicYear: "2025-2026",
    sortOrder: 4,
  },
  {
    name: "Harleen Kaur",
    role: "Design Lead",
    category: "Design",
    description:
      "Harleen shapes Swaas’s visual identity with care and curiosity in every frame.",
    imageUrl: "/Team/harleendesign.jpeg",
    linkedInLink: "https://www.linkedin.com/in/harleen-kaur-4671b4302",
    membershipType: "team",
    academicYear: "2025-2026",
    sortOrder: 5,
  },
  {
    name: "Pooja",
    role: "Design Co-Lead",
    category: "Design",
    description:
      "Pooja brings ideas to life with designs that connect and inspire.",
    imageUrl: "/Team/pooja.jpeg",
    linkedInLink:
      "https://www.linkedin.com/in/pooja-bhagat0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    membershipType: "team",
    academicYear: "2025-2026",
    sortOrder: 6,
  },
  {
    name: "Aman",
    role: "Technical Lead",
    category: "Technical",
    description:
      "Focused, fluent, and dependable, Aman is one of the digital architects behind Swaas.",
    imageUrl: "/Team/aman.jpeg",
    linkedInLink:
      "https://www.linkedin.com/in/amansingh08?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    membershipType: "team",
    academicYear: "2025-2026",
    sortOrder: 7,
  },
  {
    name: "Tannu",
    role: "Social Media Lead",
    category: "SocialMedia",
    description:
      "Tannu is the voice behind the digital heartbeat of Swaas.",
    imageUrl: "/Team/tannuy.jpeg",
    linkedInLink:
      "https://www.linkedin.com/in/tannu-yadav-4b0330339?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    membershipType: "team",
    academicYear: "2025-2026",
    sortOrder: 8,
  },
  {
    name: "Chinmay",
    role: "Social Media Co-Lead",
    category: "SocialMedia",
    description:
      "Chinmay ensures every post reflects the spirit of SWAAS with consistency and care.",
    imageUrl: "/Team/Chinmay.jpeg",
    linkedInLink:
      "https://www.linkedin.com/in/chinmay-sachdeva-a70a29378?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    membershipType: "team",
    academicYear: "2025-2026",
    sortOrder: 9,
  },
  {
    name: "Karman",
    role: "Content Lead",
    category: "Content",
    description:
      "Karman helps shape the voice of Swaas one careful line at a time.",
    imageUrl: "/Team/karman.jpeg",
    linkedInLink:
      "https://www.linkedin.com/in/karman-kaur-nayyar-01b04a303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    membershipType: "team",
    academicYear: "2025-2026",
    sortOrder: 10,
  },
  {
    name: "Manya",
    role: "Outreach Lead",
    category: "Outreach",
    description:
      "Manya is a natural connector who makes every campaign louder and more memorable.",
    imageUrl: "/Team/Manya.jpeg",
    linkedInLink:
      "https://www.linkedin.com/in/manya-chandna-42a9ba31b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    membershipType: "team",
    academicYear: "2025-2026",
    sortOrder: 11,
  },
  {
    name: "Dr. Manpreet Kaur Bagga",
    role: "Convener",
    category: "Convener",
    description:
      "Dr. Manpreet Kaur Bagga guides SWAAS with a focus on meaningful initiatives and student development.",
    imageUrl: "/Team/ManpreetKaur.png",
    linkedInLink: "",
    membershipType: "team",
    academicYear: "2025-2026",
    sortOrder: 12,
  },
  {
    name: "Yogita",
    role: "President",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/Yogita.jpeg",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2025-2026",
    sortOrder: 1,
  },
  {
    name: "Shreya Rai",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/Shreya.png",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2025-2026",
    sortOrder: 2,
  },
  {
    name: "Manya",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/Manya.jpeg",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2025-2026",
    sortOrder: 3,
  },
  {
    name: "Aman",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/aman.jpeg",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2025-2026",
    sortOrder: 4,
  },
  {
    name: "Abbas Das Nishant",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/abbasnishantdas.png",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2025-2026",
    sortOrder: 5,
  },
  {
    name: "Mehak Lakhina",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/ML.jpg",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2024-2025",
    sortOrder: 6,
  },
  {
    name: "Vanshika Tanwar",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/VT.jpg",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2024-2025",
    sortOrder: 7,
  },
  {
    name: "Prabhsurat Singh",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/PS.jpg",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2024-2025",
    sortOrder: 8,
  },
  {
    name: "Prableen Singh",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/PS1.jpg",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2024-2025",
    sortOrder: 9,
  },
  {
    name: "Harjot Kaur",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/HK.jpg",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2024-2025",
    sortOrder: 10,
  },
  {
    name: "Ishwardeep Singh",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/I.png",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2024-2025",
    sortOrder: 11,
  },
  {
    name: "Jagrit Khurana",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/Jakrit.jpeg",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2024-2025",
    sortOrder: 12,
  },
  {
    name: "Devanshi Sharma",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/ds.jpeg",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2024-2025",
    sortOrder: 13,
  },
  {
    name: "Neeraj Gandhi",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/N.jpg",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2024-2025",
    sortOrder: 14,
  },
  {
    name: "Avneet",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/avneet.jpeg",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2023-2024",
    sortOrder: 15,
  },
  {
    name: "Karman",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/karman.jpeg",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2023-2024",
    sortOrder: 16,
  },
  {
    name: "Kashish",
    role: "",
    category: "Alumni",
    description: "",
    imageUrl: "/Originals/Kashish.jpeg",
    linkedInLink: "",
    membershipType: "alumni",
    academicYear: "2023-2024",
    sortOrder: 17,
  },
];

export function buildTeamPayload(records: PersonRecord[]) {
  const currentTeam = records
    .filter((person) => person.membershipType === "team")
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))
    .reduce<Record<string, PersonRecord[]>>((acc, person) => {
      if (!acc[person.category]) {
        acc[person.category] = [];
      }
      acc[person.category].push(person);
      return acc;
    }, {});

  const alumni = records
    .filter((person) => person.membershipType === "alumni")
    .sort((a, b) => {
      const yearCompare = b.academicYear.localeCompare(a.academicYear);
      if (yearCompare !== 0) return yearCompare;
      return a.sortOrder - b.sortOrder || a.name.localeCompare(b.name);
    });

  return { currentTeam, alumni };
}

export const defaultTeamPayload = buildTeamPayload(defaultPeople);
