#!/usr/bin/env node

/**
 * Database Reset and Seed Script
 * 
 * This script will:
 * 1. Clear all seeded data
 * 2. Run the seed script
 * 
 * Usage:
 *   npx tsx prisma/reset-and-seed.ts
 */

import { PrismaClient } from '../lib/generated/prisma';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

async function clearData() {
  console.log('🧹 Clearing existing seed data...');

  try {
    // Delete in correct order (respect foreign keys)
    await prisma.course_schedules.deleteMany({});
    await prisma.grades.deleteMany({});
    await prisma.academic_consultations.deleteMany({});
    await prisma.kkp_documents.deleteMany({});
    await prisma.kkp_approvals.deleteMany({});
    await prisma.kkp_applications.deleteMany({});
    await prisma.kkp_requirements.deleteMany({});
    await prisma.kkp_sub_locations.deleteMany({});
    await prisma.kkp_locations.deleteMany({});
    await prisma.companies.deleteMany({});
    await prisma.lab_assignment_submissions.deleteMany({});
    await prisma.lab_assignments.deleteMany({});
    await prisma.lab_materials.deleteMany({});
    await prisma.lab_sessions.deleteMany({});
    await prisma.lab_registrations.deleteMany({});
    await prisma.lab_announcements.deleteMany({});
    await prisma.laboratories.deleteMany({});
    await prisma.book_borrowings.deleteMany({});
    await prisma.books.deleteMany({});
    await prisma.book_categories.deleteMany({});
    await prisma.budget_allocations.deleteMany({});
    await prisma.expenses.deleteMany({});
    await prisma.budgets.deleteMany({});
    await prisma.payment_items.deleteMany({});
    await prisma.payments.deleteMany({});
    await prisma.exam_documents.deleteMany({});
    await prisma.exam_committees.deleteMany({});
    await prisma.exam_student_requirements.deleteMany({});
    await prisma.exam_applications.deleteMany({});
    await prisma.exam_requirements.deleteMany({});
    await prisma.thesis_archives.deleteMany({});
    await prisma.thesis_reviews.deleteMany({});
    await prisma.thesis_similarities.deleteMany({});
    await prisma.thesis_titles.deleteMany({});
    await prisma.letter_attachments.deleteMany({});
    await prisma.letter_requests.deleteMany({});
    await prisma.letter_types.deleteMany({});
    await prisma.academic_events.deleteMany({});
    await prisma.notifications.deleteMany({});
    await prisma.system_configs.deleteMany({});
    await prisma.audit_logs.deleteMany({});
    await prisma.file_uploads.deleteMany({});
    await prisma.role_configurations.deleteMany({});

    console.log('✅ Cleared all seed data');
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
}

async function main() {
  try {
    await clearData();

    console.log('\n🌱 Running seed script...\n');
    execSync('npx tsx prisma/seed-all.ts', { stdio: 'inherit' });

    console.log('\n✅ Reset and seed completed successfully!');
  } catch (error) {
    console.error('\n❌ Error during reset and seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
