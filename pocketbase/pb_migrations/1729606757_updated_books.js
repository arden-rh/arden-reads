/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('aimd4fys7caqp9n');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'f7tldbuo',
				name: 'genre',
				type: 'select',
				required: false,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 2,
					values: ['fantasy', 'horror', 'sci-fi', 'thriller', 'fiction']
				}
			})
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('aimd4fys7caqp9n');

		// remove
		collection.schema.removeField('f7tldbuo');

		return dao.saveCollection(collection);
	}
);
