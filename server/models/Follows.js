module.exports = (sequelize, DataTypes) => {
    const Follows = sequelize.define("Follows", {
        followerId:  {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        followingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            },
            onDelete: "CASCADE"
        }
    })

    Follows.associate = (models) => {
        Follows.belongsTo(models.Users, {
            as: "follower",
            foreignKey: "followerId",
            onDelete: "CASCADE"
        })
        Follows.belongsTo(models.Users, {
            as: "following",
            foreignKey: "followingId",
            onDelete: "CASCADE"
        })
    }

    return Follows
}