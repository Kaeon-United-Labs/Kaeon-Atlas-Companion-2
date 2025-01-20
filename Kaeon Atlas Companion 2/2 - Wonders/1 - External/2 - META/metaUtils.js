var philosophersStone = require("kaeon-united")("philosophersStone");

function getTaskNotes(task) {

	let notes = [];

	for(let i = 0; i < task.log.length; i++) {

		if(task.log[i].type == "note")
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

function run() {

	// STUB - Rank Priorities (task & option) w/ callback
	//  Use highest priority

	let tasks = load("tasks").filter(
		item =>
			getTaskStatus(item.value) == "open" &&
			(item.priority != null ? item.priority >= 0 : true)
	);

	let options = load("options");

	philosophersStone.traverse(philosophersStone.axis).forEach(node => {

		tasks.forEach(task => {

			let resolved = 0;

			[].concat(options).forEach(option => {

				option.standard({
					standard: {
						type: "META.prioritize.option",
						value: {
							task: task,
							callback: priority => {

								options.priority =
									priority != null ? priority : 0;

								resolved++;

								if(resolved == options.length) {

									try {
										
										node.standard({
											standard: {
												type: `META.action`,
												value: {
													task: task,
													option: options.sort(
														(a, b) =>
															b.priority -
															a.priority
													)[0].priority
												}
											}
										});
									}
							
									catch(error) {
										
									}
								}
							}
						}
					}
				});
			});
		});
	});
}

module.exports = {
	getTaskNotes,
	getTaskStatus,
	load,
	run
};