const express = require('express');

function createRouter(db) {
    const router = express.Router();
    const owner = req.user.email;

    // the routes are defined here

    // The POST route will only activate when the server receives an HTTP POST request.
    // Using the SQL INSERT statement, this code adds a new row to the events table.
    router.post('/event', (req, res, next) => {
        const owner = req.user.email;

        db.query(
            'INSERT INTO events (owner, name, description, date) VALUES (?,?,?,?)',
            [owner, req.body.name, req.body.description, new Date(req.body.date)],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json({ status: 'ok' });
                }
            }
        );
    });

    // List the events of a single owner, the following route links an HTTP GET request to a MySQL SELECT statement. 
    router.get('/event', function (req, res, next) {
        const owner = req.user.email;

        db.query(
            'SELECT id, name, description, date FROM events WHERE owner=? ORDER BY date LIMIT 10 OFFSET ?',
            [owner, 10 * (req.params.page || 0)],
            (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json(results);
                }
            }
        );
    });

    // Modify existing entries with PUT route, which links an HTTP PUT request to a MySQL UPDATE statement.
    router.put('/event/:id', function (req, res, next) {
        const owner = req.user.email;

        db.query(
            'UPDATE events SET name=?, description=?, date=? WHERE id=? AND owner=?',
            [req.body.name, req.body.description, new Date(req.body.date), req.params.id, owner],
            (error) => {
                if (error) {
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json({ status: 'ok' });
                }
            }
        );
    });

    // Delete an existing event. Do this through an HTTP DELETE request that issues a MySQL DELETE statement.
    router.delete('/event/:id', function (req, res, next) {
        const owner = req.user.email;
        
        db.query(
            'DELETE FROM events WHERE id=? AND owner=?',
            [req.params.id, owner],
            (error) => {
                if (error) {
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json({ status: 'ok' });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;