/* STUB

	Persistent Loop - Task Backlog - Multiple Agents - Local or Remote
	Find various agents... hugging face?
	Pass to other agent one of many options - Options & sub options from atlas
	Agent is a chat log / With limit?

*/

var philosophersStone = require("kaeon-united")("philosophersStone");

function load(element) {

	let data = philosophersStone.traverse(philosophersStone.axis).map(node => {

		try {

			return node.standard({
				standard: {
					type: "META.load",
					value: element
				}
			});
		}

		catch(error) {
			return null;
		}
	}).flat().filter(
		item => item != null
	).filter(
		item => !item.finished && (busy != null ? !busy.flag : true)
	);

	let value = { };

	data.forEach(item => {

		if(typeof item.id != "number")
			return;

		value["" + item.id] = item;

		delete item.id;
	});

	return value;
}

function run(interval) {

	/*

		Perpetual:

			Types

				Packet: {
					standard: {
						type: "META.[type]",
						value: (data),
						: { }
					}
				}

				Task: {
					id,
					desc,
					log[
						{
							type: "note"/"status",
							time#,
							note: "note" | status: "open"/"busy"/"finished"
						},
						...
					]
				}

				Option: { optionID, "Desc" }
				Action: { optionID, taskID }

				Priority Item: { Value (Task/Option){ ... }, priority# }

			Process

				Get tasks from atlas -> With priority, Filter neg priority

				Rank tasks & Execute best task via atlas.

					Execute

						Get options via atlas -> pass task, get priority
						Pass Action to atlas
	
	*/

	return setInterval(() => {

		let tasks = load("tasks");

		// STUB
	}, interval != null ? interval * 1000 : 1000);
}

module.exports = {
	load,
	run
};