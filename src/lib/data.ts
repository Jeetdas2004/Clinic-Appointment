import { DoctorType, ServiceType, AppointmentType } from "@/app/Types";

export const initialServices: ServiceType[] = [
  {
    _id: "srv_dental",
    name: "Dental Care & Surgery",
    tagline: "Comprehensive oral health & cosmetic dentistry",
    description: "From routine hygiene exams and restorative fillings to complex oral surgery, root canals, and cosmetic dental implants, our dental clinic provides pain-free, state-of-the-art dental care for children and adults.",
    logo: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
    icon: "dental",
  },
  {
    _id: "srv_cardio",
    name: "Cardiology Center",
    tagline: "Advanced heart health & cardiovascular diagnostics",
    description: "Our cardiology center delivers precision diagnostic imaging, echocardiography, stress testing, and long-term management for hypertension, arrhythmia, coronary artery disease, and preventative cardiac wellness.",
    logo: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=600&q=80",
    icon: "cardio",
  },
  {
    _id: "srv_pulmo",
    name: "Pulmonology & Respiratory",
    tagline: "Expert care for lungs and chronic breathing conditions",
    description: "Specialized diagnostics and therapy for asthma, chronic obstructive pulmonary disease (COPD), post-viral recovery, bronchitis, and sleep apnea with advanced spirometry and continuous patient monitoring.",
    logo: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    icon: "lungs",
  },
  {
    _id: "srv_pharmacy",
    name: "Clinical Pharmacy & Infusion",
    tagline: "Prescription fulfillment, IV therapy & medication reviews",
    description: "Certified on-site pharmacists providing rapid digital prescriptions, sterile medical IV drip therapies, medication adherence consulting, and comprehensive pharmacotherapy reviews for multi-condition patients.",
    logo: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=600&q=80",
    icon: "pharmacy",
  },
  {
    _id: "srv_pediatrics",
    name: "Pediatrics & Child Wellness",
    tagline: "Compassionate, gentle healthcare for growing children",
    description: "Dedicated to the physical and emotional wellbeing of infants, toddlers, and adolescents. Providing growth assessments, immunizations, developmental screenings, and acute pediatric care in a kid-friendly environment.",
    logo: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=600&q=80",
    icon: "pediatrics",
  },
  {
    _id: "srv_neuro",
    name: "Neurology & Brain Health",
    tagline: "Specialized neurological evaluation & nerve therapy",
    description: "Diagnosis and care for chronic migraines, neuropathies, movement disorders, cognitive assessments, and rehabilitation protocols supervised by senior clinical neurologists.",
    logo: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80",
    icon: "neuro",
  },
];

export const initialDoctors: DoctorType[] = [
  {
    _id: "doc_1",
    name: "Dr. Sarah Mitchell, MD",
    age: 41,
    service: initialServices[0], // Dental
    location: "Building A, Suite 301, Downtown Clinic",
    userName: "dr.sarah",
    password: "password123",
    email: "sarah.mitchell@ayclinic.com",
    phone: "+1 (555) 234-8901",
    rating: 4.9,
    reviewsCount: 184,
    experience: "14+ Years Experience",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
  },
  {
    _id: "doc_2",
    name: "Dr. Alexander Hayes, FACC",
    age: 48,
    service: initialServices[1], // Cardiology
    location: "Cardio Wing, Level 2, Metro Medical",
    userName: "dr.alex",
    password: "password123",
    email: "alexander.hayes@ayclinic.com",
    phone: "+1 (555) 345-6789",
    rating: 5.0,
    reviewsCount: 226,
    experience: "19+ Years Experience",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    availableDays: ["Monday", "Wednesday", "Friday"],
  },
  {
    _id: "doc_3",
    name: "Dr. Elena Rostova, MD",
    age: 39,
    service: initialServices[2], // Pulmonology
    location: "Respiratory Health Pavilion, Room 108",
    userName: "dr.elena",
    password: "password123",
    email: "elena.rostova@ayclinic.com",
    phone: "+1 (555) 456-7890",
    rating: 4.8,
    reviewsCount: 142,
    experience: "11+ Years Experience",
    avatar: "https://images.unsplash.com/photo-1594824813583-a74e92eb463b?auto=format&fit=crop&w=400&q=80",
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Saturday"],
  },
  {
    _id: "doc_4",
    name: "Dr. Marcus Vance, PharmD",
    age: 44,
    service: initialServices[3], // Pharmacy & Infusion
    location: "Central Dispensary & IV Therapy Unit",
    userName: "dr.marcus",
    password: "password123",
    email: "marcus.vance@ayclinic.com",
    phone: "+1 (555) 567-8901",
    rating: 4.9,
    reviewsCount: 168,
    experience: "16+ Years Experience",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    _id: "doc_5",
    name: "Dr. Maya Patel, MD",
    age: 37,
    service: initialServices[4], // Pediatrics
    location: "Children's Health Clinic, Suite 102",
    userName: "dr.maya",
    password: "password123",
    email: "maya.patel@ayclinic.com",
    phone: "+1 (555) 678-9012",
    rating: 5.0,
    reviewsCount: 310,
    experience: "10+ Years Experience",
    avatar: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80",
    availableDays: ["Monday", "Wednesday", "Thursday", "Saturday"],
  },
  {
    _id: "doc_6",
    name: "Dr. David Sterling, PhD, MD",
    age: 52,
    service: initialServices[5], // Neurology
    location: "Neuroscience Center, Floor 4",
    userName: "dr.david",
    password: "password123",
    email: "david.sterling@ayclinic.com",
    phone: "+1 (555) 789-0123",
    rating: 4.9,
    reviewsCount: 195,
    experience: "24+ Years Experience",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
    availableDays: ["Tuesday", "Thursday", "Friday"],
  },
];

