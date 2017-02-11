SELECT * FROM vehicles
JOIN users
ON user.id = vehicles.ownerId
WHERE user.email = $1
