import { NextRequest, NextResponse } from 'next/server';

// Mock storage (shared with preview route)
const mockVariables = new Map<string, any>();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const variables = mockVariables.get(params.id) || {};

    return NextResponse.json({
      success: true,
      data: variables
    });

  } catch (error) {
    console.error('Mock get variables error:', error);
    return NextResponse.json(
      { error: 'Failed to get variables' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { variables } = body;

    if (!variables || typeof variables !== 'object') {
      return NextResponse.json(
        { error: 'Invalid variables format' },
        { status: 400 }
      );
    }

    // Store in mock storage
    mockVariables.set(params.id, variables);

    return NextResponse.json({
      success: true,
      message: 'Variables saved in mock storage',
      data: variables
    });

  } catch (error) {
    console.error('Mock save variables error:', error);
    return NextResponse.json(
      { error: 'Failed to save variables' },
      { status: 500 }
    );
  }
}