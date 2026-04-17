export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  bullet_points: string[];
  main_technologies: string[];
  libraries: string[];
  github_url: string;
  deploy_url: string;
  cover_image_url: string;
  end_date: string | null;
  published: boolean;
  created_at: string;
}
