var aetherUtils = use("kaeon-united")("aetherUtils");
var philosophersStone = use("kaeon-united")("philosophersStone");

function axisAetherQuery(options) {

	options = options != null ? options : { };
	
	let aetherQuery = Object.assign(
		Object.assign({ }, philosophersStone.standard),
		{
			axis: options.axis != null ? options.axis : { },
			standard: (packet) => {

				let type = aetherUtils.classifyPacket(packet);

				if(type == "call")
					return onCall(packet.packet);

				else if(type == "tick")
					return onTick(packet.packet);
			},
			tags: ["axis", "aether", "query"]
		}
	);

	return aetherQuery;
}

function onCall(packet) {
	// STUB - Return State - Traverse other nodes
}

function onTick(packet) {
	// STUB - Write State to DB
}

module.exports = {
	axisAetherQuery,
	axisModule: axisAetherQuery,
	onCall,
	onTick
};