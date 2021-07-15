// const fs = require("fs")
// const path = require("path")

//Array with the file extensions that the app supports
//Will be filled by the database
// let acceptedExtenstions=["pdf","epub"];

// //Function that recursively lists all file in given directory
// getAllFiles = (dirPath, arrayOfFiles) =>{
//     files = fs.readdirSync(dirPath)
  
//     arrayOfFiles = arrayOfFiles || []
  
//     files.forEach((file)=>{
//         //If file is directory call the same function again
//       if (fs.statSync(dirPath + "/" + file).isDirectory()) {
//         arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
//       } else {
//           //If file and is contained in the supported extensions array push it to the array of files that the function returns
//         let f=path.extname(file).split('.')[1]
//         if(acceptedExtenstions.indexOf(f)>-1){
//             arrayOfFiles.push(path.join( dirPath, "/", file))
//         }
//       }
//     })
  
//     return arrayOfFiles
//   }


//   //Path string to list all files
//   let fileTree = getAllFiles("PATH_NAME_HERE");

//   //Debug 
//   console.log(fileTree)