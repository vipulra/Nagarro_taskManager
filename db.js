const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/todos.db'
})


const Todos = db.define('todo',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement:true
    },
    task:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descrip:{
        type: Sequelize.STRING,
        allowNull: true
    },
    due:{
        type: Sequelize.DATEONLY
    },
    priority:{
        type: Sequelize.STRING
    },
    status:{
        type: Sequelize.STRING
    }

})

const Notes = db.define('Note', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descrip:{
        type: Sequelize.STRING,
        allowNull: false
    }
})
 
Todos.hasMany(Notes);



module.exports = { db, Notes ,  Todos }

