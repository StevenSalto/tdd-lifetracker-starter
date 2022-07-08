class Exercise {
    static async recordExercise(data) {
        const requiredFields = ["name", "category", "duration", "intensity"];
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in req body`)
            }
        })
    }

    static async listExercises(data) {

    }
}

module.exports = Exercise