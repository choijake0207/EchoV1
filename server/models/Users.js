module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profilePictureURl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        biography: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profileBannerURL: {
            type: DataTypes.STRING,
            allowNull: false,
        }



    })

    Users.associate = (models) => {
        Users.belongsToMany(models.Users, {
            through: models.Follows,
            as: "follower",
            foreignKey: "followingId",
            otherKey: "followerId"
        })
        Users.belongsToMany(models.Users, {
            through: models.Follows,
            as: "following",
            foreignKey: "followerId",
            otherKey: "followingId"
        })
        Users.hasMany(models.Posts, {
            foreignKey: "userId",
        })
        Users.hasMany(models.Comments, {
            foreignKey: "userId"
        })
        Users.hasMany(models.Likes, {
            foreignKey: "userId"
        })
        Users.hasMany(models.SavedPosts, {
            foreignKey: "userId"
        })
    }

    return Users
}