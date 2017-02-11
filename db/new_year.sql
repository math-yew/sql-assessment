SELECT users.firstname, users,lastname, vehicles.year FROM vehicles
JOIN users
ON users.id = vehicles.ownerId
WHERE year > 2000
ORDER BY year DESC
