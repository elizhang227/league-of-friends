const db = require('./conn.js');

class Candidates {
    constructor(id, usernmae) {
        this.id = id;
        this.username = username
    }

    static async getAllCandidates() {
        try {
            const response = db.any(`
            SELECT * 
            from candidates`)
            return response
        } catch(err) {
            return err.message
        }
    }

}

module.exports = Candidates;