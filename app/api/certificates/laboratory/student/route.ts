import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * GET /api/certificates/laboratory/student
 *
 * Fetch laboratory certificates for the logged-in student
 * Filters by participant_nim matching the student's NIM
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is a student
    if (session.user.role !== "mahasiswa") {
      return NextResponse.json(
        { error: "Only students can access this endpoint" },
        { status: 403 }
      );
    }

    // Get student data to retrieve NIM
    const student = await prisma.students.findFirst({
      where: {
        user_id: session.user.id,
      },
      select: {
        nim: true,
        users: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!student || !student.nim) {
      return NextResponse.json(
        { error: "Student data not found" },
        { status: 404 }
      );
    }

    // Fetch all certificates for this student
    const certificates = await prisma.laboratory_certificates.findMany({
      where: {
        participant_nim: student.nim,
      },
      include: {
        prodi: {
          select: {
            nama: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      certificates,
      studentInfo: {
        nim: student.nim,
        name: student.users.name,
      },
    });
  } catch (error: any) {
    console.error("Error fetching student certificates:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}
