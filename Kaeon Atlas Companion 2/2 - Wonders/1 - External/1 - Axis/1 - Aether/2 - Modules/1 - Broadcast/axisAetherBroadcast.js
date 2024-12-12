var aetherUtils = use("kaeon-united")("aetherUtils");
var philosophersStone = use("kaeon-united")("philosophersStone");

function onCall(packet) {
	// STUB
}

function onTick(packet) {
	// STUB
}

function axisAetherBroadcast(options) {

	options = options != null ? options : { };
	
	let aetherBroadcast = Object.assign(
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
			tags: ["axis", "aether", "broadcast"]
		}
	);

	return aetherBroadcast;
}

module.exports = {
	axisAetherBroadcast,
	axisModule: axisAetherBroadcast,
	onCall,
	onTick
};