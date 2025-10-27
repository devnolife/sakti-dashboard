// GraphQL Introspection Script - Plain JavaScript
const fs = require('fs');
const path = require('path');

const GRAPHQL_ENDPOINT = 'https://superapps.if.unismuh.ac.id/graphql';

const introspectionQuery = `
  query IntrospectionQuery {
    __schema {
      queryType {
        name
        fields {
          name
          description
          args {
            name
            description
            type {
              name
              kind
              ofType {
                name
                kind
              }
            }
          }
          type {
            name
            kind
            ofType {
              name
              kind
            }
          }
        }
      }
      mutationType {
        name
        fields {
          name
          description
          args {
            name
            description
            type {
              name
              kind
              ofType {
                name
                kind
              }
            }
          }
          type {
            name
            kind
            ofType {
              name
              kind
            }
          }
        }
      }
      types {
        name
        kind
        description
        fields {
          name
          type {
            name
            kind
            ofType {
              name
              kind
            }
          }
        }
      }
    }
  }
`;

async function introspectGraphQL() {
  try {
    console.log('🔍 Introspecting GraphQL endpoint...');
    console.log('Endpoint:', GRAPHQL_ENDPOINT);
    console.log('---\n');

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: introspectionQuery,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', JSON.stringify(result.errors, null, 2));
      return;
    }

    const schema = result.data.__schema;

    // Query Types
    console.log('📥 AVAILABLE QUERIES:');
    console.log('='.repeat(80));
    if (schema.queryType?.fields) {
      schema.queryType.fields.forEach((field) => {
        console.log(`\n✓ ${field.name}`);
        if (field.description) {
          console.log(`  Description: ${field.description}`);
        }
        if (field.args && field.args.length > 0) {
          console.log('  Arguments:');
          field.args.forEach((arg) => {
            const typeName = arg.type.ofType?.name || arg.type.name;
            console.log(`    - ${arg.name}: ${typeName}`);
          });
        }
        const returnType = field.type.ofType?.name || field.type.name;
        console.log(`  Returns: ${returnType}`);
      });
    }

    console.log('\n\n' + '='.repeat(80));
    console.log(`Total Queries: ${schema.queryType?.fields?.length || 0}`);

    // Mutation Types
    console.log('\n\n📤 AVAILABLE MUTATIONS:');
    console.log('='.repeat(80));
    if (schema.mutationType?.fields) {
      schema.mutationType.fields.forEach((field) => {
        console.log(`\n✓ ${field.name}`);
        if (field.description) {
          console.log(`  Description: ${field.description}`);
        }
        if (field.args && field.args.length > 0) {
          console.log('  Arguments:');
          field.args.forEach((arg) => {
            const typeName = arg.type.ofType?.name || arg.type.name;
            console.log(`    - ${arg.name}: ${typeName}`);
          });
        }
        const returnType = field.type.ofType?.name || field.type.name;
        console.log(`  Returns: ${returnType}`);
      });
      console.log('\n\n' + '='.repeat(80));
      console.log(`Total Mutations: ${schema.mutationType.fields.length}`);
    } else {
      console.log('\nNo mutations available or mutations not exposed');
    }

    // Custom Types
    console.log('\n\n📋 MAIN CUSTOM TYPES:');
    console.log('='.repeat(80));
    const customTypes = schema.types.filter(
      (type) =>
        !type.name.startsWith('__') &&
        type.kind === 'OBJECT' &&
        type.name !== 'Query' &&
        type.name !== 'Mutation'
    );

    console.log(`\nFound ${customTypes.length} custom types\n`);
    customTypes.slice(0, 30).forEach((type) => {
      console.log(`\n▶ ${type.name}`);
      if (type.description) {
        console.log(`  ${type.description}`);
      }
      if (type.fields && type.fields.length > 0) {
        console.log(`  Fields (${type.fields.length}):`);
        type.fields.slice(0, 15).forEach((field) => {
          const fieldType = field.type.ofType?.name || field.type.name;
          console.log(`    - ${field.name}: ${fieldType}`);
        });
        if (type.fields.length > 15) {
          console.log(`    ... and ${type.fields.length - 15} more fields`);
        }
      }
    });

    // Save to file
    const docsDir = path.join(process.cwd(), 'docs');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    const outputPath = path.join(docsDir, 'GRAPHQL_SCHEMA.json');
    fs.writeFileSync(outputPath, JSON.stringify(result.data, null, 2));
    console.log(`\n\n✅ Full schema saved to: docs/GRAPHQL_SCHEMA.json`);

    // Create summary
    const summary = {
      endpoint: GRAPHQL_ENDPOINT,
      introspectedAt: new Date().toISOString(),
      queriesCount: schema.queryType?.fields?.length || 0,
      mutationsCount: schema.mutationType?.fields?.length || 0,
      typesCount: customTypes.length,
      queries: schema.queryType?.fields?.map((f) => ({
        name: f.name,
        args: f.args?.map((a) => a.name) || [],
        returnType: f.type.ofType?.name || f.type.name
      })) || [],
      mutations: schema.mutationType?.fields?.map((f) => ({
        name: f.name,
        args: f.args?.map((a) => a.name) || [],
        returnType: f.type.ofType?.name || f.type.name
      })) || [],
      types: customTypes.slice(0, 50).map((t) => ({
        name: t.name,
        fieldsCount: t.fields?.length || 0
      })),
    };

    const summaryPath = path.join(docsDir, 'GRAPHQL_SUMMARY.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`✅ Summary saved to: docs/GRAPHQL_SUMMARY.json\n`);

    console.log('📊 Quick Summary:');
    console.log(`   - Queries: ${summary.queriesCount}`);
    console.log(`   - Mutations: ${summary.mutationsCount}`);
    console.log(`   - Types: ${summary.typesCount}`);

  } catch (error) {
    console.error('❌ Error introspecting GraphQL endpoint:');
    console.error(error.message);
    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
  }
}

introspectGraphQL();
