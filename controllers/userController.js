//SQL
const connection=require('../config/db');

//Get all users
exports.getAllUsers=(req,res)=>{
    connection.query('SELECT * FROM interns_info', (err,rows,fields)=>{
        if(err) throw err;
            res.json(rows);
    });
};

//Search a user by id
//CRUD - Read
exports.getUserById=(req,res)=>{
    const id=req.params.id;
    
    connection.query('SELECT * FROM interns_info WHERE id=?', [id], (err,rows,fields)=>{
        if(err) throw err;
        if(rows.length>0)
            res.json(rows);
        else
            res.status(404).json({message: 'User not found'});
    });
};

//Create a new user
//CRUD - Create
exports.createUser=(req,res)=>{
    const {name,university,role,department}=req.body;
    connection.query('INSERT INTO interns_info (name, university, role, department) VALUES (?,?,?,?)', [name,university,role,department],(err,result)=>{
        if(err) throw err;
        res.json({message:'User created successfully', userId:result.insertId})
    })
}

//Update a user
//CRUD - Update
exports.updateUser=(req,res)=>{
    const {id,name,university,role,department}=req.body;
    connection.query('UPDATE interns_info SET name=?, university=?, role=?, department=? WHERE id=?', [name,university,role,department,id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0)
            res.json({message:'User created successfully'});
        else
            res.status(404).json({message:'User not found'});
    });
}

//Delete a user
//CRUD - Delete
exports.deleteUser=(req,res)=>{
    const id=req.body.id;
    connection.query('DELETE FROM interns_info WHERE id=?', [id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0)
            res.json({message:'User created successfully'});
        else
            res.status(404).json({message:'User not found'});
    });
}