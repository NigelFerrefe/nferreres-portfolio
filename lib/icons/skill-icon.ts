import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiGithub,
  SiGraphql,
  SiStripe,
  SiSupabase,
  SiPrisma,
  SiPusher,
  SiSendgrid,
  SiReacthookform,
  SiReactquery,
  SiRedux,
  SiZod,
  SiGooglecloud,
} from "react-icons/si";

import { BiLogoCss3 } from "react-icons/bi";


export const skillIconMap = {
  react: SiReact,
  nextdotjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  html5: SiHtml5,
  css3: BiLogoCss3, 

  nodedotjs: SiNodedotjs,
  express: SiExpress,
  django: SiDjango,
  python: SiPython,

  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,

  docker: SiDocker,
  kubernetes: SiKubernetes,
  git: SiGit,
  github: SiGithub,

  graphql: SiGraphql,
  stripe: SiStripe,
  supabase: SiSupabase,
  prisma: SiPrisma,
  pusher: SiPusher,
  sendgrid: SiSendgrid,

  reacthookform: SiReacthookform,
  reactquery: SiReactquery,
  redux: SiRedux,
  zod: SiZod,

  googlecloud: SiGooglecloud,
} as const;


export const techToSlugMap: Record<string, string> = {
  react: "react",
  reactnative: "react",
  nextjs: "nextdotjs",
  typescript: "typescript",
  javascript: "javascript",
  tailwind: "tailwindcss",
  html5: "html5",
  css3: "css3",

  nodejs: "nodedotjs",
  express: "express",
  django: "django",
  python: "python",

  postgresql: "postgresql",
  mongodb: "mongodb",
  redis: "redis",

  docker: "docker",
  kubernetes: "kubernetes",
  git: "git",
  github: "github",

  graphql: "graphql",
  stripe: "stripe",
  supabase: "supabase",
  prisma: "prisma",
  pusher: "pusher",
  sendgrid: "sendgrid",

  reacthookform: "reacthookform",
  reactquery: "reactquery",
  redux: "redux",
  zod: "zod",

  googlecloud: "googlecloud",
};