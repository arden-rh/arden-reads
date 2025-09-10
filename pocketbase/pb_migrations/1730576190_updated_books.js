/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('aimd4fys7caqp9n');

		// update
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
					maxSelect: 5,
					values: [
						'fantasy',
						'horror',
						'sci-fi',
						'thriller',
						'fiction',
						'space-opera',
						'non-fiction',
						'mystery',
						'superheroes'
					]
				}
			})
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('aimd4fys7caqp9n');

		// update
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
					maxSelect: 5,
					values: [
						'fantasy',
						'horror',
						'sci-fi',
						'thriller',
						'fiction',
						'space-opera',
						'non-fiction',
						'mystery'
					]
				}
			})
		);

		return dao.saveCollection(collection);
	}
);
