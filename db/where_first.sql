SELECT * FROM vehicles
JOIN users
ON user.id = vehicles.ownerId
WHERE user.firstname like $1 + "%"
