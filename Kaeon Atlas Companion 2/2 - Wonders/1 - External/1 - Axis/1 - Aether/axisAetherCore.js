var aceUtils = use("kaeon-united")("aceUtils");
var aetherUtils = use("kaeon-united")("aetherUtils");
var axisUtils = use("kaeon-united")("axisUtils");
var io = use("kaeon-united")("io");
var philosophersStone = use("kaeon-united")("philosophersStone");

function axisAetherCore(options) {

	options = options != null ? options : { };

	let state = { };

	try {

		state = aceUtils.formatKaeonACE(io.open(
			options.aetherState != null ? options.aetherState : "./use.json"
		));
	}

	catch(error) {
		state = { };
	}

	state = aetherUtils.flattenACE(state);
	
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

				let flag = false;

				philosophersStone.traverse(philosophersStone.axis).forEach(
					item => {
			
						try {

							let status = item.standard({
								tags: ["aether", "validate"],
								packet: {
									call: packet,
									state: aetherCore.state
								}
							});

							if(typeof status == "boolean" && !status)
								flag = true;
						}
			
						catch(error) {
			
						}
					}
				);

				if(flag)
					return null;

				try {
					
					aetherCore.state = Object.assign(
						aetherCore.state,
						aetherUtils.flattenACE(
							aceUtils.formatKaeonACE(packet.body)
						)
					);
				}

				catch(error) {
					return null;
				}

				let data = { };

				philosophersStone.traverse(philosophersStone.axis).forEach(
					item => {
			
						try {

							let content = item.standard({
								tags: ["aether", "call"],
								packet: {
									call: packet,
									state: aetherCore.state
								}
							});

							response = Object.assign(data, content);
						}
			
						catch(error) {
			
						}
					}
				);

				return {
					body: JSON.stringify(aetherUtils.unflattenACE(data)),
					priority: 1
				};
			},
			state: state,
			tags: ["axis", "aether", "core"]
		}
	);

	return aetherCore;
}

module.exports = {
	axisAetherCore,
	axisModule: axisAetherCore
};