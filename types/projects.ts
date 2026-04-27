export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description_es: string;
  full_description_es: string;
  bullet_points_es: string[];
  short_description_en: string;
  full_description_en: string;
  bullet_points_en: string[];
  main_technologies: string[];
  libraries: string[];
  github_url: string;
  githubback_url: string;
  deploy_url: string;
  cover_image_url: string;
  end_date: string | null;
  published: boolean;
  created_at: string;
}
