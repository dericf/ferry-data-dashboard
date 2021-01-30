import { useAlert } from "./useAlert"; 

export const usePingServer = () => {
	const { sendError } = useAlert();
	const pingServer = async (setBotOffline) => {
		try {
			const resp = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/ping`);
			if (resp.status >= 200 && resp.status < 300) {
				const json = await resp.json();
				console.log("Ping | ", json);
				// setBotOffline(false)
				return true;
			}
		} catch (error) {
			sendError("Bot appears to be Offline. It could be in maintenaince.");
			console.log("error", error);
			// setBotOffline(true)
			return false;
		}
	}
	return {
		test: "",
		pingServer
	}
};
