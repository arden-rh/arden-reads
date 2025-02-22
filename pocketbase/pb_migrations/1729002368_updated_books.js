/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aimd4fys7caqp9n")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d7hzxzhz",
    "name": "pages",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ixcg7r04",
    "name": "date_read",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aimd4fys7caqp9n")

  // remove
  collection.schema.removeField("d7hzxzhz")

  // remove
  collection.schema.removeField("ixcg7r04")

  return dao.saveCollection(collection)
})
