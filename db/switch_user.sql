UPDATE vehicles
 SET
  ownerid = COALESCE($2, id)
WHERE id = $1
RETURNING *;
