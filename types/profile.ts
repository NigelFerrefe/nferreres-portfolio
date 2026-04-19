export interface Profile {
  id: string;
  full_name: string;
  job_title_es: string;
  job_title_en: string;
  bio_es: string;
  bio_en: string;
  profile_image_url: string;
  github_url: string;
  linkedin_url: string;
  cv_file_url_es: string;
  cv_file_url_en: string;
  created_at?: string;
  updated_at?: string;
}
