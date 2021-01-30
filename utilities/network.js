export const network = () => {
	return 
}


const pingServer = async () => {
	try {
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_API_SERVER_URL}/ping`,
		);
		if (resp.status >= 200 && resp.status < 300) {
			const json = await resp.json();
			console.log("Ping | ", json);
		}
		setBotOffline(false);
	} catch (error) {
		setBotOffline(true);
		sendError("Bot appears to be Offline. It could be in maintenaince.");
		console.log("error", error);
	}
};