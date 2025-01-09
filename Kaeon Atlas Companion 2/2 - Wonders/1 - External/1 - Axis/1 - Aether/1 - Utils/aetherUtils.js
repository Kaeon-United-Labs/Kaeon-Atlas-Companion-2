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

function getDistance(source, target) {

	source = source.split(".");
	target = target.split(".");

	let i = 0;

	for(; i < source.length && i < target.length; i++) {

		if(source[i] != target[i])
			break;
	}

	return (source.length + target.length) - (i * 2);
}

function getFlatChildren(ace, key, deep) {

	return Object.keys(ace).filter(item => {

		return item.startsWith(key) &&
			(deep || item.split(".").length == key.split(".").length + 1);
	});
}

function getSelf(state) {

	try {

		let self = Object.keys(state).filter(key => {

			let module = aceUtils.getValue(state[key], "module")
			
			if(module == null)
				return false;

			return aceUtils.getValue(
				aceUtils.getValue(state[key], "properties", { }), "self"
			) != null;
		})[0];

		if(self == null) {

			state["use.self"] = state["use.self"] != null ? state["use.self"] : { };
			self = "use.self";

			let module = aceUtils.getValue(state["use"], "module");

			Object.assign(module, {
				"properties": {
					"self": { },
					"type": {
						"aether": { },
						"process": { }
					}
				}
			});
		}

		let processes = Object.keys(state).filter(key => {
			
			let module = aceUtils.getValue(state[key], "module");

			if(module == null)
				return false;

			let properties = aceUtils.getValue(modules, "properties");

			if(properties == null)
				return false;

			return aceUtils.getValue(properties, "process") != null;
		});

		return {
			self: self,
			tasks: Object.keys(state).filter(key => {
				return aceUtils.getValue(state[key], "task") != null;
			}).filter(task => {
				
				let priority = processes.map(
					item => [item, getDistance(item, task)]
				);
	
				let min = Math.min(...priority.map(item => item[1]));
	
				return priority.filter(item => item[1] == min).includes(self);
			})
		};
	}

	catch(error) {
		return null;
	}
}

function unflattenACE(ace, key) {

	data = { };
	key = key != null ? key : "use";

	data.components = ace[key];
	data.entities = { };

	getFlatChildren(ace, key).forEach(item => {

		let path = item.split(".");

		data.entities[path[path.length - 1]] = unflattenACE(ace, item);
	});

	return data;
}

module.exports = {
	classifyPacket,
	flattenACE,
	getDistance,
	getFlatChildren,
	getSelf,
	unflattenACE
};