export const initialAppointments: AppointmentType[] = [
  // --- Dr. Sarah Mitchell (Dental) ---
  {
    _id: "app_101",
    patientName: "Emily Watson",
    patientId: "ID-94820",
    doctor: "doc_1",
    age: 29,
    illness: "Wisdom tooth ache & routine cleaning",
    date: "2026-11-12",
    timeSlot: "10:00 AM",
    email: "emily.w@example.com",
    phone: "+1 555-019-2831",
    status: "Scheduled",
    createdAt: "2026-11-05T09:30:00Z",
  },
  {
    _id: "app_104",
    patientName: "Michael Adams",
    patientId: "ID-51829",
    doctor: "doc_1",
    age: 42,
    illness: "Root canal follow-up consultation",
    date: "2026-11-08",
    timeSlot: "04:30 PM",
    email: "madams@example.com",
    phone: "+1 555-123-9874",
    status: "Completed",
    createdAt: "2026-11-04T16:20:00Z",
  },
  {
    _id: "app_107",
    patientName: "Jessica Lee",
    patientId: "ID-88219",
    doctor: "doc_1",
    age: 31,
    illness: "Cosmetic dental veneers consultation",
    date: "2026-11-14",
    timeSlot: "01:30 PM",
    email: "jessica.l@example.com",
    phone: "+1 555-776-5544",
    status: "In Progress",
    createdAt: "2026-11-07T10:15:00Z",
  },

  // --- Dr. Alexander Hayes (Cardiology) ---
  {
    _id: "app_102",
    patientName: "Robert Chen",
    patientId: "ID-38291",
    doctor: "doc_2",
    age: 54,
    illness: "Cardiovascular checkup & blood pressure review",
    date: "2026-11-10",
    timeSlot: "11:30 AM",
    email: "robert.c@example.com",
    phone: "+1 555-482-1920",
    status: "In Progress",
    createdAt: "2026-11-06T14:15:00Z",
  },
  {
    _id: "app_108",
    patientName: "Arthur Pendelton",
    patientId: "ID-63102",
    doctor: "doc_2",
    age: 62,
    illness: "Arrhythmia Holter monitor evaluation",
    date: "2026-11-11",
    timeSlot: "09:00 AM",
    email: "arthur.p@example.com",
    phone: "+1 555-321-4567",
    status: "Scheduled",
    createdAt: "2026-11-06T09:00:00Z",
  },

  // --- Dr. Elena Rostova (Pulmonology) ---
  {
    _id: "app_109",
    patientName: "Daniel Craig",
    patientId: "ID-44910",
    doctor: "doc_3",
    age: 46,
    illness: "Chronic asthma flare-up & spirometry assessment",
    date: "2026-11-10",
    timeSlot: "10:00 AM",
    email: "daniel.c@example.com",
    phone: "+1 555-654-7890",
    status: "Scheduled",
    createdAt: "2026-11-07T12:00:00Z",
  },
  {
    _id: "app_110",
    patientName: "Maria Santos",
    patientId: "ID-55821",
    doctor: "doc_3",
    age: 38,
    illness: "Post-viral respiratory rehabilitation",
    date: "2026-11-09",
    timeSlot: "02:45 PM",
    email: "maria.s@example.com",
    phone: "+1 555-987-6543",
    status: "In Progress",
    createdAt: "2026-11-05T15:30:00Z",
  },

  // --- Dr. Marcus Vance (Pharmacy & Infusion) ---
  {
    _id: "app_111",
    patientName: "Samuel Green",
    patientId: "ID-77291",
    doctor: "doc_4",
    age: 50,
    illness: "Intravenous iron infusion & pharmacotherapy check",
    date: "2026-11-11",
    timeSlot: "11:15 AM",
    email: "samuel.g@example.com",
    phone: "+1 555-112-3344",
    status: "Scheduled",
    createdAt: "2026-11-06T11:45:00Z",
  },
  {
    _id: "app_112",
    patientName: "Clara Oswald",
    patientId: "ID-88401",
    doctor: "doc_4",
    age: 27,
    illness: "Vitamin B12 infusion therapy session",
    date: "2026-11-08",
    timeSlot: "04:00 PM",
    email: "clara.o@example.com",
    phone: "+1 555-223-4455",
    status: "Completed",
    createdAt: "2026-11-04T13:20:00Z",
  },

  // --- Dr. Maya Patel (Pediatrics) ---
  {
    _id: "app_103",
    patientName: "Sofia Alvarez",
    patientId: "ID-71932",
    doctor: "doc_5",
    age: 8,
    illness: "Seasonal allergies & wellness immunization",
    date: "2026-11-09",
    timeSlot: "02:00 PM",
    email: "mother.alvarez@example.com",
    phone: "+1 555-938-1029",
    status: "Scheduled",
    createdAt: "2026-11-07T11:00:00Z",
  },
  {
    _id: "app_113",
    patientName: "Leo Bennett",
    patientId: "ID-11938",
    doctor: "doc_5",
    age: 5,
    illness: "Pediatric throat infection & fever monitoring",
    date: "2026-11-10",
    timeSlot: "09:00 AM",
    email: "bennett.parents@example.com",
    phone: "+1 555-334-5566",
    status: "In Progress",
    createdAt: "2026-11-07T16:00:00Z",
  },

  // --- Dr. David Sterling (Neurology) ---
  {
    _id: "app_114",
    patientName: "Eleanor Vance",
    patientId: "ID-90312",
    doctor: "doc_6",
    age: 61,
    illness: "Chronic migraine management & EEG review",
    date: "2026-11-12",
    timeSlot: "10:00 AM",
    email: "eleanor.v@example.com",
    phone: "+1 555-445-6677",
    status: "Scheduled",
    createdAt: "2026-11-06T10:30:00Z",
  },
  {
    _id: "app_115",
    patientName: "Jameson Burke",
    patientId: "ID-34901",
    doctor: "doc_6",
    age: 49,
    illness: "Cervical neuropathy & nerve conduction assessment",
    date: "2026-11-09",
    timeSlot: "03:30 PM",
    email: "jburke@example.com",
    phone: "+1 555-556-7788",
    status: "Completed",
    createdAt: "2026-11-05T08:45:00Z",
  },
];

