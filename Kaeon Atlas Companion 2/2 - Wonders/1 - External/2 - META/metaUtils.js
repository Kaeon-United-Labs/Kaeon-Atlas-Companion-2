/* STUB - Notes

	Persistent Loop - Task Backlog - Multiple Agents - Local or Remote
	Find various agents... hugging face?
	Pass to other agent one of many options - Options & sub options from atlas
	Agent is a chat log / With limit?

	Perpetual:

		Types

			Packet: {
				standard: {
					type: "META.[type]",
					value: (data)
				}
			}

			Task: {
				id,
				desc,
				log[
					{
						type: "note"/"status",
						time#,
						value: "note" | status: "open"/"busy"/"finished"
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

var philosophersStone = require("kaeon-united")("philosophersStone");

function getTaskNotes(task) {

	let notes = "open";

	for(let i = 0; i < task.log.length; i++) {

		if(task.log[i].type == "notes")
			notes.push(task.log[i].value);
	}

	return notes;
}

function getTaskStatus(task) {

	let status = "open";

	for(let i = 0; i < task.log.length; i++) {

		if(task.log[i].type == "status" && status != "finished")
			status = task.log[i].value;
	}

	return status;
}

function getTaskNotes(task) {

	let notes = "open";

	for(let i = 0; i < task.log.length; i++) {

		if(task.log[i].type == "notes")
			notes.push(task.log[i].value);
	}

	return notes;
}

function load(element) {

	return philosophersStone.traverse(philosophersStone.axis).map(node => {

		try {
			return node.standard({ standard: { type: `META.${element}` } });
		}

		catch(error) {
			return null;
		}
	}).flat().filter(
		item => item != null
	);
}

function run(interval) {

	return setInterval(() => {

		let tasks = load("tasks").filter(
			item =>
				getTaskStatus(item.value) == "open" &&
				(item.priority != null ? item.priority >= 0 : true)
		);

		philosophersStone.traverse(philosophersStone.axis).map(node => {

			tasks.forEach(task => {

				try {
					
					return node.standard({
						standard: { type: `META.action`, task: task }
					});
				}
		
				catch(error) {
					return null;
				}
			});
		});
	}, interval != null ? interval * 1000 : 1000);
}

module.exports = {
	getTaskNotes,
	getTaskStatus,
	load,
	run
};