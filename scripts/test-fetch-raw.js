// Node.js 18+ has native fetch
const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'

async function testWithFetch() {
  try {
    console.log('Testing with raw fetch...')
    console.log('Endpoint:', endpoint)

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: '{ sayHello }'
      })
    })

    console.log('Status:', response.status)
    console.log('Status Text:', response.statusText)
    console.log('Headers:', Object.fromEntries(response.headers.entries()))

    const text = await response.text()
    console.log('Response body:', text)

    if (response.ok) {
      try {
        const json = JSON.parse(text)
        console.log('Parsed JSON:', JSON.stringify(json, null, 2))
      } catch (e) {
        console.log('Could not parse as JSON')
      }
    }
  } catch (error) {
    console.error('Fetch error:', error.message)
    console.error('Full error:', error)
  }
}

testWithFetch()
