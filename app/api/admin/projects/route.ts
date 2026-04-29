import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { CreateProjectInput, UpdateProjectInput } from "@/types/projects";
import {
  createProject,
  deleteProject,
  updateProject,
} from "@/lib/services/admin/projects";
import { getProjects } from "@/lib/services/projects";

async function requireUser() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return false;
  }

  return true;
}

export async function GET() {
  const isAuthorized = await requireUser();

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const workExperience = await getProjects();

    return NextResponse.json(workExperience);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error loading work experience" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const isAuthorized = await requireUser();

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as CreateProjectInput;

    const data = await createProject(body);

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error creating work experience" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  const isAuthorized = await requireUser();

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as UpdateProjectInput;

    if (!body.id) {
      return NextResponse.json(
        { error: "Missing work experience id" },
        { status: 400 },
      );
    }

    const data = await updateProject(body);

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error updating work experience" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const isAuthorized = await requireUser();

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = (await req.json()) as { id: string };

    if (!id) {
      return NextResponse.json(
        { error: "Missing work experience id" },
        { status: 400 },
      );
    }

    await deleteProject(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error deleting work experience" },
      { status: 500 },
    );
  }
}
