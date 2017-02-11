SELECT count(ownerid) as count FROM vehicles
WHERE ownerid = $1
