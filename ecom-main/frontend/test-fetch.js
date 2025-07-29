


fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@gmail.com', password: 'password' })
  })
    .then(res => res.text())
    .then(console.log)
    .catch(console.error);