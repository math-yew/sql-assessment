UPDATE vehicles
 SET
  ownerid = null
WHERE id = $1 and ownerid = $2
RETURNING *;
