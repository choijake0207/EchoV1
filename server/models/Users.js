module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profilePictureUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        biography: {
            type: DataTypes.STRING,
            allowNull: true,
        }



    })
    return Users
}