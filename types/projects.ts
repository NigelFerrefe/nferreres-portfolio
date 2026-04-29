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
  github_url: string | null;
  githubback_url: string | null;
  deploy_url: string | null;
  cover_image_url: string;
  end_date: string | null;
  published: boolean;
  created_at: string;
}

export type CreateProjectInput = Omit<Project, "id" | "created_at">;

export type UpdateProjectInput = Partial<CreateProjectInput> & {
  id: string;
};