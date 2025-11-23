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
    const { username, name, email, password, role, sub_role, prodi_id, additional_data } = body

    // Validation
    if (!username || !name || !password || !role) {
      return NextResponse.json(
        { error: "Required fields: username, name, password, role" },
        { status: 400 }
      )
    }

    // Check if username already exists
    const existingUser = await prisma.users.findUnique({
      where: { username }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.users.create({
      data: {
        username,
        name,
        email: email || `${username}@example.com`,
        password: hashedPassword,
        role,
        sub_role: sub_role || null,
        is_active: true
      }
    })

    // Create role-specific records
    switch (role) {
      case "dosen":
        if (prodi_id) {
          await prisma.lecturers.create({
            data: {
              user_id: user.id,
              nip: additional_data?.nip || username,
              position: additional_data?.position || "Dosen",
              department: additional_data?.department || "Fakultas Teknik",
              prodi_id: prodi_id
            }
          })
        }
        break

      case "mahasiswa":
        if (prodi_id) {
          await prisma.students.create({
            data: {
              user_id: user.id,
              nim: additional_data?.nim || username,
              major: additional_data?.major || "Teknik Informatika",
              semester: additional_data?.semester || 1,
              prodi_id: prodi_id
            }
          })
        }
        break

      case "staff_tu":
        if (prodi_id) {
          await prisma.staff_tu.create({
            data: {
              user_id: user.id,
              position: additional_data?.position || "Staff",
              prodi_id: prodi_id
            }
          })
        }
        break

      case "laboratory_admin":
        if (prodi_id) {
          await prisma.laboratory_admins.create({
            data: {
              user_id: user.id,
              prodi_id: prodi_id
            }
          })
        }
        break

      case "prodi":
      case "dekan":
      case "admin_umum":
      case "kepala_tata_usaha":
        // These roles don't need additional tables
        break

      default:
        // Unknown role, just create user without additional records
        break
    }

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      }
    })

  } catch (error: any) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 }
    )
  }
}
