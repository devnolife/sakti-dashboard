import { NextRequest, NextResponse } from 'next/server';

// Mock storage (in production, this would be a database or session)
const mockTemplates = new Map<string, any>();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if we have this template in our mock storage
    const template = mockTemplates.get(params.id);
    
    if (!template) {
      // Return empty template for first load
      return NextResponse.json({
        success: true,
        data: {
          html: '<p>Loading...</p>',
          rawText: '',
          detectedFields: {},
          variableMapping: null
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        html: template.html,
        rawText: template.rawText,
        detectedFields: template.detectedFields || {},
        variableMapping: template.variableMapping || null
      }
    });

  } catch (error) {
    console.error('Mock preview error:', error);
    return NextResponse.json(
      { error: 'Failed to get preview' },
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
    
    // Store in mock storage
    mockTemplates.set(params.id, {
      id: params.id,
      html: body.html,
      rawText: body.rawText,
      detectedFields: body.detectedFields || {},
      variableMapping: body.variableMapping || null
    });

    return NextResponse.json({
      success: true,
      message: 'Template stored in mock storage'
    });

  } catch (error) {
    console.error('Mock preview store error:', error);
    return NextResponse.json(
      { error: 'Failed to store template' },
      { status: 500 }
    );
  }
}