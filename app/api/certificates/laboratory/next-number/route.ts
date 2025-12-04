import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * GET /api/certificates/laboratory/next-number
 *
 * Get the next certificate number based on the highest existing number in database
 * This ensures global incremental numbering across all laboratories and Excel uploads
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is laboratory_admin
    if (session.user.role !== "laboratory_admin") {
      return NextResponse.json(
        { error: "Only laboratory admins can access this" },
        { status: 403 }
      );
    }

    // Get all certificates and extract the highest certificate number
    // Certificate format: 001/IF/20222/A.5-II/IX/44/2022
    // We need to extract the first 3 digits (001, 002, etc.)
    const allCertificates = await prisma.laboratory_certificates.findMany({
      select: {
        verification_id: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    let highestNumber = 0;

    // Parse all certificate numbers to find the highest
    for (const cert of allCertificates) {
      const match = cert.verification_id.match(/^(\d{3})\//);
      if (match) {
        const number = parseInt(match[1], 10);
        if (number > highestNumber) {
          highestNumber = number;
        }
      }
    }

    // Next number is highest + 1, or 1 if no certificates exist
    const nextNumber = highestNumber + 1;

    return NextResponse.json({
      success: true,
      nextNumber: nextNumber,
      highestNumber: highestNumber,
      totalCertificates: allCertificates.length,
    });
  } catch (error: any) {
    console.error("Error getting next certificate number:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get next certificate number" },
      { status: 500 }
    );
  }
}
