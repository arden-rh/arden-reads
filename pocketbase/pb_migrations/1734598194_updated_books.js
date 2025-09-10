/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('aimd4fys7caqp9n');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'mtlbf5g1',
				name: 'favourite_book_per_month',
				type: 'bool',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('aimd4fys7caqp9n');

		// remove
		collection.schema.removeField('mtlbf5g1');

		return dao.saveCollection(collection);
	}
);
