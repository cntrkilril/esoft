import {AgentModel} from "../models/AgentModel.js";
import {ApiError} from "../exceptions/ApiError.js";
import {LevenshteinSearchAgentAndClient} from "../utils/LevenshteinSearchAgentAndClient.js";
import {SuggestionModel} from "../models/SuggestionModel.js";
import {DemandModel} from "../models/DemandModel.js";


export class AgentService {

    static async get(searchDTO) {
        try {
            const agents = await AgentModel.findAll()
            if (!searchDTO.first_name && !searchDTO.last_name && !searchDTO.middle_name) {
                return {
                    msg: 'success',
                    data: [...agents]
                }
            }
            const resAgents = [...LevenshteinSearchAgentAndClient(agents, searchDTO)]
            return {
                msg: 'success',
                data: [...resAgents]
            }
        } catch (e) {
            console.log(e)
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async create(agentDTO) {
        try {
            const newAgent = await AgentModel.create({...agentDTO})
            return {
                msg: 'success',
                data: {...newAgent.dataValues}
            }
        } catch (e) {
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async update(agentDTO) {
        try {
            const agent = await AgentModel.findOne({where: {id: agentDTO.id}})
            if (!agent) {
                throw ApiError.badRequest(`Риелтора с id = ${agentDTO.id} не существует`)
            }
            await AgentModel.update({...agentDTO}, {where: {id: agentDTO.id}},)
            return {
                msg: 'success',
            }
        } catch (e) {
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async delete(id) {
        try {
            const agent = await AgentModel.findOne({where: {id}})
            if (!agent) {
                throw ApiError.badRequest(`Риелтора с id = ${id} не существует`)
            }
            const suggestion = await SuggestionModel.findOne({where: {agent_id: id}})
            if (suggestion) {
                throw ApiError.badRequest(`Риелтор с id = ${id} связан с предложением`)
            }
            const demand = await DemandModel.findOne({where: {agent_id: id}})
            if (demand) {
                throw ApiError.badRequest(`Риелтор с id = ${id} связан с потребностью`)
            }
            await AgentModel.destroy({where: {id}})
            return {
                msg: 'success',
            }
        } catch (e) {
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

}