/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('aimd4fys7caqp9n');

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'ixcg7r04',
				name: 'date_read',
				type: 'date',
				required: true,
				presentable: false,
				unique: false,
				options: {
					min: '',
					max: ''
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
				id: 'ixcg7r04',
				name: 'date_read',
				type: 'date',
				required: false,
				presentable: false,
				unique: false,
				options: {
					min: '',
					max: ''
				}
			})
		);

		return dao.saveCollection(collection);
	}
);
