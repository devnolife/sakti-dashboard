const fs = require('fs');
const path = require('path');

const seedFiles = [
  'seed-exam-requirements.ts',
  'seed-correspondence-data.ts', 
  'seed-aik-data.ts',
  'seed-schedule-data.ts',
  'seed-laboratory-data.ts',
  'seed-library-data.ts'
];

seedFiles.forEach(fileName => {
  const filePath = path.join(__dirname, 'prisma', 'seeds', fileName);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract function name from filename
    const functionName = fileName.replace('.ts', '').replace(/-/g, '').replace('seed', 'seed');
    const camelCaseName = functionName.charAt(0).toLowerCase() + functionName.slice(1).replace(/([A-Z])/g, (match, p1) => p1.toUpperCase());
    
    console.log(`Processing ${fileName} with function ${camelCaseName}`);
    
    // Find the main function and update it
    content = content.replace(
      /const prisma = new PrismaClient\(\)\s*/,
      ''
    );
    
    // Replace function declaration patterns
    content = content.replace(
      /async function (seed\w+)\(\)/,
      'export async function $1(prisma: PrismaClient)'
    );
    
    // Remove main function calls and cleanup
    content = content.replace(
      /async function main\(\) \{[\s\S]*?\}\s*main\(\)[\s\S]*?$/,
      '// This function is now exported and called from the main seed.ts file'
    );
    
    content = content.replace(
      /(seed\w+)\(\)\s*$/,
      '// This function is now exported and called from the main seed.ts file'
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${fileName}`);
  }
});
