export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
  bullet_points: string[];
  created_at: string;
}
export interface Education {
  id: string;
  title: string;
  institution: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  created_at: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string | null;
  description: string;
  created_at: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category_id: string;
  created_at: string;
}

export interface SkillWithCategory extends Skill {
  skill_categories: SkillCategory;
}