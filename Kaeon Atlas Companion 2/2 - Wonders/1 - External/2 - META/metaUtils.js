var philosophersStone = require("kaeon-united")("philosophersStone");

function getLogTask(task) {

	return Object.keys(task.log).map(key => {

		let item = Object.assign({ }, task.log[key]);

		delete item[key];
		item.value = key;

		return item;
	});
}

function getTaskNotes(task) {

	let log = getLogTask(task);

	let notes = [];

	for(let i = 0; i < log.length; i++) {

		if(log[i].type == "note")
			notes.push(log[i].value);
	}

	return notes;
}

function getTaskStatus(task) {

	let log = getLogTask(task);

	let status = "open";

	for(let i = 0; i < log.length; i++) {

		if(log[i].type == "status" && status != "finished")
			status = log[i].value;
	}

	return status;
}

function getTaskPriority(task) {

	let log = getLogTask(task);

	for(let i = log.length; i >= 0; i--) {

		if(log[i].type == "priority")
			return Number(log[i].value);
	}

	return 0;
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

	let nodes = philosophersStone.traverse(philosophersStone.axis);

	let tasks = load("tasks").filter(
		item => {

			if(item.priority == null) {

				nodes.forEach(node => {

					try {

						node.standard({
							standard: {
								type: "META.prioritize.task",
								value: item
							}
						});
					}

					catch(error) {

					}
				});

				return;
			}

			return getTaskStatus(item.value) == "open" && item.priority >= 0;
		}
	);

	let options = load("options");

	nodes.forEach(node => {

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
	getLogTask,
	getTaskNotes,
	getTaskStatus,
	getTaskPriority,
	load,
	run
};