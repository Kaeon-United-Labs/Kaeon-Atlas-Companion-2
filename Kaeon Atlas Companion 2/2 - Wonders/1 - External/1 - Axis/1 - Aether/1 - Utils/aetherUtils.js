var aceUtils = require("kaeon-united")("aceUtils");

function classifyPacket(packet) {

	if(typeof packet != "object")
		return null;

	if(typeof packet.packet != "object")
		return null;

	if(typeof packet.packet.state != "object")
		return null;

	if(Array.isArray(packet.tags)) {

		if(packet.tags.length != 2)
			return null;

		if(!packet.tags.includes("aether"))
			return null;

		if(!packet.tags.includes("call")) {

			if(packet.packet.call != null)
				return "call";
		}

		if(!packet.tags.includes("validate")) {

			if(packet.packet.call != null)
				return "validate";
		}

		if(!packet.tags.includes("tick")) {

			if(typeof packet.packet.tick == "number")
				return "tick";
		}
	}

	return null;
}

function flattenACE(ace, data, path) {

	data = data != null ? data : { };
	path = path != null ? path : ["use"];

	data[path.join(".")] = aceUtils.getValue(ace, "components", { });

	let entities = aceUtils.getValue(ace, "entities", { });

	Object.keys(entities).forEach(key => {
		flattenACE(entities[key], data, path.concat(key));
	});

	return data;
}

function unflattenACE(ace, key) {

	data = { };
	key = key != null ? key : "use";

	data.components = ace[key];
	data.entities = { };

	Object.keys(ace).filter(item => {

		return item.startsWith(key) &&
			item.split(".").length == key.split(".").length + 1;
	}).forEach(item => {

		let path = item.split(".");

		data.entities[path[path.length - 1]] = unflattenACE(ace, item);
	});

	return data;
}

module.exports = {
	classifyPacket,
	flattenACE,
	unflattenACE
};