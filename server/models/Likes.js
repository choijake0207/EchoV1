module.exports = (sequelize) => {
    const Likes = sequelize.define("Likes")

    Likes.associate = (models) => {
        Likes.belongsTo(models.Posts, {
            foreignKey: "postId",
            onDelete: "CASCADE"
        })
        Likes.belongsTo(models.Users, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        })
    }
    return Likes
}