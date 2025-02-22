/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aimd4fys7caqp9n")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xdtjhh8b",
    "name": "owned",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aimd4fys7caqp9n")

  // remove
  collection.schema.removeField("xdtjhh8b")

  return dao.saveCollection(collection)
})
