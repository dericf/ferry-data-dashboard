// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  
	console.log();
	if (req.body?.password === process.env.DASHBOARD_PASSWORD) {
		console.log('Authorized')
		res.statusCode = 200
	}
	else {
		res.statusCode = 401
	}
	console.log('Not Authorized')
	
  res.json({})
}
