const Equations = require('../models/Equations');
const Topics = require('../models/Topics');

async function getEquations(topicId) {
    return await Equations.find({topicId: topicId})
}

async function createEquation(equationParams) {
    const Topic = await Topics.findById(equationParams.topicId);
    if (!Topic) {
        throw `Topic for the Equation doesnot exist.`;
    }
    if (Equations.findOne({name: equationParams.name})) {
        throw `Name ${equationParams.name} already used.`;
    }
    const equation = new Equations(equationParams);
    const _savedEquation = await equation.save();
    return {
        message: `Equation ${equationParams.name} saved successfully.`,
        equation: _savedEquation
    }
}
async function updateEquation(id, equationParams) {
    const equation = await Equations.findById(id);
    if(!equation) throw `Equation not found.`;
    if (equationParams.topicId) {
        const topic = await Topics.findById(equationParams.topicId)
        if (!topic) {
            throw `Topic for the Equation does not exist`;
        }
    }
    Object.assign(equation,equationParams);
    const editedEquation = await equation.save();
    return {
        message: 'Equation edited Successfully',
        equation: editedEquation
    }
}

async function deleteEquation(id) {
    return await Equations.deleteOne({_id: id});
}
module.exports = {
    getEquations,
    createEquation,
    updateEquation,
    deleteEquation
}