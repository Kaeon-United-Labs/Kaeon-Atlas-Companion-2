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

		if(!packet.tags.includes("tick")) {

			if(typeof packet.packet.tick == "number")
				return "tick";
		}
	}

	return null;
}

function validateRequest(packet, permissions) {

	// STUB

	return true;
}

module.exports = {
	classifyPacket,
	validateRequest
};