import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCertification } from "@/lib/services/cv";
import { createCertification, deleteCertification, updateCertification } from "@/lib/services/admin/certfication";
import { CreateCertificationInput, UpdateCertificationInput } from "@/types/cv";


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
    const workExperience = await getCertification();

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
    const body = (await req.json()) as CreateCertificationInput;

    const data = await createCertification(body);

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
    const body = (await req.json()) as UpdateCertificationInput;

    if (!body.id) {
      return NextResponse.json(
        { error: "Missing work experience id" },
        { status: 400 },
      );
    }

    const data = await updateCertification(body);

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

    await deleteCertification(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error deleting work experience" },
      { status: 500 },
    );
  }
}