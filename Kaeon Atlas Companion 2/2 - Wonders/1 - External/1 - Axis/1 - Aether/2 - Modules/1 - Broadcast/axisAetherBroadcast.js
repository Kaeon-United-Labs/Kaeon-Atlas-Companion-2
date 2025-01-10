var aetherUtils = use("kaeon-united")("aetherUtils");
var philosophersStone = use("kaeon-united")("philosophersStone");

function onTick(packet) {

	let state = packet.state;

	this.timer = this.timer != null ? this.timer : (new Date()).getTime();
	
	// STUB - Get and Integrate Update components every tick
	//  - Traverse other nodes

	if((new Date()).getTime() - this.timer >= module.interval * 1000) {

		// STUB - Send update to all connections every special interval
		//  - Traverse other nodes

		this.timer = (new Date()).getTime();
	}
}

function axisAetherBroadcast(options) {

	options = options != null ? options : { };
	
	let aetherBroadcast = Object.assign(
		Object.assign({ }, philosophersStone.standard),
		{
			axis: options.axis != null ? options.axis : { },
			standard: (packet) => {

				let type = aetherUtils.classifyPacket(packet);

				if(type == "tick")
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
	interval: 30,
	onCall,
	onTick
};