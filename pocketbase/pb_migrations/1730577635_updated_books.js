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
					values: [
						'hardcover',
						'paperback',
						'kindle',
						'audio_book',
						'graphic_novel_album',
						'comics'
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
					values: ['hardcover', 'paperback', 'kindle', 'audio_book', 'graphic_novel_album', 'comic']
				}
			})
		);

		return dao.saveCollection(collection);
	}
);
