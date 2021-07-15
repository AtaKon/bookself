const express = require("express");
const fs = require("fs")
const path = require("path");


const Book=require('../models/books');

//Array with the file extensions that the app supports
//Will be filled by the database
let acceptedExtenstions=["pdf","epub"];

const router = express.Router();

router.get('/',(req,res,next)=>{
    Book.find().then((response)=>{
        res.status(200).json({message:"All good bro!",books:response});
    }).catch((error)=>{
        res.status(500).json({message:"Something went wrong!",error:error});
    });
});

module.exports=router;


// let fileTree = getAllFiles("F:/books");

//Function that recursively lists all file in given directory
getAllFiles = (dirPath, arrayOfFiles) =>{
    files = fs.readdirSync(dirPath)
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach((file)=>{
        //If file is directory call the same function again
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
          //If file and is contained in the supported extensions array push it to the array of files that the function returns
        let f=path.extname(file).split('.')[1]
        if(acceptedExtenstions.indexOf(f)>-1){
            arrayOfFiles.push(path.join( dirPath, "/", file))
            let book = new Book({
                title:file.split('.').slice(0, -1).join('.'),
                path:path.join( dirPath, "/", file),
                category:null,
                subCategory:null,
                authors:null,
                year:null
            }).save()
            .then(result=>{
              })
              .catch(error=>{
                console.log(error);
              });
            
        }
      }
    })
  
    return arrayOfFiles

}
