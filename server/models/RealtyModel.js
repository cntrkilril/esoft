import {database} from "../database/database.js";
import {DataTypes} from "sequelize";
import {SuggestionModel} from "./SuggestionModel.js";

export const RealtyModel = database.define("realty", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    address_city: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    address_street: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    address_house_number: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    address_apartment_number: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    coordinate_latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
        max: 90,
        min: -90
    },
    coordinate_longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
        max: 180,
        min: -180
    },
    floor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    total_rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        min: 1
    },
    total_floors: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        min: 1
    },
    area: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
        min: 0
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    schema: 'public'
})

RealtyModel.hasMany(SuggestionModel, {foreignKey: 'realty_id'})
