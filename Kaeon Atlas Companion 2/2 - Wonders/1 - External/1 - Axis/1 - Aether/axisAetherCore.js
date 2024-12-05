var aceUtils = use("kaeon-united")("aceUtils");
var aetherUtils = use("kaeon-united")("aetherUtils");
var axisUtils = use("kaeon-united")("axisUtils");
var io = use("kaeon-united")("io");
var philosophersStone = use("kaeon-united")("philosophersStone");

function axisAetherCore(options) {

	options = options != null ? options : { };

	let state = null;

	try {

		state = aceUtils.formatKaeonACE(io.open(
			options.aetherState != null ? options.aetherState : "./use.json"
		));
	}

	catch(error) {
		state = { };
	}
	
	let aetherCore = Object.assign(
		Object.assign({ }, philosophersStone.standard),
		{
			axis: options.axis != null ? options.axis : { },
			standard: (packet) => {

				if(typeof packet == "number") {

					philosophersStone.traverse(philosophersStone.axis).forEach(
						item => {
				
							try {

								item.standard({
									tags: ["aether", "tick"],
									packet: {
										tick: packet,
										state: aetherCore.state
									}
								});
							}
				
							catch(error) {
				
							}
						}
					);

					return null;
				}

				if(!axisUtils.isHTTPJSON(packet))
					return null;

				if(packet.request.method != "POST" ||
					(packet.request.uri.split("/").length == 4 &&
						!packet.request.uri.endsWith("/")) ||
					packet.request.uri.split("/").length > 4 ||
					packet.request.uri.includes("?")
				) {
					return null;
				}

				if(!aetherUtils.validateRequest(packet))
					return null;

				philosophersStone.traverse(philosophersStone.axis).forEach(
					item => {
			
						try {

							item.standard({
								tags: ["aether", "call"],
								packet: {
									call: packet,
									state: aetherCore.state
								}
							});
						}
			
						catch(error) {
			
						}
					}
				);

				let response = JSON.parse(JSON.stringify(packet));
				response.priority = 1;

				delete response.request;
				delete response.headers;

				return response;
			},
			state: state,
			tags: ["axis", "aetherCore"]
		}
	);

	return aetherCore;
}

module.exports = {
	axisAetherCore,
	axisModule: axisAetherCore
};