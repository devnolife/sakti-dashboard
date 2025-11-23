import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { action, userIds, data } = body

    if (!action || !userIds || !Array.isArray(userIds)) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      )
    }

    let result

    switch (action) {
      case "activate":
        result = await prisma.users.updateMany({
          where: { id: { in: userIds } },
          data: { is_active: true }
        })
        break

      case "deactivate":
        result = await prisma.users.updateMany({
          where: { id: { in: userIds } },
          data: { is_active: false }
        })
        break

      case "delete":
        // Prevent deleting yourself
        if (userIds.includes(session.user.id)) {
          return NextResponse.json(
            { error: "Cannot delete your own account" },
            { status: 400 }
          )
        }

        result = await prisma.users.deleteMany({
          where: { id: { in: userIds } }
        })
        break

      case "change_role":
        if (!data?.role) {
          return NextResponse.json(
            { error: "Role is required for change_role action" },
            { status: 400 }
          )
        }

        result = await prisma.users.updateMany({
          where: { id: { in: userIds } },
          data: { role: data.role }
        })
        break

      case "reset_password":
        if (!data?.password) {
          return NextResponse.json(
            { error: "Password is required for reset_password action" },
            { status: 400 }
          )
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        result = await prisma.users.updateMany({
          where: { id: { in: userIds } },
          data: { password: hashedPassword }
        })
        break

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      message: `Successfully ${action} ${result.count} users`,
      count: result.count
    })

  } catch (error: any) {
    console.error("Error performing bulk operation:", error)
    return NextResponse.json(
      { error: error.message || "Failed to perform bulk operation" },
      { status: 500 }
    )
  }
}
