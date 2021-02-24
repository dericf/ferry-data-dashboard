// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  
	console.log();
	if (req.body?.password === process.env.DASHBOARD_PASSWORD || req.body?.password === process.env.DEMO_DASHBOARD_PASSWORD) {
		res.statusCode = 200
	}
	else {
		res.statusCode = 401
	}	
  res.json({})
}
