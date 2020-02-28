# PoC-app

## users:

addRole - post /{groupId?}/users
removeRole - delete /{groupId?}/users

## groups:

list - get /
add - post /
update - put /{groupId}
delete - delete /{groupId}

## collections

list - get /{groupId}/collections/
add - post /{groupId}/collections/
update - put /{groupId}/collections/{collectionId}
delete - delete /{groupId}/collections/{collectionId}

## items

list - get /{groupId}/collections/
add - post /{groupId}/collections/{collectionId}/
update - put /{groupId}/collections/{collectionId}/{itemId}
delete - delete /{groupId}/collections/{collectionId}/{itemId}
