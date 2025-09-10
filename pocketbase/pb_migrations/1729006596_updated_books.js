/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('aimd4fys7caqp9n');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'pkbjmv9s',
				name: 'medium',
				type: 'select',
				required: false,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 2,
					values: ['physical_book', 'digital_book', 'audio_book', 'graphic_novel']
				}
			})
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('aimd4fys7caqp9n');

		// remove
		collection.schema.removeField('pkbjmv9s');

		return dao.saveCollection(collection);
	}
);
