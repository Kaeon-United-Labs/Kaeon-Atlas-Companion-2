/* STUB

	Persistent Loop - Task Backlog - Multiple Agents - Local or Remote
	Find various agents... hugging face?
	Pass to other agent one of many options - Options & sub options from atlas
	Agent is a chat log / With limit?

*/

var philosophersStone = require("kaeon-united")("philosophersStone");

function chat(log) {

}

function run() {

	/*

		Perpetual w/ callbacks:
	
			Get agents from atlas
			Get tasks from atlas

			Agent: { id#, log[] }
			Task: { id#, Desc, log[], finished: t/f }

			For each agent, rank each task & execute best tasks via atlas.

			Execute: Get options via atlas, Pass Action to atlas

			Option: "Desc"
			Action: { "Desc", taskID# }

			Packet: { META: { type: "type", value: (data) } }
	
	*/

	// return intervals
}

module.exports = {
	chat,
	run
};