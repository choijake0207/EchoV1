module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mediaURL: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })

    Posts.associate = (models) => {
        Posts.belongsTo(models.Users, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        })
        Posts.hasMany(models.Comments, {
            foreignKey: "postId"
        })
        Posts.hasMany(models.Likes, {
            foreignKey: "postId"
        })
        Posts.hasMany(models.SavedPosts, {
            foreignKey: "postId"
        })
    }
    return Posts
}