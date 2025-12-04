import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * POST /api/certificates/laboratory/check-existing
 *
 * Check which certificates already exist in database (for update vs create)
 * Used by frontend to show correct certificate numbers in preview
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is laboratory_admin
    if (session.user.role !== "laboratory_admin") {
      return NextResponse.json(
        { error: "Only laboratory admins can check certificates" },
        { status: 403 }
      );
    }

    // Get prodi from laboratory_admin
    const labAdmin = await prisma.laboratory_admins.findFirst({
      where: {
        user_id: session.user.id,
      },
      select: {
        prodi_id: true,
      },
    });

    if (!labAdmin || !labAdmin.prodi_id) {
      return NextResponse.json(
        { error: "Laboratory admin prodi not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { certificates } = body;

    if (!Array.isArray(certificates) || certificates.length === 0) {
      return NextResponse.json(
        { error: "Invalid certificates data" },
        { status: 400 }
      );
    }

    // Check each certificate's composite key against database
    const results = [];

    for (const cert of certificates) {
      const normalizedNim = (cert.nim || "").toString().trim();
      const normalizedProgram = (cert.program || "").toString().trim();
      const normalizedTitle = (cert.certificateTitle || "").toString().trim();

      const existing = await prisma.laboratory_certificates.findFirst({
        where: {
          participant_nim: normalizedNim,
          program_name: normalizedProgram,
          certificate_title: normalizedTitle,
          prodi_id: labAdmin.prodi_id,
        },
        select: {
          verification_id: true,
          participant_name: true,
          created_at: true,
        },
      });

      results.push({
        nim: normalizedNim,
        program: normalizedProgram,
        title: normalizedTitle,
        exists: !!existing,
        verification_id: existing?.verification_id || null,
        current_name: existing?.participant_name || null,
        created_at: existing?.created_at || null,
      });
    }

    // Count existing vs new
    const existingCount = results.filter((r) => r.exists).length;
    const newCount = results.length - existingCount;

    return NextResponse.json({
      success: true,
      total: results.length,
      existing: existingCount,
      new: newCount,
      results: results,
    });
  } catch (error: any) {
    console.error("Error checking existing certificates:", error);
    return NextResponse.json(
      { error: error.message || "Failed to check existing certificates" },
      { status: 500 }
    );
  }
}
