/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "aimd4fys7caqp9n",
    "created": "2024-10-15 14:15:01.411Z",
    "updated": "2024-10-15 14:15:01.411Z",
    "name": "books",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lmdbuoyt",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "j3xpytgw",
        "name": "author",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("aimd4fys7caqp9n");

  return dao.deleteCollection(collection);
})
