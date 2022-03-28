// Create Database : create database nama_database;
// Show Database : show databases;
// Select Database : use nama_database;
// Create Table : 
            // create table users (
            // id int(5) auto_increment primary key,
            // username varchar(30) not null,
            // email varchar(50) not null,
            // password varchar(255) not null
            // );

// Insert Data : 
            // insert into users (username, email, password) values ("ryandefryan", "ryan@gmail.com", "123123123");

// Read Data : 
            // select * from nama_table;

// Update Data :
            // update nama_table set username="mdefryan" where id=1;

// Delete Data : 
            //  delete from nama_table where id=1;



// TITANIC.CSV
// Column Selection
SELECT name, sex FROM passengers;


// Filter Selection
    // - Mendapatkan data penumpang yang kaya 
    SELECT * FROM passengers WHERE pclass=1;

    // - Mendapatkan data penumpang yang kaya, selamat dan bersama orangtua/anaknya
    SELECT * FROM passengers WHERE pclass=1 AND survived=1 AND parch>0;

// Sort Selection
    //  - Mendapatkan data penumpang yang diurutkan berdasarkan umur
    SELECT * FROM passengers ORDER by age;

// Group Selection ---> Mengelompokan data yang kategorical
    // - Mendapatkan data total penumpang yang selamat dan meninggal
    SELECT COUNT(*) AS Total, Survived FROM passengers GROUP BY survived;

    // - Mendapatkan data penumpang dari masing-masing class
    SELECT COUNT(*) AS Total, pclass FROM passengers GROUP BY pclass;

    // - Mendapatkan rata-rata harga tiket dari masing-masing class
    SELECT AVG(fare) AS Rata2_Harga_Tiket, pclass FROM passengers GROUP BY pclass ORDER BY pclass;

// Sub-Query Selection
    // - Mendapatkan data penumpang pria yang umurnya diatas rata-rata seluruh penumpang pria
    //      Step1 : Cari terlebih dahulu rata-rata penumpang pria
                    SELECT AVG(age) FROM passengers WHERE sex = 'male';
    //      Step2: Baru kita cari penumpang pria yang umurnya diatas rata-rata
                   SELECT * FROM passengers WHERE sex = 'male' AND age > 
                   (SELECT AVG(age) FROM passengers WHERE sex = 'male');

    // - Mendapatkan data penumpang yang harga tiketnya diatas rata-rata harga tiket seluruh penumpang
    //      Step1 : Cari terlebih dahulu rata-rata tiket seluruh penumpang
                    SELECT AVG(fare) FROM passengers;
    //      Step2: Baru kita cari penumpang yang tiketnya diatas rata-rata
                   SELECT * FROM passengers WHERE fare >
                   (SELECT AVG(fare) FROM passengers);

// Having & Limit Selection

    // - Mendapatkan 3 penumpang yang memiliki umur paling tua
    SELECT * FROM passengers ORDER BY age DESC LIMIT 3;


// Like Selection
    // - Mendapatkan penumpang yang diawali dengan huruf a
    SELECT * FROM passengeres WHERE name like 'a%'; 
    https://www.w3schools.com/mysql/mysql_like.asp



SELECT > WHERE > GROUP > ORDER BY