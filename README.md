## Kalpas Innovations  Assignment

This project consists of 2 parts

## 1.  CSV File Upload API

It takes CSV file input from the user through a form,
and saves it into a collection in MongoDb Database.
Created using 

#### College Student Data

Dataset present in the Resources folder

##### Model Schema : Item

    {
        id: String,
        first_name: String,
        last_name: String,
        email: String,
        gender: String,
        file_name: String //the name of the csv file / college name
    }
    
#### Instructions for running

requirements : node latest version

Open terminal 

    cd CSV_API
    npm install
    npm start
    
Open a Browser and goto http://localhost:3000/

## 2. CRUD API

It allows the user to perform CRUD operations on the 
College Student Data inserted using CSV_API

#### Instructions for running

requirements : 
    
    node //latest version
    postman: https://www.postman.com/downloads/
    thunderclient: https://www.thunderclient.com/  //VScode plugin
    
Open terminal 

    cd CSV_API
    npm install
    npm start
    
###### now it is possible to make GET/POST/PUT/DELETE request using Postman/Thunderclient