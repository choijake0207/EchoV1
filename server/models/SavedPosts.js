module.exports = (sequelize, DataTypes) => {
    const  SavedPosts = sequelize.define("SavedPosts", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Posts",
                key: "id"
            }
        }
    })

    SavedPosts.associate = (models) => {
        SavedPosts.belongsTo(models.Users ,{
            foreignKey: "userId",
            onDelete: "CASCADE",

        });
        SavedPosts.belongsTo(models.Posts, {
            foreignKey: "postId",
            onDelete: "CASCADE"
        })
    }
    return SavedPosts
}