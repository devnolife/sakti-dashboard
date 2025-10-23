import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const roleConfigurations = await prisma.role_configurations.findMany({
      where: {
        is_active: true,
      },
    });

    return NextResponse.json(roleConfigurations);
  } catch (error) {
    console.error('Error fetching role configurations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch role configurations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { role, title, subtitle, icon_name, description } = body;

    const roleConfiguration = await prisma.role_configurations.create({
      data: {
        id: `role-config-${Date.now()}`,
        role,
        title,
        subtitle,
        icon_name,
        description,
        is_active: true,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(roleConfiguration);
  } catch (error) {
    console.error('Error creating role configuration:', error);
    return NextResponse.json(
      { error: 'Failed to create role configuration' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, subtitle, icon_name, description, is_active } = body;

    const roleConfiguration = await prisma.role_configurations.update({
      where: { id },
      data: {
        title,
        subtitle,
        icon_name,
        description,
        is_active,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(roleConfiguration);
  } catch (error) {
    console.error('Error updating role configuration:', error);
    return NextResponse.json(
      { error: 'Failed to update role configuration' },
      { status: 500 }
    );
  }
}
