module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Comments.associate = (models) => {
        Comments.belongsTo(models.Posts, {
            foreignKey: "postId",
            onDelete: "CASCADE"
        }) 
        Comments.belongsTo(models.Users, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        })
    }
    return Comments
}