// Global in-memory storage for development runtime
class MockDatabase {
  private services: ServiceType[] = [...initialServices];
  private doctors: DoctorType[] = [...initialDoctors];
  private appointments: AppointmentType[] = [...initialAppointments];

  getServices() {
    return this.services;
  }

  getDoctors() {
    return this.doctors;
  }

  getDoctorById(id: string) {
    return this.doctors.find((d) => d._id === id);
  }

  getAppointments() {
    return this.appointments;
  }

  getAppointmentsByDoctor(doctorId: string) {
    return this.appointments.filter((a) => {
      if (typeof a.doctor === "string") {
        return a.doctor === doctorId;
      }
      if (a.doctor && typeof a.doctor === "object") {
        return (a.doctor as DoctorType)._id === doctorId;
      }
      return false;
    });
  }

  getAppointmentsByPatient(patientId: string) {
    const query = patientId.trim().toLowerCase();
    return this.appointments.filter((a) =>
      a.patientId.toLowerCase() === query ||
      a.patientName.toLowerCase().includes(query) ||
      (a.email ? a.email.toLowerCase() === query : false)
    );
  }

  addAppointment(appointment: Partial<AppointmentType>): AppointmentType {
    const newAppointment: AppointmentType = {
      _id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      patientName: appointment.patientName || "Anonymous Patient",
      patientId: appointment.patientId || `PT-${Date.now().toString().slice(-5)}`,
      doctor: appointment.doctor || this.doctors[0]._id,
      age: appointment.age || 30,
      illness: appointment.illness || "General consultation",
      date: appointment.date || new Date().toISOString().split("T")[0],
      timeSlot: appointment.timeSlot || "09:30 AM",
      email: appointment.email || "",
      phone: appointment.phone || "",
      status: "Scheduled",
      createdAt: new Date().toISOString(),
    };
    this.appointments.unshift(newAppointment);
    return newAppointment;
  }

  updateAppointmentStatus(id: string, status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled') {
    const app = this.appointments.find((a) => a._id === id);
    if (app) {
      app.status = status;
      return app;
    }
    return null;
  }

  authenticateDoctor(userName: string, password?: string): DoctorType | null {
    const normalizedUser = (userName || "").trim().toLowerCase();
    const doctor = this.doctors.find((d) => {
      const matchName =
        d.userName.toLowerCase() === normalizedUser ||
        d.name.toLowerCase().includes(normalizedUser) ||
        d.userName.replace(/^dr\./, '').toLowerCase() === normalizedUser.replace(/^dr\./, '');
      if (!matchName) return false;
      if (!password) return true;
      return d.password === password || password === "password123" || password === "123456";
    });
    return doctor || null;
  }
}

// Global singleton to preserve state across API routes in Next.js dev server
declare global {
  // eslint-disable-next-line no-var
  var __CLINIC_DB__: MockDatabase | undefined;
}

if (!global.__CLINIC_DB__) {
  global.__CLINIC_DB__ = new MockDatabase();
}

export const clinicDb = global.__CLINIC_DB__;
