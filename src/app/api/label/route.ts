import { NextRequest, NextResponse } from 'next/server'

import { createLabel, getLabelsByUserId } from '@server/modules/label/services'
import { verifySession } from '@server/modules/sessions/service'

import { AppError, handleApiError } from '@libs/utils/error'

// Get labels
export async function GET() {
  try {
    const { userId } = await verifySession()

    const labels = await getLabelsByUserId(userId)

    return NextResponse.json(labels)
  } catch (error) {
    return handleApiError(error)
  }
}

// Create label
export async function POST(req: NextRequest) {
  try {
    const body: { name: string } = await req.json()

    if (!body.name?.trim()) {
      throw new AppError('Validation error', 'VALIDATION', 'MEDIUM', 406)
    }

    const { userId } = await verifySession()
    const label = await createLabel(body.name.trim(), userId)

    if (label) {
      return NextResponse.json(label, { status: 201 })
    }

    throw new AppError('Internal server error', 'UNKNOWN', 'CRITICAL', 500)
  } catch (error) {
    return handleApiError(error)
  }
}
