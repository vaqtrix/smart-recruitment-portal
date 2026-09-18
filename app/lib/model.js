/* ================= MODEL =================
   Single source of truth for the candidate data
   shape, the option lists, statuses, validation
   rules, and the demo seed data.
   ========================================= */

export const POSITIONS = [
  'Frontend Developer',
  'Backend Developer',
  'Full-Stack Developer',
  'UI / UX Designer',
  'QA Engineer',
]

export const QUALIFICATIONS = ['Matriculation', 'Intermediate', "Bachelor's", "Master's", 'PhD']
export const SKILLS = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'UI / UX']
export const MAX_CV_MB = 5

export const STATUS = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
}

export const emptyCandidate = () => ({
  fullName: '', email: '', phone: '', gender: '',
  qualification: '', position: '', experience: '', skills: [], cvName: '',
})

/* Validation used by the apply form. */
export function validateCandidate(data) {
  const errors = {}

  if (!data.fullName?.trim()) errors.fullName = 'Please enter your full name.'
  else if (data.fullName.trim().length < 3) errors.fullName = 'Name must be at least 3 characters.'

  if (!data.email?.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address.'

  if (!data.phone?.trim()) errors.phone = 'Please enter your phone number.'
  else if (!/^[+]?[\d\s-]{7,15}$/.test(data.phone)) errors.phone = 'Enter a valid phone number (7–15 digits).'

  if (!data.gender) errors.gender = 'Please select your gender.'
  if (!data.position) errors.position = 'Please choose a position.'
  if (!data.qualification) errors.qualification = 'Please choose a qualification.'

  if (data.experience === '' || data.experience == null) errors.experience = 'Please enter your experience.'
  else if (Number(data.experience) < 0) errors.experience = 'Experience cannot be negative.'

  if (!data.skills || data.skills.length === 0) errors.skills = 'Select at least one skill.'

  if (!data.cvName) errors.cv = 'Please upload your CV.'
  else if (!/\.(pdf|doc|docx)$/i.test(data.cvName)) errors.cv = 'CV must be a .pdf, .doc or .docx file.'

  return { errors, isValid: Object.keys(errors).length === 0 }
}

/* Demo applications so the admin dashboard is populated on first run. */
export const SEED = [
  {
    id: 'seed-1', fullName: 'Ayesha Khan', email: 'ayesha.khan@example.com',
    phone: '+92 300 1234567', gender: 'Female', qualification: "Bachelor's",
    position: 'Frontend Developer', experience: 3, skills: ['JavaScript', 'React', 'UI / UX'],
    cvName: 'Ayesha_Khan_CV.pdf', status: STATUS.PENDING, appliedAt: '2026-09-10T09:20:00.000Z',
  },
  {
    id: 'seed-2', fullName: 'Bilal Ahmed', email: 'bilal.ahmed@example.com',
    phone: '+92 321 9876543', gender: 'Male', qualification: "Master's",
    position: 'Backend Developer', experience: 5, skills: ['Node.js', 'SQL', 'Python'],
    cvName: 'Bilal_Ahmed_CV.pdf', status: STATUS.ACCEPTED, appliedAt: '2026-09-11T14:05:00.000Z',
  },
  {
    id: 'seed-3', fullName: 'Sana Malik', email: 'sana.malik@example.com',
    phone: '+92 333 4455667', gender: 'Female', qualification: "Bachelor's",
    position: 'UI / UX Designer', experience: 2, skills: ['UI / UX', 'JavaScript'],
    cvName: 'Sana_Malik_CV.docx', status: STATUS.PENDING, appliedAt: '2026-09-12T11:40:00.000Z',
  },
  {
    id: 'seed-4', fullName: 'Usman Tariq', email: 'usman.tariq@example.com',
    phone: '+92 345 1122334', gender: 'Male', qualification: 'Intermediate',
    position: 'QA Engineer', experience: 1, skills: ['SQL', 'JavaScript'],
    cvName: 'Usman_Tariq_CV.pdf', status: STATUS.REJECTED, appliedAt: '2026-09-13T16:15:00.000Z',
  },
]
