/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('aimd4fys7caqp9n');

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'pkbjmv9s',
				name: 'format',
				type: 'select',
				required: false,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 2,
					values: ['hardcover', 'paperback', 'kindle', 'audio_book', 'graphic_novel_album']
				}
			})
		);

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
						'non-fiction'
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
				id: 'pkbjmv9s',
				name: 'format',
				type: 'select',
				required: false,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 2,
					values: ['hardcover', 'pocket', 'kindle', 'audio_book', 'graphic_novel_album']
				}
			})
		);

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
					values: ['fantasy', 'horror', 'sci-fi', 'thriller', 'fiction', 'space-opera']
				}
			})
		);

		return dao.saveCollection(collection);
	}
);
