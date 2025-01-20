// STUB - Use for relaying tasks to META Utils

var aceUtils = use("kaeon-united")("aceUtils");
var aetherUtils = use("kaeon-united")("aetherUtils");
var metaUtils = use("kaeon-united")("metaUtils");
var philosophersStone = use("kaeon-united")("philosophersStone");

function axisAetherExecute(options) {

	options = options != null ? options : { };

	aetherUtils.connectModules("metaModules");
	
	let aetherExecute = Object.assign(
		Object.assign({ }, philosophersStone.standard),
		{
			axis: options.axis != null ? options.axis : { },
			standard: (packet) => {

				if(aetherUtils.classifyPacket(packet) == "tick") {

					aetherExecute.state = packet.packet.state;

					onTick(packet.packet);
				}

				else if(aetherExecute.state != null &&
					packet.standard != null) {

					if(packet.standard.type != "tasks")
						return;
					
					return {
						// STUB
					}
				}
			},
			state: null,
			tags: ["axis", "aether", "execute"]
		}
	);

	return aetherExecute;
}

function getMETATasks(state) {

	return Object.keys(state).map(item => {
		
		let task = aceUtils.getValue(item, "task");
		let log = aceUtils.getValue(item, "log");

		return task != null ? {
			id: key,
			task: task,
			log: typeof log == "object" ?
				(Array.isArray(log) ? log : Object.keys(log)) : []
		} : null;
	}).filter(item => item != null);
}

function onTick() {
	metaUtils.run();
}

module.exports = {
	axisAetherExecute,
	axisModule: axisAetherExecute,
	getMETATasks,
	onTick
};