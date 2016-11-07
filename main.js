const chokidar = require('chokidar');
const exif = require('exiftool-wrapper');
const moment = require('moment');
const fs = require('fs');
const fsp = require('fs-promise');

var picturesBasePath = './pictures/';

// var watcher = chokidar.watch('./tmp', {
//   ignored:/[\/\\]\./,
//   persistent: true
// });


// fsp.writeFile('./pictures/test.txt', 'hello world').then(function(rs) {
//   console.log(rs);
// }, function(rs) {
//   console.log(rs);
// })

fsp.mkdir('./pictures').then(function(rs) {
  console.log(rs);
}, function(rs) {
  console.log(rs);
})

// watcher.on('add', addHandler);

function addHandler(path) {
  if (path){
    extractData(path).then(function(response) {
      if (createDirectoryStructureFromDate(response.FileModifyDate)) {

      }
    }, function(error) {

    });
  }
}

function extractData(path) {
  try {
    return exif.metadata({source: path, tags:['FileModifyDate', 'FileAccessDate', 'FileInodeChangeDate', 'FileSize']})
      .then(function(response) {
        return response;
      })
      .catch(function(err) {
        console.log(err);
      });
  } catch (error) {
      console.log('Error: ['+path+']' + error.message);
  }
}

function createDirectoryStructureFromDate(dateString) {
  var date = moment(dateString, 'YYYY:MM:DD hh:mm:ss+-HH:mm');
  var year = date.year();
  var month = date.month();
  var day = date.date();
  
  console.log(date);
}

function copyFile(buffer) {
  // if ()
}
