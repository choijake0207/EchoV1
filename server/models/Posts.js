module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Posts
}